import { Box, Camera, Globe, MapPin, MessageCircle, Play } from "lucide-react";
import { BIO_LINKS } from "@/constants/bio";
import { BioLinkButton } from "@/components/bio/BioLinkButton";

export function BioLinks() {
  return (
    <nav aria-label="Links principais" className="flex flex-col gap-2.5">
      <BioLinkButton
        href={BIO_LINKS.allocation}
        title="Solicitar locação"
        subtitle="Solicite sua caixa coletora de entulho"
        icon={Box}
        variant="primary"
      />

      <BioLinkButton
        href={BIO_LINKS.whatsapp}
        title="Falar pelo WhatsApp"
        subtitle="Atendimento rápido e direto"
        icon={MessageCircle}
        external
      />

      <BioLinkButton
        href={BIO_LINKS.googleMaps}
        title="Veja a empresa no Google"
        subtitle="Perfil e localização no Google Maps"
        icon={MapPin}
        external
      />

      <BioLinkButton
        href={BIO_LINKS.website}
        title="Ir para o site"
        subtitle="Conheça a 3J Caixas Entulhos Manaus"
        icon={Globe}
        external={BIO_LINKS.website.startsWith("http")}
      />

      <BioLinkButton
        href={BIO_LINKS.instagram}
        title="Instagram"
        subtitle="Acompanhe nossos conteúdos"
        icon={Camera}
        external
      />

      <BioLinkButton
        href={BIO_LINKS.youtube}
        title="Canal no YouTube"
        subtitle="Veja nossos conteúdos e serviços"
        icon={Play}
        external
      />
    </nav>
  );
}
