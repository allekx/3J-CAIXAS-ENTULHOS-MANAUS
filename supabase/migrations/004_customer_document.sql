-- CPF/CNPJ do cliente na solicitação de alocação
alter table public.allocation_requests
  add column if not exists customer_document text;

comment on column public.allocation_requests.customer_document is
  'CPF ou CNPJ do cliente (somente dígitos, 11 ou 14 caracteres).';

alter table public.allocation_requests
  drop constraint if exists allocation_requests_customer_document_check;

alter table public.allocation_requests
  add constraint allocation_requests_customer_document_check
  check (
    customer_document is null
    or (
      char_length(customer_document) in (11, 14)
      and customer_document ~ '^[0-9]+$'
    )
  );
