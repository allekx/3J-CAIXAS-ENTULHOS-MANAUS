"use client";

import { useEffect, useState } from "react";
import { Copy, MessageCircle } from "lucide-react";
import { maskBrazilianPhone, toWhatsAppNumber } from "@/lib/utils/phone";

type PhoneActionsProps = {
  phone: string;
  compact?: boolean;
};

export function PhoneActions({ phone, compact = false }: PhoneActionsProps) {
  const [copied, setCopied] = useState(false);
  const display = maskBrazilianPhone(phone);
  const whatsappUrl = `https://wa.me/${toWhatsAppNumber(phone)}`;

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(display);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={compact ? "flex flex-col gap-1" : "flex flex-wrap items-center gap-2"}>
      <span className="whitespace-nowrap text-brand-black">{display}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => void handleCopy()}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-black underline-offset-2 hover:underline"
        >
          <Copy aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
          {copied ? "Copiado" : "Copiar"}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-whatsapp underline-offset-2 hover:underline"
        >
          <MessageCircle aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
