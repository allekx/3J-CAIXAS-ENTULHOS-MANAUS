-- Valores da proposta comercial e observações visíveis ao cliente.
-- Idempotente: pode ser reaplicada com segurança.

alter table public.allocation_requests
  add column if not exists service_value numeric(12,2) not null default 0;

alter table public.allocation_requests
  add column if not exists additional_value numeric(12,2) not null default 0;

alter table public.allocation_requests
  add column if not exists discount_value numeric(12,2) not null default 0;

alter table public.allocation_requests
  add column if not exists total_value numeric(12,2) not null default 0;

alter table public.allocation_requests
  add column if not exists proposal_notes text;

comment on column public.allocation_requests.admin_notes is
  'Observações internas do atendimento. Nunca incluir em proposta, PDF ou visão pública.';

comment on column public.allocation_requests.proposal_notes is
  'Observações comerciais da proposta. Podem aparecer no PDF enviado ao cliente.';

comment on column public.allocation_requests.total_value is
  'Total calculado no banco: service_value + additional_value - discount_value.';

alter table public.allocation_requests
  drop constraint if exists allocation_requests_service_value_check;

alter table public.allocation_requests
  add constraint allocation_requests_service_value_check
  check (service_value >= 0);

alter table public.allocation_requests
  drop constraint if exists allocation_requests_additional_value_check;

alter table public.allocation_requests
  add constraint allocation_requests_additional_value_check
  check (additional_value >= 0);

alter table public.allocation_requests
  drop constraint if exists allocation_requests_discount_value_check;

alter table public.allocation_requests
  add constraint allocation_requests_discount_value_check
  check (discount_value >= 0);

alter table public.allocation_requests
  drop constraint if exists allocation_requests_discount_limit_check;

alter table public.allocation_requests
  add constraint allocation_requests_discount_limit_check
  check (discount_value <= service_value + additional_value);

alter table public.allocation_requests
  drop constraint if exists allocation_requests_total_value_check;

alter table public.allocation_requests
  add constraint allocation_requests_total_value_check
  check (total_value >= 0);

alter table public.allocation_requests
  drop constraint if exists allocation_requests_proposal_notes_len;

alter table public.allocation_requests
  add constraint allocation_requests_proposal_notes_len
  check (proposal_notes is null or char_length(proposal_notes) <= 2000);

create or replace function public.allocation_requests_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.protocol := public.generate_allocation_protocol();
  new.total_value := round(
    coalesce(new.service_value, 0)
    + coalesce(new.additional_value, 0)
    - coalesce(new.discount_value, 0),
    2
  );
  return new;
end;
$$;

create or replace function public.allocation_requests_before_update()
returns trigger
language plpgsql
as $$
begin
  new.protocol := old.protocol;
  new.updated_at := now();
  new.total_value := round(
    coalesce(new.service_value, 0)
    + coalesce(new.additional_value, 0)
    - coalesce(new.discount_value, 0),
    2
  );
  return new;
end;
$$;

update public.allocation_requests
set total_value = round(
  coalesce(service_value, 0)
  + coalesce(additional_value, 0)
  - coalesce(discount_value, 0),
  2
);
