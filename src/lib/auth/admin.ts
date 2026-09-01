import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/site";

export async function getAdminSessionUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return data.user;
}

export async function requireAdminUser() {
  const user = await getAdminSessionUser();

  if (!user) {
    redirect(ROUTES.adminLogin);
  }

  return user;
}
