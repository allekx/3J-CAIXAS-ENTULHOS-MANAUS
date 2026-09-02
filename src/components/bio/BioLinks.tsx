import { Box, Globe, MessageCircle, Play, Star } from "lucide-react";
import { BIO_LINKS } from "@/constants/bio";
import { BioLinkButton } from "@/components/bio/BioLinkButton";

export function BioLinks() {
  const hasGoogleReview = BIO_LINKS.googleReview.length > 0;
  const hasYoutube = BIO_LINKS.youtube.length > 0;

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
        href={hasGoogleReview ? BIO_LINKS.googleReview : "#"}
        title="Avaliar no Google"
        subtitle="Conte como foi sua experiência"
        icon={Star}
        external={hasGoogleReview}
        disabled={!hasGoogleReview}
        ariaLabel={
          hasGoogleReview
            ? "Avaliar no Google"
            : "Avaliar no Google — link em configuração"
        }
      />

      <BioLinkButton
        href={hasYoutube ? BIO_LINKS.youtube : "#"}
        title="Canal no YouTube"
        subtitle="Veja nossos conteúdos e serviços"
        icon={Play}
        external={hasYoutube}
        disabled={!hasYoutube}
        ariaLabel={
          hasYoutube
            ? "Canal no YouTube"
            : "Canal no YouTube — link em configuração"
        }
      />

      <BioLinkButton
        href={BIO_LINKS.website}
        title="Ir para o site"
        subtitle="Conheça a 3J Caixas Entulhos Manaus"
        icon={Globe}
      />
    </nav>
  );
}
