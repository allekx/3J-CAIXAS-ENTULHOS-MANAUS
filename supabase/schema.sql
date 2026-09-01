-- =============================================================================
-- 3J Caixas Entulhos — schema inicial (Supabase PostgreSQL)
-- =============================================================================
--
-- Como executar:
-- 1. Abra o projeto no painel do Supabase.
-- 2. Vá em SQL Editor.
-- 3. Cole este arquivo completo e execute (Run).
-- 4. Em Project Settings > API, copie:
--    - Project URL          -> NEXT_PUBLIC_SUPABASE_URL
--    - anon / public        -> NEXT_PUBLIC_SUPABASE_ANON_KEY
--    - service_role         -> SUPABASE_SERVICE_ROLE_KEY
-- 5. Coloque os valores em `.env.local` (não commitar).
--
-- A chave service_role bypassa RLS e deve existir APENAS no servidor.
-- Nunca use service_role no frontend, em NEXT_PUBLIC_* ou no cliente browser.
--
-- Arquitetura de acesso:
-- - Visitantes não leem nem inserem nesta tabela via Supabase JS (anon).
-- - Criação pública será feita depois por API server-side com service_role.
-- - O painel administrativo usará autenticação Supabase em uma etapa futura.
-- =============================================================================

create extension if not exists pgcrypto;

-- Contador atômico do protocolo por ano (3J-2026-000001).
create table if not exists public.allocation_protocol_counters (
  year integer primary key,
  last_number integer not null default 0
);

comment on table public.allocation_protocol_counters is
  'Contador anual para gerar protocolos únicos no formato 3J-AAAA-000000.';

create table if not exists public.allocation_requests (
  id uuid primary key default gen_random_uuid(),
  protocol text unique not null,
  status text not null default 'pending',
  customer_name text not null,
  customer_phone text not null,
  street text not null,
  address_number text not null,
  complement text,
  neighborhood text not null,
  condominium text,
  city text not null,
  payment_method text not null,
  box_type text,
  box_size text,
  quantity integer,
  rental_days integer,
  delivery_date date,
  pickup_date date,
  admin_notes text,
  assigned_to text,
  service_value numeric(12,2) not null default 0,
  additional_value numeric(12,2) not null default 0,
  discount_value numeric(12,2) not null default 0,
  total_value numeric(12,2) not null default 0,
  proposal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint allocation_requests_status_check
    check (
      status in (
        'pending',
        'reviewing',
        'proposal_sent',
        'approved',
        'scheduled',
        'completed',
        'cancelled'
      )
    ),
  constraint allocation_requests_payment_method_check
    check (
      payment_method in (
        'PIX',
        'Dinheiro',
        'Cartão',
        'Transferência bancária',
        'Outro'
      )
    ),
  constraint allocation_requests_customer_name_len
    check (char_length(customer_name) between 1 and 120),
  constraint allocation_requests_customer_phone_len
    check (char_length(customer_phone) between 10 and 20),
  constraint allocation_requests_street_len
    check (char_length(street) between 1 and 180),
  constraint allocation_requests_address_number_len
    check (char_length(address_number) between 1 and 20),
  constraint allocation_requests_complement_len
    check (complement is null or char_length(complement) <= 80),
  constraint allocation_requests_neighborhood_len
    check (char_length(neighborhood) between 1 and 80),
  constraint allocation_requests_condominium_len
    check (condominium is null or char_length(condominium) <= 120),
  constraint allocation_requests_city_len
    check (char_length(city) between 1 and 80),
  constraint allocation_requests_box_type_len
    check (box_type is null or char_length(box_type) <= 80),
  constraint allocation_requests_box_size_len
    check (box_size is null or char_length(box_size) <= 40),
  constraint allocation_requests_admin_notes_len
    check (admin_notes is null or char_length(admin_notes) <= 2000),
  constraint allocation_requests_assigned_to_len
    check (assigned_to is null or char_length(assigned_to) <= 120),
  constraint allocation_requests_quantity_check
    check (quantity is null or quantity > 0),
  constraint allocation_requests_rental_days_check
    check (rental_days is null or rental_days > 0),
  constraint allocation_requests_service_value_check
    check (service_value >= 0),
  constraint allocation_requests_additional_value_check
    check (additional_value >= 0),
  constraint allocation_requests_discount_value_check
    check (discount_value >= 0),
  constraint allocation_requests_discount_limit_check
    check (discount_value <= service_value + additional_value),
  constraint allocation_requests_total_value_check
    check (total_value >= 0),
  constraint allocation_requests_proposal_notes_len
    check (proposal_notes is null or char_length(proposal_notes) <= 2000)
);

comment on table public.allocation_requests is
  'Solicitações de alocação de caixas coletoras. Acesso público somente via API server-side.';

comment on column public.allocation_requests.protocol is
  'Identificador público único gerado no banco. Formato 3J-AAAA-000000.';

comment on column public.allocation_requests.status is
  'Status operacional. Valores: pending, reviewing, proposal_sent, approved, scheduled, completed, cancelled.';

comment on column public.allocation_requests.admin_notes is
  'Observações internas do atendimento. Nunca incluir em proposta, PDF ou visão pública.';

comment on column public.allocation_requests.proposal_notes is
  'Observações comerciais da proposta. Podem aparecer no PDF enviado ao cliente.';

comment on column public.allocation_requests.total_value is
  'Total calculado no banco: service_value + additional_value - discount_value.';

create index if not exists allocation_requests_status_idx
  on public.allocation_requests (status);

create index if not exists allocation_requests_created_at_idx
  on public.allocation_requests (created_at desc);

create index if not exists allocation_requests_delivery_date_idx
  on public.allocation_requests (delivery_date)
  where delivery_date is not null;

create index if not exists allocation_requests_pickup_date_idx
  on public.allocation_requests (pickup_date)
  where pickup_date is not null;

-- Gera o próximo protocolo com lock de linha (evita colisão em concorrência).
create or replace function public.generate_allocation_protocol()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_year integer := extract(year from now())::integer;
  next_number integer;
begin
  insert into public.allocation_protocol_counters as counters (year, last_number)
  values (current_year, 1)
  on conflict (year)
  do update set last_number = counters.last_number + 1
  returning last_number into next_number;

  return '3J-' || current_year::text || '-' || lpad(next_number::text, 6, '0');
end;
$$;

revoke all on function public.generate_allocation_protocol() from public, anon, authenticated;

-- Protocolo sempre sai do banco, nunca de um valor enviado pelo cliente.
create or replace function public.allocation_requests_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.protocol := public.generate_allocation_protocol();
  new.total_value := round(coalesce(new.service_value, 0) + coalesce(new.additional_value, 0) - coalesce(new.discount_value, 0), 2);
  return new;
end;
$$;

drop trigger if exists allocation_requests_set_protocol on public.allocation_requests;

create trigger allocation_requests_set_protocol
before insert on public.allocation_requests
for each row
execute procedure public.allocation_requests_before_insert();

create or replace function public.allocation_requests_before_update()
returns trigger
language plpgsql
as $$
begin
  new.protocol := old.protocol;
  new.updated_at := now();
  new.total_value := round(coalesce(new.service_value, 0) + coalesce(new.additional_value, 0) - coalesce(new.discount_value, 0), 2);
  return new;
end;
$$;

drop trigger if exists allocation_requests_set_updated_at on public.allocation_requests;

create trigger allocation_requests_set_updated_at
before update on public.allocation_requests
for each row
execute procedure public.allocation_requests_before_update();

-- RLS: sem políticas para anon/authenticated => nenhuma leitura ou escrita direta.
alter table public.allocation_protocol_counters enable row level security;
alter table public.allocation_requests enable row level security;

alter table public.allocation_protocol_counters force row level security;
alter table public.allocation_requests force row level security;

revoke all on table public.allocation_protocol_counters from public, anon, authenticated;
revoke all on table public.allocation_requests from public, anon, authenticated;

grant all on table public.allocation_protocol_counters to service_role;
grant all on table public.allocation_requests to service_role;

-- Políticas futuras do painel (não ativas agora):
-- O admin autenticado deverá receber políticas específicas (por role/claim),
-- nunca acesso irrestrito via chave anon.
