import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginView } from "@/components/admin/AdminLoginView";
import { ROUTES } from "@/constants/site";
import { getAdminSessionUser } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Login administrativo",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const user = await getAdminSessionUser();

  if (user) {
    redirect(ROUTES.admin);
  }

  return <AdminLoginView />;
}
