export const ALLOCATION_TERMS = {
  /** Identificador gravado no banco junto ao aceite (auditoria). */
  version: "2026-09-06",
  title: "Termos e Condições",
  subtitle:
    "Condições de uso da caixa coletora de entulho da 3J Caixas Entulhos Manaus.",
  updatedLabel: "Condições vigentes para a locação",
  items: [
    {
      title: "Limite de carga da caixa",
      description:
        "Não é permitido fazer paredão (empilhar resíduos acima da borda) para caber mais material na caixa, ultrapassando o limite de capacidade. O excesso compromete a segurança e a retirada.",
    },
    {
      title: "Prazo de permanência",
      description:
        "A permanência da caixa na obra é de 3 dias úteis. Ultrapassar esse prazo resulta em acréscimo no valor da locação.",
    },
    {
      title: "Lixo orgânico",
      description:
        "Lixo orgânico não é permitido na caixa coletora.",
    },
    {
      title: "Massa de concreto",
      description:
        "Massa de concreto não é permitida na caixa coletora.",
    },
    {
      title: "Animal morto",
      description:
        "Animal morto não é permitido na caixa coletora.",
    },
  ],
} as const;

/** Exemplos visuais de uso proibido da caixa (exibidos na solicitação e nos Termos). */
export const FORBIDDEN_USAGE_EXAMPLES = [
  {
    id: "paredao",
    badge: "Não é permitido",
    title: "Fazer paredão",
    description:
      "Não use tábuas, madeira ou outros materiais para aumentar a altura da caixa e carregar além da borda. Isso dificulta a retirada e é inseguro.",
    images: [
      {
        src: "/images/3j/3j-nao-permitido-paredao-01.jpg",
        width: 768,
        height: 1024,
        alt: "Exemplo proibido: caixa coletora com paredão de madeira e entulho acima da borda",
      },
      {
        src: "/images/3j/3j-nao-permitido-paredao-02.jpg",
        width: 768,
        height: 1024,
        alt: "Exemplo proibido: instalação de paredão com tábuas para sobrecarregar a caixa coletora",
      },
    ],
  },
] as const;
