import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

const SERVER_USER_AGENT = "3j-caixas-entulhos-server/1.0";

function isNewSecretApiKey(key: string) {
  return key.startsWith("sb_secret_");
}

/**
 * Isola as chamadas admin do request HTTP do Next.js.
 * Sem isso, o fetch do App Router pode reenviar Cookie/Authorization da
 * sessão do usuário e o PostgREST responde PGRST303 ("JWT issued at future").
 *
 * Chaves `sb_secret_*` não são JWT — vão só em `apikey`.
 * Chaves legadas `service_role` (eyJ...) usam Bearer + apikey.
 */
function createAdminFetch(serviceKey: string): typeof fetch {
  const useSecretKey = isNewSecretApiKey(serviceKey);

  return (input, init = {}) => {
    const headers = new Headers(init.headers);

    headers.delete("cookie");
    headers.delete("Cookie");
    headers.delete("authorization");
    headers.delete("Authorization");

    headers.set("apikey", serviceKey);
    headers.set("User-Agent", SERVER_USER_AGENT);

    if (!useSecretKey) {
      headers.set("Authorization", `Bearer ${serviceKey}`);
    }

    return fetch(input, {
      ...init,
      headers,
      // Evita cache/dedupe do Next reutilizar resposta com auth errada.
      cache: "no-store",
    });
  };
}

export function createSupabaseAdminClient() {
  const { url } = getSupabasePublicEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!serviceRoleKey) {
    throw new Error("Defina SUPABASE_SERVICE_ROLE_KEY no servidor.");
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      fetch: createAdminFetch(serviceRoleKey),
      headers: {
        "User-Agent": SERVER_USER_AGENT,
      },
    },
  });
}
