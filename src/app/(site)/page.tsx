import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/site";

/**
 * Temporário: a landing principal ainda não está pública.
 * Código da landing: `/inicio`. Quando estiver pronta, remover este redirect
 * e restaurar a home em `/`.
 */
export default function HomePage() {
  redirect(ROUTES.bio);
}
