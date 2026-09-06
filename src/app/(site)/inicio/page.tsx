import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/site";

/** Antigo preview da landing — redireciona para a home pública. */
export default function LandingPreviewRedirectPage() {
  redirect(ROUTES.home);
}
