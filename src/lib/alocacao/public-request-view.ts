/**
 * Visão pública da solicitação (o que o cliente pode ver).
 *
 * Acesso externo futuro NÃO deve usar UUID, id interno nem protocolo
 * enumerável. Use um token opaco, de alta entropia, único por solicitação
 * (ex.: public_access_token). Sem o token, não há consulta pública.
 *
 * Nunca incluir neste contrato: admin_notes, assigned_to, e-mails internos
 * ou quaisquer dados exclusivos do painel.
 */

export type PublicAccessToken = string & {
  readonly __brand: "PublicAccessToken";
};

export type PublicBoxDetails = {
  boxType: string | null;
  boxSize: string | null;
  quantity: number | null;
  rentalDays: number | null;
  deliveryDate: string | null;
  pickupDate: string | null;
};

type BoxSource = {
  box_type?: string | null;
  box_size?: string | null;
  quantity?: number | null;
  rental_days?: number | null;
  delivery_date?: string | null;
  pickup_date?: string | null;
};

export function toPublicBoxDetails(source: BoxSource): PublicBoxDetails {
  return {
    boxType: source.box_type?.trim() || null,
    boxSize: source.box_size?.trim() || null,
    quantity: source.quantity ?? null,
    rentalDays: source.rental_days ?? null,
    deliveryDate: source.delivery_date ?? null,
    pickupDate: source.pickup_date ?? null,
  };
}

export function hasPublicBoxDetails(
  box: PublicBoxDetails | null | undefined,
): box is PublicBoxDetails {
  if (!box) {
    return false;
  }

  return Boolean(
    box.boxType ||
      box.boxSize ||
      box.quantity ||
      box.rentalDays ||
      box.deliveryDate ||
      box.pickupDate,
  );
}
