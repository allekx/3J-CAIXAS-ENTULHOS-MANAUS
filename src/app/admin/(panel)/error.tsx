"use client";

export default function AdminPanelError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg border border-brand-border bg-white p-6">
      <h1 className="text-xl font-semibold text-brand-black">
        Não foi possível carregar o painel
      </h1>
      <p className="mt-2 text-sm text-brand-muted">
        Tente novamente. Se o problema continuar, verifique a conexão com o
        banco.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 inline-flex min-h-11 items-center bg-brand-gold px-4 text-sm font-semibold text-brand-black uppercase"
      >
        Tentar novamente
      </button>
    </div>
  );
}
