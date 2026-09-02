"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PhoneActions } from "@/components/admin/PhoneActions";
import { ForwardRequestModal } from "@/components/admin/ForwardRequestModal";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Field, TextArea, TextInput } from "@/components/ui/Field";
import { updateAllocationRequestAction } from "@/app/admin/(panel)/solicitacoes/actions";
import { ALLOCATION_STATUS_LABELS } from "@/constants/allocation-status";
import { COLLECTOR_BOX_DEFAULTS } from "@/constants/alocacao";
import { adminSolicitacaoPropostaPath } from "@/constants/site";
import { PAYMENT_METHODS } from "@/types/alocacao";
import { ALLOCATION_STATUSES } from "@/types/allocation-request";
import type {
  AllocationRequestRow,
  AllocationRequestStatus,
} from "@/types/allocation-request";
import type { PaymentMethod } from "@/types/alocacao";
import { addDaysToIsoDate, isIsoDate } from "@/lib/alocacao/dates";
import { buildForwardRequestMessage } from "@/lib/admin/forward-request-message";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import {
  calculateProposalTotal,
  formatMoneyBrl,
  formatMoneyInput,
  parseMoneyInput,
} from "@/lib/money";
import { proposalPdfFilename } from "@/lib/proposal/filename";
import { formatRequestDate } from "@/lib/utils/alocacao";
import { maskBrazilianPhone } from "@/lib/utils/phone";
import type { UpdateAllocationRequestPayload } from "@/lib/alocacao/update-allocation-request.schema";

type FormState = {
  status: AllocationRequestStatus;
  customer_name: string;
  customer_phone: string;
  street: string;
  address_number: string;
  complement: string;
  neighborhood: string;
  condominium: string;
  city: string;
  payment_method: PaymentMethod;
  box_type: string;
  box_size: string;
  quantity: string;
  rental_days: string;
  delivery_date: string;
  pickup_date: string;
  admin_notes: string;
  assigned_to: string;
  service_value: string;
  additional_value: string;
  discount_value: string;
  proposal_notes: string;
};

type FieldErrors = Partial<Record<keyof UpdateAllocationRequestPayload, string>>;

function toFormState(request: AllocationRequestRow): FormState {
  return {
    status: request.status,
    customer_name: request.customer_name,
    customer_phone: maskBrazilianPhone(request.customer_phone),
    street: request.street,
    address_number: request.address_number,
    complement: request.complement ?? "",
    neighborhood: request.neighborhood,
    condominium: request.condominium ?? "",
    city: request.city,
    payment_method: request.payment_method,
    box_type: request.box_type?.trim() || COLLECTOR_BOX_DEFAULTS.boxType,
    box_size: request.box_size?.trim() || COLLECTOR_BOX_DEFAULTS.boxSize,
    quantity: request.quantity
      ? String(request.quantity)
      : String(COLLECTOR_BOX_DEFAULTS.quantity),
    rental_days: request.rental_days
      ? String(request.rental_days)
      : String(COLLECTOR_BOX_DEFAULTS.rentalDays),
    delivery_date: request.delivery_date ?? "",
    pickup_date: request.pickup_date ?? "",
    admin_notes: request.admin_notes ?? "",
    assigned_to: request.assigned_to ?? "",
    service_value: formatMoneyInput(request.service_value),
    additional_value: formatMoneyInput(request.additional_value),
    discount_value: formatMoneyInput(request.discount_value),
    proposal_notes: request.proposal_notes ?? "",
  };
}

function withAutoPickup(form: FormState): FormState {
  const days = Number(form.rental_days);

  if (!isIsoDate(form.delivery_date) || !Number.isInteger(days) || days <= 0) {
    return form;
  }

  return {
    ...form,
    pickup_date: addDaysToIsoDate(form.delivery_date, days),
  };
}

function normalizeMoneyField(value: string) {
  const parsed = parseMoneyInput(value);
  return Number.isFinite(parsed) ? formatMoneyInput(parsed) : value;
}

type RequestEditFormProps = {
  request: AllocationRequestRow;
};

export function RequestEditForm({ request }: RequestEditFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toFormState(request));
  const [savedSnapshot, setSavedSnapshot] = useState(() =>
    JSON.stringify(toFormState(request)),
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [hasGeneratedPdf, setHasGeneratedPdf] = useState(false);
  const [forwardOpen, setForwardOpen] = useState(false);
  const savingRef = useRef(false);
  const generatingRef = useRef(false);

  const isDirty = JSON.stringify(form) !== savedSnapshot;
  useUnsavedChanges(isDirty);

  function patchForm(next: Partial<FormState>, autoPickup = false) {
    setSuccessMessage(null);
    setForm((current) => {
      const merged = { ...current, ...next };
      return autoPickup ? withAutoPickup(merged) : merged;
    });
  }

  function blurMoney(
    field: "service_value" | "additional_value" | "discount_value",
  ) {
    setSuccessMessage(null);
    setForm((current) => ({
      ...current,
      [field]: normalizeMoneyField(current[field]),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (savingRef.current) {
      return;
    }

    savingRef.current = true;
    setIsSaving(true);
    setFormError(null);
    setFieldErrors({});
    setSuccessMessage(null);

    try {
      const result = await updateAllocationRequestAction(request.id, {
        status: form.status,
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        street: form.street,
        address_number: form.address_number,
        complement: form.complement,
        neighborhood: form.neighborhood,
        condominium: form.condominium,
        city: form.city,
        payment_method: form.payment_method,
        box_type: form.box_type,
        box_size: form.box_size,
        quantity: form.quantity,
        rental_days: form.rental_days,
        delivery_date: form.delivery_date,
        pickup_date: form.pickup_date,
        admin_notes: form.admin_notes,
        assigned_to: form.assigned_to,
        service_value: form.service_value,
        additional_value: form.additional_value,
        discount_value: form.discount_value,
        proposal_notes: form.proposal_notes,
      });

      if (!result.success) {
        setFormError(result.message);
        setFieldErrors(result.fieldErrors ?? {});
        return;
      }

      setSavedSnapshot(JSON.stringify(form));
      setSuccessMessage("Alterações salvas com sucesso.");
      router.refresh();
    } catch {
      setFormError("Não foi possível salvar as alterações. Tente novamente.");
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  }

  async function generatePdf() {
    if (generatingRef.current) {
      return;
    }

    if (isDirty) {
      setFormError("Salve as alterações antes de gerar a proposta.");
      return;
    }

    generatingRef.current = true;
    setIsGeneratingPdf(true);
    setFormError(null);

    try {
      const response = await fetch(adminSolicitacaoPropostaPath(request.id), {
        method: "GET",
        credentials: "same-origin",
      });
      const contentType = response.headers.get("Content-Type") ?? "";

      if (!response.ok || !contentType.includes("pdf")) {
        setFormError("Não foi possível gerar o PDF. Tente novamente.");
        return;
      }

      const blob = await response.blob();
      const header = response.headers.get("Content-Disposition");
      const match = header?.match(/filename="([^"]+)"/);
      const filename = match?.[1] ?? proposalPdfFilename(request.protocol);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setHasGeneratedPdf(true);
    } catch {
      setFormError("Não foi possível gerar o PDF. Tente novamente.");
    } finally {
      generatingRef.current = false;
      setIsGeneratingPdf(false);
    }
  }

  const parsedService = parseMoneyInput(form.service_value);
  const parsedAdditional = parseMoneyInput(form.additional_value);
  const parsedDiscount = parseMoneyInput(form.discount_value);
  const liveTotal =
    Number.isFinite(parsedService) &&
    Number.isFinite(parsedAdditional) &&
    Number.isFinite(parsedDiscount)
      ? calculateProposalTotal(parsedService, parsedAdditional, parsedDiscount)
      : null;

  const forwardMessage = buildForwardRequestMessage({
    protocol: request.protocol,
    customer_name: form.customer_name,
    customer_phone: form.customer_phone,
    street: form.street,
    address_number: form.address_number,
    complement: form.complement,
    neighborhood: form.neighborhood,
    condominium: form.condominium,
    city: form.city,
    box_type: form.box_type,
    box_size: form.box_size,
    quantity: form.quantity,
    rental_days: form.rental_days,
    delivery_date: form.delivery_date,
    pickup_date: form.pickup_date,
    payment_method: form.payment_method,
    status: form.status,
  });

  return (
    <>
    <form
      onSubmit={handleSubmit}
      data-allow-dirty="true"
      className="mt-6 space-y-4"
      noValidate
    >
      <section className="border border-brand-border bg-white p-4 sm:p-6">
        <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold-dark uppercase">
          Dados do cliente
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="customer_name"
            label="Nome"
            required
            error={fieldErrors.customer_name}
          >
            <TextInput
              id="customer_name"
              name="customer_name"
              value={form.customer_name}
              error={fieldErrors.customer_name}
              onChange={(value) => patchForm({ customer_name: value })}
            />
          </Field>

          <div className="min-w-0">
            <Field
              id="customer_phone"
              label="Telefone"
              required
              error={fieldErrors.customer_phone}
            >
              <TextInput
                id="customer_phone"
                name="customer_phone"
                type="tel"
                inputMode="tel"
                value={form.customer_phone}
                error={fieldErrors.customer_phone}
                onChange={(value) =>
                  patchForm({ customer_phone: maskBrazilianPhone(value) })
                }
              />
            </Field>
            <div className="mt-2">
              <PhoneActions phone={form.customer_phone} />
            </div>
          </div>

          <Field id="street" label="Endereço" required error={fieldErrors.street}>
            <TextInput
              id="street"
              name="street"
              value={form.street}
              error={fieldErrors.street}
              onChange={(value) => patchForm({ street: value })}
            />
          </Field>

          <Field
            id="address_number"
            label="Número"
            required
            error={fieldErrors.address_number}
          >
            <TextInput
              id="address_number"
              name="address_number"
              value={form.address_number}
              error={fieldErrors.address_number}
              onChange={(value) => patchForm({ address_number: value })}
            />
          </Field>

          <Field id="complement" label="Complemento" error={fieldErrors.complement}>
            <TextInput
              id="complement"
              name="complement"
              value={form.complement}
              error={fieldErrors.complement}
              onChange={(value) => patchForm({ complement: value })}
            />
          </Field>

          <Field
            id="neighborhood"
            label="Bairro"
            required
            error={fieldErrors.neighborhood}
          >
            <TextInput
              id="neighborhood"
              name="neighborhood"
              value={form.neighborhood}
              error={fieldErrors.neighborhood}
              onChange={(value) => patchForm({ neighborhood: value })}
            />
          </Field>

          <Field
            id="condominium"
            label="Condomínio"
            error={fieldErrors.condominium}
          >
            <TextInput
              id="condominium"
              name="condominium"
              value={form.condominium}
              error={fieldErrors.condominium}
              onChange={(value) => patchForm({ condominium: value })}
            />
          </Field>

          <Field id="city" label="Cidade" required error={fieldErrors.city}>
            <TextInput
              id="city"
              name="city"
              value={form.city}
              error={fieldErrors.city}
              onChange={(value) => patchForm({ city: value })}
            />
          </Field>

          <Field
            id="payment_method"
            label="Forma de pagamento"
            required
            error={fieldErrors.payment_method}
          >
            <select
              id="payment_method"
              name="payment_method"
              value={form.payment_method}
              aria-invalid={Boolean(fieldErrors.payment_method)}
              onChange={(event) =>
                patchForm({
                  payment_method: event.target.value as PaymentMethod,
                })
              }
              className="h-11 w-full min-h-11 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      <section className="border border-brand-border bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold-dark uppercase">
            Dados da solicitação
          </h2>
          <StatusBadge status={form.status} />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-brand-muted uppercase">
              Protocolo
            </p>
            <p className="mt-2 text-lg font-semibold text-brand-black">
              {request.protocol}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-brand-muted uppercase">
              Data da solicitação
            </p>
            <p className="mt-2 text-sm text-brand-black sm:text-base">
              {formatRequestDate(new Date(request.created_at))}
            </p>
          </div>
          <Field id="status" label="Status" required error={fieldErrors.status}>
            <select
              id="status"
              name="status"
              value={form.status}
              aria-invalid={Boolean(fieldErrors.status)}
              onChange={(event) =>
                patchForm({
                  status: event.target.value as AllocationRequestStatus,
                })
              }
              className="h-11 w-full min-h-11 border border-brand-border bg-white px-3 text-base text-brand-black outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
            >
              {ALLOCATION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {ALLOCATION_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      <section className="border border-brand-border bg-white p-4 sm:p-6">
        <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold-dark uppercase">
          Dados da caixa coletora
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="box_type" label="Tipo" error={fieldErrors.box_type}>
            <TextInput
              id="box_type"
              name="box_type"
              value={form.box_type}
              error={fieldErrors.box_type}
              onChange={(value) => patchForm({ box_type: value })}
            />
          </Field>
          <Field id="box_size" label="Tamanho" error={fieldErrors.box_size}>
            <TextInput
              id="box_size"
              name="box_size"
              value={form.box_size}
              error={fieldErrors.box_size}
              onChange={(value) => patchForm({ box_size: value })}
            />
          </Field>
          <Field id="quantity" label="Quantidade" error={fieldErrors.quantity}>
            <TextInput
              id="quantity"
              name="quantity"
              inputMode="numeric"
              value={form.quantity}
              error={fieldErrors.quantity}
              onChange={(value) =>
                patchForm({ quantity: value.replace(/\D/g, "") })
              }
            />
          </Field>
          <Field
            id="rental_days"
            label="Período (dias)"
            error={fieldErrors.rental_days}
          >
            <TextInput
              id="rental_days"
              name="rental_days"
              inputMode="numeric"
              value={form.rental_days}
              error={fieldErrors.rental_days}
              onChange={(value) =>
                patchForm({ rental_days: value.replace(/\D/g, "") }, true)
              }
            />
          </Field>
          <Field
            id="delivery_date"
            label="Data de entrega"
            error={fieldErrors.delivery_date}
          >
            <TextInput
              id="delivery_date"
              name="delivery_date"
              type="date"
              value={form.delivery_date}
              error={fieldErrors.delivery_date}
              onChange={(value) => patchForm({ delivery_date: value }, true)}
            />
          </Field>
          <Field
            id="pickup_date"
            label="Data de retirada"
            error={fieldErrors.pickup_date}
          >
            <TextInput
              id="pickup_date"
              name="pickup_date"
              type="date"
              value={form.pickup_date}
              error={fieldErrors.pickup_date}
              onChange={(value) => patchForm({ pickup_date: value })}
            />
          </Field>
        </div>
        <p className="mt-3 text-xs text-brand-muted">
          A data de retirada é calculada automaticamente pela entrega e pelo
          período. Você pode ajustá-la manualmente.
        </p>
      </section>

      <section className="border border-brand-border bg-white p-4 sm:p-6">
        <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold-dark uppercase">
          Valores da proposta
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="service_value"
            label="Valor do serviço"
            error={fieldErrors.service_value}
          >
            <TextInput
              id="service_value"
              name="service_value"
              inputMode="decimal"
              value={form.service_value}
              error={fieldErrors.service_value}
              onChange={(value) => patchForm({ service_value: value })}
              onBlur={() => blurMoney("service_value")}
            />
          </Field>
          <Field
            id="additional_value"
            label="Valor adicional"
            error={fieldErrors.additional_value}
          >
            <TextInput
              id="additional_value"
              name="additional_value"
              inputMode="decimal"
              value={form.additional_value}
              error={fieldErrors.additional_value}
              onChange={(value) => patchForm({ additional_value: value })}
              onBlur={() => blurMoney("additional_value")}
            />
          </Field>
          <Field
            id="discount_value"
            label="Desconto"
            error={fieldErrors.discount_value}
          >
            <TextInput
              id="discount_value"
              name="discount_value"
              inputMode="decimal"
              value={form.discount_value}
              error={fieldErrors.discount_value}
              onChange={(value) => patchForm({ discount_value: value })}
              onBlur={() => blurMoney("discount_value")}
            />
          </Field>
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="text-sm font-medium text-brand-black">Total</p>
            <p className="flex h-11 min-h-11 items-center border border-brand-border bg-brand-surface px-3 text-base font-semibold text-brand-black">
              {liveTotal === null ? "—" : formatMoneyBrl(liveTotal)}
            </p>
          </div>
          <div className="sm:col-span-2">
            <Field
              id="proposal_notes"
              label="Observações da proposta"
              error={fieldErrors.proposal_notes}
            >
              <TextArea
                id="proposal_notes"
                name="proposal_notes"
                value={form.proposal_notes}
                error={fieldErrors.proposal_notes}
                onChange={(value) => patchForm({ proposal_notes: value })}
              />
            </Field>
            <p className="mt-2 text-xs text-brand-muted">
              Estas observações aparecem no PDF enviado ao cliente.
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-brand-muted">
          O total é calculado automaticamente: serviço + adicional − desconto.
          O valor definitivo é validado no servidor.
        </p>
      </section>

      <section className="border border-brand-border bg-white p-4 sm:p-6">
        <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-gold-dark uppercase">
          Atendimento
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <Field
            id="assigned_to"
            label="Responsável"
            error={fieldErrors.assigned_to}
          >
            <TextInput
              id="assigned_to"
              name="assigned_to"
              value={form.assigned_to}
              error={fieldErrors.assigned_to}
              onChange={(value) => patchForm({ assigned_to: value })}
            />
          </Field>
          <Field
            id="admin_notes"
            label="Observações internas"
            error={fieldErrors.admin_notes}
          >
            <TextArea
              id="admin_notes"
              name="admin_notes"
              value={form.admin_notes}
              error={fieldErrors.admin_notes}
              onChange={(value) => patchForm({ admin_notes: value })}
            />
          </Field>
          <p className="text-xs text-brand-muted">
            Uso interno. Não aparece na proposta em PDF.
          </p>
        </div>
      </section>

      {formError ? (
        <p className="text-sm text-red-700" role="alert">
          {formError}
        </p>
      ) : null}

      {successMessage ? (
        <p className="text-sm font-medium text-emerald-800" role="status">
          {successMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={isSaving} aria-busy={isSaving}>
          {isSaving ? "Salvando..." : "Salvar alterações"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={isGeneratingPdf || isSaving}
          aria-busy={isGeneratingPdf}
          onClick={() => void generatePdf()}
        >
          {isGeneratingPdf ? "Gerando PDF..." : "Gerar proposta PDF"}
        </Button>
        {hasGeneratedPdf ? (
          <Button
            type="button"
            variant="ghost"
            disabled={isGeneratingPdf || isSaving}
            onClick={() => void generatePdf()}
          >
            Baixar PDF
          </Button>
        ) : null}
        <Button
          type="button"
          variant="whatsapp"
          onClick={() => setForwardOpen(true)}
        >
          Encaminhar atendimento
        </Button>
      </div>
    </form>
    <ForwardRequestModal
      open={forwardOpen}
      message={forwardMessage}
      onClose={() => setForwardOpen(false)}
    />
    </>
  );
}
