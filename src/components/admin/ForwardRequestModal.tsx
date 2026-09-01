"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import {
  canOpenForwardWhatsApp,
  getForwardWhatsAppUrl,
} from "@/lib/admin/forward-request-message";
import { maskBrazilianPhone } from "@/lib/utils/phone";

type ForwardRequestModalProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export function ForwardRequestModal({
  open,
  message,
  onClose,
}: ForwardRequestModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => {
        document.getElementById("forward-attendant-phone")?.focus();
      });
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  function requestClose() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    setPhoneError(null);
    setCopied(false);
    setCopyError(null);
    onClose();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      requestClose();
    }
  }

  function handleForward() {
    setCopyError(null);

    if (!canOpenForwardWhatsApp(phone)) {
      setPhoneError("Informe um telefone válido com DDD.");
      return;
    }

    setPhoneError(null);
    const url = getForwardWhatsAppUrl(phone, message);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function handleCopy() {
    setPhoneError(null);
    setCopyError(null);

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
      setCopyError("Não foi possível copiar os dados. Tente novamente.");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto border border-brand-border bg-white p-0 text-brand-black shadow-xl backdrop:bg-black/40"
    >
      <div className="flex items-start justify-between gap-3 border-b border-brand-border px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <h2
            id={titleId}
            className="text-base font-semibold tracking-tight text-brand-black"
          >
            Encaminhar atendimento
          </h2>
          <p className="mt-1 text-sm text-brand-muted">
            Abre o WhatsApp com a mensagem pronta. A solicitação não é alterada.
          </p>
        </div>
        <button
          type="button"
          aria-label="Fechar"
          onClick={requestClose}
          className="inline-flex size-10 shrink-0 items-center justify-center text-brand-muted hover:text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        >
          <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </button>
      </div>

      <div className="space-y-4 px-4 py-4 sm:px-6">
        <Field
          id="forward-attendant-phone"
          label="Número do responsável pelo atendimento"
          required
          error={phoneError ?? undefined}
        >
          <TextInput
            id="forward-attendant-phone"
            name="forward_attendant_phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            error={phoneError ?? undefined}
            onChange={(value) => {
              setPhoneError(null);
              setPhone(maskBrazilianPhone(value));
            }}
          />
        </Field>
        <p className="text-xs text-brand-muted">
          O número não é salvo nesta etapa. A agenda de números frequentes será
          adicionada depois.
        </p>

        <div>
          <p className="text-sm font-medium text-brand-black">Mensagem</p>
          <pre className="mt-1.5 max-h-48 overflow-auto whitespace-pre-wrap break-words border border-brand-border bg-brand-surface p-3 text-xs leading-5 text-brand-black">
            {message}
          </pre>
        </div>

        {copied ? (
          <p className="text-sm font-medium text-emerald-800" role="status">
            Dados copiados.
          </p>
        ) : null}

        {copyError ? (
          <p className="text-sm text-red-700" role="alert">
            {copyError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-brand-border px-4 py-4 sm:flex-row sm:px-6">
        <Button type="button" variant="whatsapp" onClick={handleForward}>
          Encaminhar pelo WhatsApp
        </Button>
        <Button type="button" variant="secondary" onClick={() => void handleCopy()}>
          Copiar dados
        </Button>
      </div>
    </dialog>
  );
}
