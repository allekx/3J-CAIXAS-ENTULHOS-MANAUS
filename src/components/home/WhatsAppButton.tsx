import { MessageCircle } from "lucide-react";
import {
  HOME_WHATSAPP_MESSAGES,
  getHomeWhatsAppUrl,
} from "@/constants/home";

export function WhatsAppButton() {
  return (
    <a
      href={getHomeWhatsAppUrl(HOME_WHATSAPP_MESSAGES.floating)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      title="Fale conosco"
      className="fixed right-4 bottom-4 z-40 inline-flex size-12 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-colors hover:bg-brand-whatsapp-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-whatsapp sm:right-6 sm:bottom-6"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
    </a>
  );
}
