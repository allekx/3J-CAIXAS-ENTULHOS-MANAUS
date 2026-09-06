-- Aceite dos Termos e Condições na solicitação pública de locação
alter table public.allocation_requests
  add column if not exists terms_accepted_at timestamptz;

alter table public.allocation_requests
  add column if not exists terms_version text;

comment on column public.allocation_requests.terms_accepted_at is
  'Momento em que o cliente aceitou os Termos e Condições no formulário público. Nulo em registros anteriores à coluna.';

comment on column public.allocation_requests.terms_version is
  'Versão/identificador dos Termos aceitos (ex.: 2026-09-06).';

alter table public.allocation_requests
  drop constraint if exists allocation_requests_terms_version_len;

alter table public.allocation_requests
  add constraint allocation_requests_terms_version_len
  check (
    terms_version is null
    or char_length(terms_version) between 1 and 40
  );
