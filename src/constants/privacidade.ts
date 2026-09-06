import { HOME_COMPANY } from "@/constants/home";

export const PRIVACY_POLICY = {
  title: "Política de Privacidade",
  subtitle:
    "Como a 3J Caixas Entulhos Manaus trata os dados pessoais coletados neste site, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
  updatedLabel: "Atualizada em 06/09/2026",
  controller: {
    name: HOME_COMPANY.commercialName,
    legalName: HOME_COMPANY.legalName,
    cnpj: HOME_COMPANY.cnpj,
    email: HOME_COMPANY.email,
    phone: HOME_COMPANY.phoneDisplay,
    address: HOME_COMPANY.address.line,
  },
  sections: [
    {
      title: "Quem é o responsável pelos dados",
      paragraphs: [
        `O controlador dos dados pessoais tratados neste site é ${HOME_COMPANY.commercialName}, de titularidade de ${HOME_COMPANY.legalName}, CNPJ ${HOME_COMPANY.cnpj}, com sede em ${HOME_COMPANY.address.line}.`,
        `Para assuntos de privacidade, o contato é o e-mail ${HOME_COMPANY.email} ou o WhatsApp ${HOME_COMPANY.phoneDisplay}.`,
      ],
    },
    {
      title: "Quais dados coletamos",
      paragraphs: [
        "No formulário de solicitação de locação, podemos coletar:",
      ],
      bullets: [
        "Nome do responsável",
        "Telefone / WhatsApp",
        "CNPJ (opcional)",
        "Endereço da obra (rua, número, complemento, bairro, condomínio e cidade)",
        "Forma de pagamento pretendida",
        "Registro de aceite dos Termos e Condições (data/hora e versão)",
        "Dados técnicos básicos de acesso necessários à segurança do site (por exemplo, endereço IP usado no controle de abuso da API)",
      ],
    },
    {
      title: "Para que usamos os dados",
      paragraphs: [
        "Utilizamos os dados exclusivamente para fins relacionados ao serviço de locação de caixas coletoras, incluindo:",
      ],
      bullets: [
        "Receber e processar a solicitação de locação",
        "Gerar protocolo e organizar o atendimento operacional",
        "Entrar em contato por WhatsApp, telefone ou e-mail para confirmar detalhes, entrega e retirada",
        "Cumprir obrigações legais, regulatórias e de defesa em eventuais controvérsias",
        "Proteger a plataforma contra uso abusivo (ex.: rate limit)",
      ],
    },
    {
      title: "Base legal (LGPD)",
      paragraphs: [
        "O tratamento ocorre, conforme o caso, para execução de medidas preliminares e do contrato de locação (art. 7º, V, da LGPD), para atendimento a obrigações legais e para legítimo interesse em garantir a segurança e a continuidade do atendimento, sempre com respeito aos direitos do titular.",
      ],
    },
    {
      title: "Com quem compartilhamos",
      paragraphs: [
        "Não vendemos dados pessoais. Podemos compartilhar informações apenas com:",
      ],
      bullets: [
        "Equipe interna de atendimento da 3J, para operar a solicitação",
        "Prestadores de infraestrutura tecnológica (hospedagem e banco de dados), na medida necessária ao funcionamento do sistema",
        "Autoridades públicas, quando houver obrigação legal ou ordem válida",
      ],
      closing:
        "Canais como WhatsApp são usados para comunicação do atendimento, conforme a interação iniciada ou solicitada pelo cliente.",
    },
    {
      title: "Por quanto tempo guardamos",
      paragraphs: [
        "Mantemos os dados pelo tempo necessário para concluir o atendimento da locação, cumprir obrigações legais e preservar registros operacionais legítimos. Depois disso, os dados podem ser eliminados ou anonimizados, salvo hipóteses de conservação exigidas por lei.",
      ],
    },
    {
      title: "Seus direitos",
      paragraphs: [
        "Nos termos da LGPD, você pode solicitar:",
      ],
      bullets: [
        "Confirmação da existência de tratamento",
        "Acesso aos dados",
        "Correção de dados incompletos, inexatos ou desatualizados",
        "Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos",
        "Informação sobre compartilhamentos",
        "Revogação de consentimento, quando essa for a base aplicável",
      ],
      closing: `Para exercer seus direitos, envie solicitação para ${HOME_COMPANY.email} ou pelo WhatsApp ${HOME_COMPANY.phoneDisplay}, identificando-se de forma adequada.`,
    },
    {
      title: "Segurança",
      paragraphs: [
        "Adotamos medidas técnicas e organizacionais compatíveis com o porte do serviço, incluindo acesso restrito ao painel administrativo, uso de conexão segura (HTTPS) e controles para reduzir abuso da API pública. Nenhum sistema é absolutamente isento de riscos; em caso de incidente relevante, adotaremos as providências cabíveis.",
      ],
    },
    {
      title: "Cookies e links",
      paragraphs: [
        "O site pode utilizar cookies ou tecnologias semelhantes essenciais ao funcionamento e à autenticação do painel administrativo. Links para redes sociais ou mapas de terceiros seguem as políticas próprias desses serviços.",
      ],
    },
    {
      title: "Atualizações desta política",
      paragraphs: [
        "Esta Política de Privacidade pode ser atualizada para refletir mudanças no serviço ou na legislação. A versão vigente estará sempre publicada nesta página, com a data de atualização indicada no topo.",
      ],
    },
  ],
} as const;
