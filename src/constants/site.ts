export const SITE = {
  name: "3J Caixas Entulhos",
  shortName: "3J",
  description:
    "Sistema de solicitação de locação de caixas coletoras de entulho.",
} as const;

export const ROUTES = {
  home: "/",
  /** Entrada pública atual (enquanto a landing não está pronta). */
  bio: "/bio",
  /** Preview interno da landing principal — sem indexação. */
  landingPreview: "/inicio",
  confirmacaoAlocacao: "/confirmacao-alocacao",
  admin: "/admin",
  adminLogin: "/admin/login",
  adminSolicitacoes: "/admin/solicitacoes",
} as const;

export function adminSolicitacaoPath(id: string) {
  return `${ROUTES.adminSolicitacoes}/${id}`;
}

export function adminSolicitacaoPropostaPath(id: string) {
  return `${adminSolicitacaoPath(id)}/proposta`;
}
