"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { ForbiddenUsageExamples } from "@/components/alocacao/ForbiddenUsageExamples";
import { Button } from "@/components/ui/Button";
import { Field, SelectInput, TextInput } from "@/components/ui/Field";
import { WHATSAPP_LOCATION_INFO } from "@/constants/alocacao";
import { ROUTES } from "@/constants/site";
import { PAYMENT_METHODS } from "@/types/alocacao";
import type { CustomerFormData } from "@/types/alocacao";
import { getCustomerFormErrors } from "@/lib/utils/alocacao";
import { maskCnpj } from "@/lib/utils/document";
import { maskBrazilianPhone } from "@/lib/utils/phone";
import { cn } from "@/lib/utils/cn";

type CustomerDataStepProps = {
  data: CustomerFormData;
  onChange: (patch: Partial<CustomerFormData>) => void;
  onContinue: () => void;
};

export function CustomerDataStep({
  data,
  onChange,
  onContinue,
}: CustomerDataStepProps) {
  const [showErrors, setShowErrors] = useState(false);
  const errors = showErrors ? getCustomerFormErrors(data) : {};

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = getCustomerFormErrors(data);

    if (Object.keys(nextErrors).length > 0) {
      setShowErrors(true);
      return;
    }

    onContinue();
  }

  return (
    <section className="mt-8">
      <h1 className="text-2xl font-semibold tracking-tight text-brand-black sm:text-[1.75rem]">
        Confirmação de Locação
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
        Preencha os dados abaixo para confirmarmos a locação da sua caixa
        coletora.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 border border-brand-border bg-white p-4 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <Field
              id="responsibleName"
              label="Nome do responsável"
              required
              error={errors.responsibleName}
            >
              <TextInput
                id="responsibleName"
                name="responsibleName"
                value={data.responsibleName}
                autoComplete="name"
                error={errors.responsibleName}
                onChange={(value) => onChange({ responsibleName: value })}
              />
            </Field>
          </div>

          <div className="sm:col-span-6">
            <Field
              id="phone"
              label="Telefone / WhatsApp"
              required
              error={errors.phone}
            >
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                value={data.phone}
                autoComplete="tel"
                error={errors.phone}
                onChange={(value) =>
                  onChange({ phone: maskBrazilianPhone(value) })
                }
              />
            </Field>
          </div>

          <div className="sm:col-span-6">
            <Field
              id="document"
              label="CNPJ (opcional)"
              error={errors.document}
            >
              <TextInput
                id="document"
                name="document"
                inputMode="numeric"
                value={data.document}
                autoComplete="off"
                error={errors.document}
                onChange={(value) =>
                  onChange({ document: maskCnpj(value) })
                }
              />
            </Field>
          </div>

          <div className="sm:col-span-4">
            <Field
              id="address"
              label="Endereço"
              required
              error={errors.address}
            >
              <TextInput
                id="address"
                name="address"
                value={data.address}
                autoComplete="street-address"
                error={errors.address}
                onChange={(value) => onChange({ address: value })}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field id="number" label="Número" required error={errors.number}>
              <TextInput
                id="number"
                name="number"
                value={data.number}
                autoComplete="address-line2"
                error={errors.number}
                onChange={(value) => onChange({ number: value })}
              />
            </Field>
          </div>

          <div className="sm:col-span-3">
            <Field id="complement" label="Complemento">
              <TextInput
                id="complement"
                name="complement"
                value={data.complement}
                onChange={(value) => onChange({ complement: value })}
              />
            </Field>
          </div>

          <div className="sm:col-span-3">
            <Field
              id="neighborhood"
              label="Bairro"
              required
              error={errors.neighborhood}
            >
              <TextInput
                id="neighborhood"
                name="neighborhood"
                value={data.neighborhood}
                autoComplete="address-level3"
                error={errors.neighborhood}
                onChange={(value) => onChange({ neighborhood: value })}
              />
            </Field>
          </div>

          <div className="sm:col-span-6">
            <Field id="condominium" label="Nome do condomínio">
              <TextInput
                id="condominium"
                name="condominium"
                value={data.condominium}
                onChange={(value) => onChange({ condominium: value })}
              />
            </Field>
          </div>

          <div className="sm:col-span-3">
            <Field id="city" label="Cidade" required error={errors.city}>
              <TextInput
                id="city"
                name="city"
                value={data.city}
                autoComplete="address-level2"
                error={errors.city}
                onChange={(value) => onChange({ city: value })}
              />
            </Field>
          </div>

          <div className="sm:col-span-6">
            <aside className="flex items-start gap-3 border border-brand-gold bg-zinc-50 p-4">
              <Info
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-brand-gold-dark"
                strokeWidth={1.75}
              />
              <div>
                <h2 className="text-sm font-semibold text-brand-black">
                  {WHATSAPP_LOCATION_INFO.stepTitle}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                  {WHATSAPP_LOCATION_INFO.stepMessage}
                </p>
              </div>
            </aside>
          </div>

          <div className="sm:col-span-3">
            <Field
              id="paymentMethod"
              label="Forma de pagamento"
              required
              error={errors.paymentMethod}
            >
              <SelectInput
                id="paymentMethod"
                name="paymentMethod"
                value={data.paymentMethod}
                placeholder="Selecione"
                options={PAYMENT_METHODS}
                error={errors.paymentMethod}
                onChange={(value) =>
                  onChange({
                    paymentMethod: value as CustomerFormData["paymentMethod"],
                  })
                }
              />
            </Field>
          </div>
        </div>

        <div className="mt-5">
          <ForbiddenUsageExamples />
        </div>

        <div className="mt-5">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-brand-black">
            <input
              id="acceptedTerms"
              name="acceptedTerms"
              type="checkbox"
              checked={data.acceptedTerms}
              aria-invalid={Boolean(errors.acceptedTerms)}
              aria-describedby={
                errors.acceptedTerms ? "acceptedTerms-error" : undefined
              }
              onChange={(event) =>
                onChange({ acceptedTerms: event.target.checked })
              }
              className={cn(
                "mt-0.5 size-5 shrink-0 border-brand-border text-brand-gold accent-brand-gold",
                errors.acceptedTerms && "outline outline-1 outline-red-700",
              )}
            />
            <span>
              Li e aceito os{" "}
              <Link
                href={ROUTES.termosLocacao}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-black underline decoration-brand-gold/70 underline-offset-2 hover:decoration-brand-gold"
              >
                Termos e Condições
              </Link>
              .
            </span>
          </label>
          {errors.acceptedTerms ? (
            <p
              id="acceptedTerms-error"
              className="mt-1.5 text-sm text-red-700"
              role="alert"
            >
              {errors.acceptedTerms}
            </p>
          ) : null}
        </div>

        <div className="mt-6">
          <Button type="submit">Continuar</Button>
        </div>
      </form>
    </section>
  );
}
