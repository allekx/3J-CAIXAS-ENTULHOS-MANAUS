export const PAYMENT_METHODS = [
  "PIX",
  "Dinheiro",
  "Cartão",
  "Transferência bancária",
  "Outro",
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export type AllocationStep = 1 | 2 | 3;

export type CustomerFormData = {
  responsibleName: string;
  phone: string;
  document: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  condominium: string;
  city: string;
  paymentMethod: PaymentMethod | "";
  acceptedTerms: boolean;
};

export type CustomerFormErrors = Partial<
  Record<keyof CustomerFormData, string>
>;
