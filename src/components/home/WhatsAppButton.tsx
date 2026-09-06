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
      className="home-whatsapp-float fixed right-4 bottom-4 z-40 inline-flex size-12 items-center justify-center rounded-full bg-brand-whatsapp text-white transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-brand-whatsapp-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-whatsapp motion-reduce:hover:scale-100 sm:right-6 sm:bottom-6"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
    </a>
  );
}
