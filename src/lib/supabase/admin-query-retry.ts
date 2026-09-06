import "server-only";

type SupabaseLikeError = {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
} | null;

type QueryResult<T> = {
  data: T;
  error: SupabaseLikeError;
  count?: number | null;
};

const PGRST_CLOCK_SKEW_CODE = "PGRST303";
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 350;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isClockSkewError(error: SupabaseLikeError) {
  if (!error) return false;
  return (
    error.code === PGRST_CLOCK_SKEW_CODE ||
    error.message?.toLowerCase().includes("jwt issued at future") === true
  );
}

/**
 * Contorno para PGRST303 ("JWT issued at future") com chaves `sb_secret_*`.
 * O gateway do Supabase às vezes emite JWT interno com clock skew; a mesma
 * requisição costuma passar no retry. Ver: supabase/supabase#49655
 */
export async function withAdminQueryRetry<T>(
  run: () => PromiseLike<QueryResult<T>>,
  label: string,
): Promise<QueryResult<T>> {
  let attempt = 0;
  let result = await run();

  while (isClockSkewError(result.error) && attempt < MAX_ATTEMPTS - 1) {
    attempt += 1;
    console.warn(
      `[admin] ${label}: PGRST303 (clock skew). Tentativa ${attempt + 1}/${MAX_ATTEMPTS}…`,
    );
    await sleep(RETRY_DELAY_MS * attempt);
    result = await run();
  }

  return result;
}
