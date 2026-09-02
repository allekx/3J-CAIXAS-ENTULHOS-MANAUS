-- CNPJ opcional: somente 14 dígitos ou null
alter table public.allocation_requests
  drop constraint if exists allocation_requests_customer_document_check;

alter table public.allocation_requests
  add constraint allocation_requests_customer_document_check
  check (
    customer_document is null
    or (
      char_length(customer_document) = 14
      and customer_document ~ '^[0-9]+$'
    )
  );

comment on column public.allocation_requests.customer_document is
  'CNPJ do cliente (opcional, somente dígitos, 14 caracteres).';
