"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { COLLECTOR_BOX_INFO } from "@/constants/alocacao";
import { formatIsoDatePtBr } from "@/lib/alocacao/dates";
import {
  hasPublicBoxDetails,
  type PublicBoxDetails,
} from "@/lib/alocacao/public-request-view";
import { formatFullAddress } from "@/lib/utils/alocacao";
import { cn } from "@/lib/utils/cn";
import type { CustomerFormData } from "@/types/alocacao";

type ReviewStepProps = {
  data: CustomerFormData;
  boxDetails?: PublicBoxDetails | null;
  isSubmitting: boolean;
  submitError: string | null;
  onEdit: () => void;
  onConfirm: () => void | Promise<void>;
};

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-brand-border py-3 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="text-xs font-medium tracking-wide text-brand-muted uppercase">
        {label}
      </dt>
      <dd className="min-w-0 text-sm text-brand-black sm:text-base">{value}</dd>
    </div>
  );
}

export function ReviewStep({
  data,
  boxDetails = null,
  isSubmitting,
  submitError,
  onEdit,
  onConfirm,
}: ReviewStepProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);

  function handleConfirm() {
    if (isSubmitting) {
      return;
    }

    if (!confirmed) {
      setShowError(true);
      return;
    }

    void onConfirm();
  }

  return (
    <section className="mt-8">
      <h1 className="text-2xl font-semibold tracking-tight text-brand-black sm:text-[1.75rem]">
        Revise os dados da sua solicitação
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
        Confira se as informações estão corretas antes de confirmar a alocação
        da sua caixa coletora.
      </p>

      <article className="mt-6 border border-brand-border bg-white p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold-dark uppercase">
            Local da alocação
          </h2>
          <button
            type="button"
            onClick={onEdit}
            disabled={isSubmitting}
            className="shrink-0 text-sm font-semibold text-brand-black underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Editar
          </button>
        </div>
        <dl className="mt-2">
          <ReviewRow
            label="Nome do responsável"
            value={data.responsibleName}
          />
          <ReviewRow label="Telefone / WhatsApp" value={data.phone} />
          <ReviewRow label="Endereço completo" value={formatFullAddress(data)} />
          <ReviewRow label="Bairro" value={data.neighborhood} />
          <ReviewRow
            label="Condomínio"
            value={data.condominium.trim() || "Não informado"}
          />
          <ReviewRow label="Cidade" value={data.city} />
          <ReviewRow label="Forma de pagamento" value={data.paymentMethod} />
        </dl>
      </article>

      <article className="mt-4 border border-brand-border bg-white p-4 sm:p-6">
        <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold-dark uppercase">
          Dados da caixa coletora
        </h2>
        <dl className="mt-2">
          <ReviewRow label="Tamanho" value={COLLECTOR_BOX_INFO.size} />
          <ReviewRow
            label="Permanência na obra"
            value={COLLECTOR_BOX_INFO.stayPeriod}
          />
          <ReviewRow
            label="Retirada antecipada"
            value={COLLECTOR_BOX_INFO.earlyPickup}
          />
        </dl>
        <p className="mt-3 border-t border-brand-border pt-3 text-sm leading-relaxed text-brand-muted">
          <span className="font-semibold text-brand-black">Obs.:</span>{" "}
          {COLLECTOR_BOX_INFO.extraDaysNote}
        </p>
        {hasPublicBoxDetails(boxDetails) ? (
          <dl className="mt-4 border-t border-brand-border pt-2">
            {boxDetails.boxType || boxDetails.boxSize ? (
              <ReviewRow
                label="Tipo / Tamanho da caixa"
                value={[boxDetails.boxType, boxDetails.boxSize]
                  .filter(Boolean)
                  .join(" / ")}
              />
            ) : null}
            {boxDetails.quantity ? (
              <ReviewRow
                label="Quantidade"
                value={
                  boxDetails.quantity === 1
                    ? "1 caixa"
                    : `${boxDetails.quantity} caixas`
                }
              />
            ) : null}
            {boxDetails.rentalDays ? (
              <ReviewRow
                label="Período de alocação"
                value={
                  boxDetails.rentalDays === 1
                    ? "1 dia"
                    : `${boxDetails.rentalDays} dias`
                }
              />
            ) : null}
            {boxDetails.deliveryDate ? (
              <ReviewRow
                label="Data prevista para entrega"
                value={formatIsoDatePtBr(boxDetails.deliveryDate)}
              />
            ) : null}
            {boxDetails.pickupDate ? (
              <ReviewRow
                label="Data prevista para retirada"
                value={formatIsoDatePtBr(boxDetails.pickupDate)}
              />
            ) : null}
          </dl>
        ) : null}
      </article>

      <article className="mt-4 border border-brand-border bg-white p-4 sm:p-6">
        <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold-dark uppercase">
          Resumo do pagamento
        </h2>
        <dl className="mt-2">
          <ReviewRow label="Forma de pagamento" value={data.paymentMethod} />
        </dl>
      </article>

      <aside className="mt-4 border border-brand-gold bg-white p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-brand-black">Tudo certo?</h2>
        <p className="mt-1 text-sm leading-relaxed text-brand-muted">
          Ao confirmar, você estará solicitando a alocação da caixa coletora
          conforme os dados apresentados acima.
        </p>
      </aside>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-brand-black">
          <input
            id="confirmReview"
            name="confirmReview"
            type="checkbox"
            checked={confirmed}
            aria-invalid={showError && !confirmed}
            aria-describedby={
              showError && !confirmed ? "confirmReview-error" : undefined
            }
            onChange={(event) => {
              setConfirmed(event.target.checked);
              if (event.target.checked) {
                setShowError(false);
              }
            }}
            className={cn(
              "mt-0.5 size-5 shrink-0 border-brand-border accent-brand-gold",
              showError && !confirmed && "outline outline-1 outline-red-700",
            )}
          />
          <span>
            Confirmo que os dados estão corretos e estou de acordo com os
            Termos e Condições.
          </span>
        </label>
        {showError && !confirmed ? (
          <p
            id="confirmReview-error"
            className="mt-1.5 text-sm text-red-700"
            role="alert"
          >
            Confirme os dados e os Termos e Condições para continuar.
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {submitError ? (
          <p className="text-sm text-red-700" role="alert">
            {submitError}
          </p>
        ) : null}
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Confirmar alocação"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onEdit}
          disabled={isSubmitting}
        >
          Voltar e editar dados
        </Button>
      </div>
    </section>
  );
}
