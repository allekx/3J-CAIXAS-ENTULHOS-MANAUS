import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** Epoch ms quando a janela libera uma nova tentativa. */
  reset: number;
};

/** Limite da API pública de solicitação de locação. */
export const ALLOCATION_RATE_LIMIT = {
  max: 5,
  windowMs: 15 * 60 * 1000,
  windowLabel: "15 m",
} as const;

type MemoryBucket = {
  timestamps: number[];
};

const memoryStore = new Map<string, MemoryBucket>();

let upstashLimiter: Ratelimit | null | undefined;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);

  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp.slice(0, 64);

  return "unknown";
}

function getUpstashLimiter(): Ratelimit | null {
  if (upstashLimiter !== undefined) {
    return upstashLimiter;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    upstashLimiter = null;
    return null;
  }

  upstashLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(
      ALLOCATION_RATE_LIMIT.max,
      ALLOCATION_RATE_LIMIT.windowLabel,
    ),
    prefix: "rl:allocation",
    analytics: false,
  });

  return upstashLimiter;
}

function limitInMemory(key: string): RateLimitResult {
  const now = Date.now();
  const windowStart = now - ALLOCATION_RATE_LIMIT.windowMs;
  const current = memoryStore.get(key) ?? { timestamps: [] };
  const timestamps = current.timestamps.filter((ts) => ts > windowStart);

  if (timestamps.length >= ALLOCATION_RATE_LIMIT.max) {
    const oldest = timestamps[0] ?? now;
    memoryStore.set(key, { timestamps });
    return {
      success: false,
      limit: ALLOCATION_RATE_LIMIT.max,
      remaining: 0,
      reset: oldest + ALLOCATION_RATE_LIMIT.windowMs,
    };
  }

  timestamps.push(now);
  memoryStore.set(key, { timestamps });

  // Evita crescimento indefinido em cold starts longos.
  if (memoryStore.size > 5_000) {
    for (const [entryKey, bucket] of memoryStore) {
      const fresh = bucket.timestamps.filter((ts) => ts > windowStart);
      if (fresh.length === 0) {
        memoryStore.delete(entryKey);
      } else {
        memoryStore.set(entryKey, { timestamps: fresh });
      }
    }
  }

  return {
    success: true,
    limit: ALLOCATION_RATE_LIMIT.max,
    remaining: Math.max(0, ALLOCATION_RATE_LIMIT.max - timestamps.length),
    reset: now + ALLOCATION_RATE_LIMIT.windowMs,
  };
}

/**
 * Rate limit por IP para POST /api/allocation-requests.
 * Usa Upstash Redis quando configurado; senão, janela em memória do processo.
 */
export async function rateLimitAllocationRequest(
  request: Request,
): Promise<RateLimitResult> {
  const ip = getClientIp(request);
  const key = `allocation:${ip}`;
  const limiter = getUpstashLimiter();

  if (!limiter) {
    return limitInMemory(key);
  }

  const result = await limiter.limit(key);

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  const retryAfterSec = Math.max(
    1,
    Math.ceil((result.reset - Date.now()) / 1000),
  );

  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(Math.max(0, result.remaining)),
    "X-RateLimit-Reset": String(Math.ceil(result.reset / 1000)),
    ...(result.success ? {} : { "Retry-After": String(retryAfterSec) }),
  };
}
