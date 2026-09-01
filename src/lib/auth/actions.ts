"use server";

import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signOutAdmin() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect(ROUTES.adminLogin);
}
