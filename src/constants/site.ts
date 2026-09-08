export const SITE = {
  name: "3J Caixas Entulhos Manaus",
  shortName: "3J",
  description:
    "Caixa coletora de entulho de 6 m³ em Manaus para obras, reformas e limpezas. Solicite a locação com a 3J Caixas Entulhos Manaus.",
} as const;

export const ROUTES = {
  home: "/",
  bio: "/bio",
  confirmacaoAlocacao: "/confirmacao-alocacao",
  termosLocacao: "/confirmacao-alocacao/termos",
  privacidade: "/confirmacao-alocacao/privacidade",
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
