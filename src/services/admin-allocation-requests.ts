import "server-only";

import { requireAdminUser } from "@/lib/auth/admin";
import {
  parseUpdateAllocationRequest,
  toUpdateAllocationRequestRow,
} from "@/lib/alocacao/update-allocation-request.schema";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { onlyDigits } from "@/lib/utils/phone";
import { ALLOCATION_STATUSES } from "@/types/allocation-request";
import type {
  AllocationRequestRow,
  AllocationRequestStatus,
} from "@/types/allocation-request";
import { isIsoDate, getCompanyDayRangeUtc, formatCompanyLongDate } from "@/lib/alocacao/dates";
import { parseMoneyInput } from "@/lib/money";

export type AdminRequestListItem = Pick<
  AllocationRequestRow,
  | "id"
  | "protocol"
  | "customer_name"
  | "customer_phone"
  | "city"
  | "neighborhood"
  | "created_at"
  | "status"
>;

export type DashboardStats = {
  createdToday: number;
  pending: number;
  reviewing: number;
  proposalSent: number;
  approved: number;
  deliveriesToday: number;
  pickupsToday: number;
};

export type DashboardOperation = {
  id: string;
  protocol: string;
  customer_name: string;
  customer_phone: string;
  street: string;
  address_number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  box_type: string | null;
  box_size: string | null;
};

export type AdminDashboardData = {
  todayLabel: string;
  stats: DashboardStats;
  deliveries: DashboardOperation[];
  pickups: DashboardOperation[];
  recent: AdminRequestListItem[];
};

type AdminClient = ReturnType<typeof createSupabaseAdminClient>;

const DASHBOARD_OPERATIONS_LIMIT = 80;

export type ListAllocationRequestsOptions = {
  query?: string;
  status?: AllocationRequestStatus;
  from?: string;
  to?: string;
  limit?: number;
};

function sanitizeSearchTerm(value: string) {
  return value
    .replace(/[%_,()\\*]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

type CountFilters = {
  status?: AllocationRequestStatus;
  createdFromUtc?: string;
  createdToExclusiveUtc?: string;
  deliveryDate?: string;
  pickupDate?: string;
  excludeCancelled?: boolean;
};

async function countRequests(supabase: AdminClient, filters: CountFilters = {}) {
  let query = supabase
    .from("allocation_requests")
    .select("id", { count: "exact", head: true });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.createdFromUtc) {
    query = query.gte("created_at", filters.createdFromUtc);
  }

  if (filters.createdToExclusiveUtc) {
    query = query.lt("created_at", filters.createdToExclusiveUtc);
  }

  if (filters.deliveryDate) {
    query = query.eq("delivery_date", filters.deliveryDate);
  }

  if (filters.pickupDate) {
    query = query.eq("pickup_date", filters.pickupDate);
  }

  if (filters.excludeCancelled) {
    query = query.neq("status", "cancelled");
  }

  const { count, error } = await query;

  if (error) {
    console.error("[admin] Falha ao contar solicitações.", error);
    throw new Error("ADMIN_COUNT_FAILED");
  }

  return count ?? 0;
}

async function listTodayOperations(
  supabase: AdminClient,
  field: "delivery_date" | "pickup_date",
  isoDate: string,
): Promise<DashboardOperation[]> {
  const { data, error } = await supabase
    .from("allocation_requests")
    .select(
      "id, protocol, customer_name, customer_phone, street, address_number, complement, neighborhood, city, box_type, box_size",
    )
    .eq(field, isoDate)
    .neq("status", "cancelled")
    .order("protocol", { ascending: true })
    .limit(DASHBOARD_OPERATIONS_LIMIT);

  if (error) {
    console.error("[admin] Falha ao listar operações do dia.", error);
    throw new Error("ADMIN_OPERATIONS_FAILED");
  }

  return data ?? [];
}

async function listRecentRequests(
  supabase: AdminClient,
  limit: number,
): Promise<AdminRequestListItem[]> {
  const { data, error } = await supabase
    .from("allocation_requests")
    .select(
      "id, protocol, customer_name, customer_phone, city, neighborhood, created_at, status",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[admin] Falha ao listar solicitações recentes.", error);
    throw new Error("ADMIN_LIST_FAILED");
  }

  return data ?? [];
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  await requireAdminUser();
  const supabase = createSupabaseAdminClient();
  const { isoDate, startUtc, endExclusiveUtc } = getCompanyDayRangeUtc();

  const [
    createdToday,
    pending,
    reviewing,
    proposalSent,
    approved,
    deliveriesToday,
    pickupsToday,
    deliveries,
    pickups,
    recent,
  ] = await Promise.all([
    countRequests(supabase, {
      createdFromUtc: startUtc,
      createdToExclusiveUtc: endExclusiveUtc,
    }),
    countRequests(supabase, { status: "pending" }),
    countRequests(supabase, { status: "reviewing" }),
    countRequests(supabase, { status: "proposal_sent" }),
    countRequests(supabase, { status: "approved" }),
    countRequests(supabase, {
      deliveryDate: isoDate,
      excludeCancelled: true,
    }),
    countRequests(supabase, {
      pickupDate: isoDate,
      excludeCancelled: true,
    }),
    listTodayOperations(supabase, "delivery_date", isoDate),
    listTodayOperations(supabase, "pickup_date", isoDate),
    listRecentRequests(supabase, 8),
  ]);

  return {
    todayLabel: formatCompanyLongDate(),
    stats: {
      createdToday,
      pending,
      reviewing,
      proposalSent,
      approved,
      deliveriesToday,
      pickupsToday,
    },
    deliveries,
    pickups,
    recent,
  };
}

export async function listAllocationRequests(
  options: ListAllocationRequestsOptions = {},
): Promise<AdminRequestListItem[]> {
  await requireAdminUser();
  const supabase = createSupabaseAdminClient();
  const limit = options.limit ?? 100;

  let query = supabase
    .from("allocation_requests")
    .select(
      "id, protocol, customer_name, customer_phone, city, neighborhood, created_at, status",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.status) {
    query = query.eq("status", options.status);
  }

  if (options.from && isIsoDate(options.from)) {
    query = query.gte("created_at", `${options.from}T00:00:00.000Z`);
  }

  if (options.to && isIsoDate(options.to)) {
    query = query.lte("created_at", `${options.to}T23:59:59.999Z`);
  }

  const search = sanitizeSearchTerm(options.query ?? "");

  if (search.length > 0) {
    const digits = onlyDigits(search);
    const filters = [
      `protocol.ilike.%${search}%`,
      `customer_name.ilike.%${search}%`,
      `customer_phone.ilike.%${search}%`,
      `street.ilike.%${search}%`,
      `condominium.ilike.%${search}%`,
    ];

    if (digits.length >= 3) {
      filters.push(`customer_phone.ilike.%${digits}%`);
    }

    query = query.or(filters.join(","));
  }

  const { data, error } = await query;

  if (error) {
    console.error("[admin] Falha ao listar solicitações.", error);
    throw new Error("ADMIN_LIST_FAILED");
  }

  return data ?? [];
}

export function parseListFilters(searchParams: {
  q?: string;
  status?: string;
  from?: string;
  to?: string;
}): ListAllocationRequestsOptions {
  const status = ALLOCATION_STATUSES.find(
    (item) => item === searchParams.status,
  );

  return {
    query: searchParams.q?.trim() || undefined,
    status,
    from: searchParams.from && isIsoDate(searchParams.from) ? searchParams.from : undefined,
    to: searchParams.to && isIsoDate(searchParams.to) ? searchParams.to : undefined,
  };
}

function toMoney(value: unknown) {
  const parsed = parseMoneyInput(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function mapAllocationRequestRow(row: AllocationRequestRow): AllocationRequestRow {
  return {
    ...row,
    service_value: toMoney(row.service_value),
    additional_value: toMoney(row.additional_value),
    discount_value: toMoney(row.discount_value),
    total_value: toMoney(row.total_value),
  };
}

export async function getAllocationRequestById(
  id: string,
): Promise<AllocationRequestRow | null> {
  await requireAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("allocation_requests")
    .select(
      "id, protocol, status, customer_name, customer_phone, street, address_number, complement, neighborhood, condominium, city, payment_method, box_type, box_size, quantity, rental_days, delivery_date, pickup_date, admin_notes, assigned_to, service_value, additional_value, discount_value, total_value, proposal_notes, created_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[admin] Falha ao carregar solicitação.", error);
    throw new Error("ADMIN_DETAIL_FAILED");
  }

  return data ? mapAllocationRequestRow(data) : null;
}

export async function updateAllocationRequest(id: string, input: unknown) {
  await requireAdminUser();
  const data = toUpdateAllocationRequestRow(parseUpdateAllocationRequest(input));
  const supabase = createSupabaseAdminClient();

  const { data: updated, error } = await supabase
    .from("allocation_requests")
    .update({
      status: data.status,
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      street: data.street,
      address_number: data.address_number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      condominium: data.condominium,
      city: data.city,
      payment_method: data.payment_method,
      box_type: data.box_type,
      box_size: data.box_size,
      quantity: data.quantity,
      rental_days: data.rental_days,
      delivery_date: data.delivery_date,
      pickup_date: data.pickup_date,
      admin_notes: data.admin_notes,
      assigned_to: data.assigned_to,
      service_value: data.service_value,
      additional_value: data.additional_value,
      discount_value: data.discount_value,
      total_value: data.total_value,
      proposal_notes: data.proposal_notes,
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error || !updated) {
    console.error("[admin] Falha ao atualizar solicitação.", error);
    throw new Error("ADMIN_UPDATE_FAILED");
  }

  return updated;
}
