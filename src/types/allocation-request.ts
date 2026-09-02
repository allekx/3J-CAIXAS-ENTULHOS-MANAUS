import type { PaymentMethod } from "@/types/alocacao";

export const ALLOCATION_STATUSES = [
  "pending",
  "reviewing",
  "proposal_sent",
  "approved",
  "scheduled",
  "completed",
  "cancelled",
] as const;

export type AllocationRequestStatus = (typeof ALLOCATION_STATUSES)[number];

export const ALLOCATION_FIELD_LIMITS = {
  customerName: 120,
  customerPhone: 20,
  customerDocument: 14,
  street: 180,
  addressNumber: 20,
  complement: 80,
  neighborhood: 80,
  condominium: 120,
  city: 80,
  boxType: 80,
  boxSize: 40,
  adminNotes: 2000,
  assignedTo: 120,
  proposalNotes: 2000,
} as const;

export type AllocationRequestRow = {
  id: string;
  protocol: string;
  status: AllocationRequestStatus;
  customer_name: string;
  customer_phone: string;
  customer_document: string | null;
  street: string;
  address_number: string;
  complement: string | null;
  neighborhood: string;
  condominium: string | null;
  city: string;
  payment_method: PaymentMethod;
  box_type: string | null;
  box_size: string | null;
  quantity: number | null;
  rental_days: number | null;
  delivery_date: string | null;
  pickup_date: string | null;
  admin_notes: string | null;
  assigned_to: string | null;
  service_value: number;
  additional_value: number;
  discount_value: number;
  total_value: number;
  proposal_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type AllocationRequestInsert = {
  id?: string;
  protocol?: string;
  status?: AllocationRequestStatus;
  customer_name: string;
  customer_phone: string;
  customer_document: string;
  street: string;
  address_number: string;
  complement?: string | null;
  neighborhood: string;
  condominium?: string | null;
  city: string;
  payment_method: PaymentMethod;
  box_type?: string | null;
  box_size?: string | null;
  quantity?: number | null;
  rental_days?: number | null;
  delivery_date?: string | null;
  pickup_date?: string | null;
  admin_notes?: string | null;
  assigned_to?: string | null;
  service_value?: number;
  additional_value?: number;
  discount_value?: number;
  total_value?: number;
  proposal_notes?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type AllocationRequestUpdate = Partial<AllocationRequestInsert>;

export type PublicAllocationRequestPayload = {
  customer_name: string;
  customer_phone: string;
  customer_document: string;
  street: string;
  address_number: string;
  complement: string;
  neighborhood: string;
  condominium: string;
  city: string;
  payment_method: PaymentMethod;
};

export type CreateAllocationRequestSuccess = {
  success: true;
  protocol: string;
  createdAt: string;
  status: AllocationRequestStatus;
};
