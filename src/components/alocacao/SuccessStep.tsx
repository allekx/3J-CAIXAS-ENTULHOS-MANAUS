import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { getWhatsAppConversationUrl, PRIVACY_HREF, WHATSAPP_LOCATION_INFO } from "@/constants/alocacao";
import { ROUTES } from "@/constants/site";

type SuccessStepProps = {
  protocol: string;
  submittedAt: string;
};

export function SuccessStep({ protocol, submittedAt }: SuccessStepProps) {
  return (
    <section className="mt-8">
      <h1 className="text-2xl font-semibold tracking-tight text-brand-black sm:text-[1.75rem]">
        Solicitação recebida com sucesso!
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
        Sua solicitação de locação da caixa coletora foi recebida e está em
        análise.
      </p>

      <article className="mt-6 border border-brand-border bg-white p-4 sm:p-6">
        <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold-dark uppercase">
          Protocolo da solicitação
        </h2>
        <p className="mt-3 text-2xl font-semibold tracking-wide text-brand-black">
          {protocol}
        </p>
        <dl className="mt-4 space-y-3">
          <div>
            <dt className="text-xs font-medium tracking-wide text-brand-muted uppercase">
              Data da solicitação
            </dt>
            <dd className="mt-1 text-sm text-brand-black sm:text-base">
              {submittedAt}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-brand-muted uppercase">
              Previsão de retorno
            </dt>
            <dd className="mt-1 text-sm text-brand-black sm:text-base">
              Até 1 dia útil
            </dd>
          </div>
        </dl>
      </article>

      <aside className="mt-4 border border-brand-gold bg-white p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-brand-black">
          O que acontece agora?
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-brand-muted">
          Nossa equipe irá analisar os dados e entrar em contato para confirmar
          os detalhes da entrega.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-brand-muted">
          {WHATSAPP_LOCATION_INFO.successMessage}
        </p>
      </aside>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={getWhatsAppConversationUrl(protocol)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand-whatsapp px-4 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-whatsapp-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-whatsapp"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          Falar pelo WhatsApp
        </a>
        <Link
          href={ROUTES.home}
          className="inline-flex min-h-12 w-full items-center justify-center border border-brand-black bg-white px-4 text-sm font-semibold tracking-wide text-brand-black uppercase transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
        >
          Voltar para o início
        </Link>
      </div>

      <footer className="mt-8 flex items-start gap-2 border-t border-brand-border pt-5 text-sm text-brand-muted">
        <ShieldCheck
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-brand-gold-dark"
          strokeWidth={1.75}
        />
        <p>
          Seus dados estão seguros conosco.{" "}
          <a
            href={PRIVACY_HREF}
            className="font-medium text-brand-black underline-offset-2 hover:underline"
          >
            Política de Privacidade
          </a>
        </p>
      </footer>
    </section>
  );
}
