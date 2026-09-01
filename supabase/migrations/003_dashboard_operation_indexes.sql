-- Índices para agenda operacional (entregas e retiradas por data).
-- Idempotente.

create index if not exists allocation_requests_delivery_date_idx
  on public.allocation_requests (delivery_date)
  where delivery_date is not null;

create index if not exists allocation_requests_pickup_date_idx
  on public.allocation_requests (pickup_date)
  where pickup_date is not null;
