# 3J Caixas Entulhos Manaus

Sistema web da **3J Caixas Entulhos Manaus** para locação de caixas coletoras de entulho (6 m³) em Manaus – AM.

Produção: [https://3-j-caixas-entulhos-manaus.vercel.app](https://3-j-caixas-entulhos-manaus.vercel.app)

A entrada pública é a landing em `/`. A bio (`/bio`) continua disponível para redes sociais. O cliente solicita a locação em `/confirmacao-alocacao`, recebe um protocolo gerado no banco e pode continuar pelo WhatsApp do responsável. A equipe opera as solicitações no painel administrativo: revisa os dados, salva alterações e **encaminha o atendimento pelo WhatsApp** para outro responsável. A geração de proposta em PDF está preparada no código, mas **desativada na interface** por enquanto (`ADMIN_PROPOSAL_PDF_ENABLED` em `src/constants/admin.ts`).

## Stack

- Next.js 16 (App Router) e React 19
- TypeScript
- Tailwind CSS 4
- Supabase (Auth, Postgres, RLS)
- Zod
- `@react-pdf/renderer` (proposta comercial em memória — uso futuro)
- Lucide Icons

## Instalação

```bash
npm install
cp .env.example .env.local
```

Preencha `.env.local` com as chaves do Supabase e as variáveis públicas da empresa. Não commite esse arquivo.

Requisito: Node.js ≥ 20.9.0.

## Variáveis de ambiente

| Variável | Onde | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser e servidor | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser e servidor | Chave anon (RLS bloqueia tabelas) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Somente servidor** | Inserts e painel via API/server actions |
| `NEXT_PUBLIC_COMPANY_WHATSAPP` | Browser | WhatsApp da empresa (DDI + número, só dígitos). Padrão: `5592985946242` |
| `NEXT_PUBLIC_SITE_URL` | Browser | URL pública do site (canonical, sitemap, Open Graph) |
| `NEXT_PUBLIC_BIO_WEBSITE_URL` | Browser | Site institucional na `/bio` (opcional) |
| `NEXT_PUBLIC_BIO_INSTAGRAM_URL` | Browser | Instagram na `/bio` (opcional) |
| `NEXT_PUBLIC_YOUTUBE_URL` | Browser | YouTube na `/bio` (opcional) |
| `NEXT_PUBLIC_COMPANY_PHONE` | Browser | Telefone no PDF da proposta (opcional; futuro) |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Browser | E-mail no PDF da proposta (opcional; futuro) |
| `UPSTASH_REDIS_REST_URL` | **Somente servidor** | Rate limit da API pública (opcional; Upstash) |
| `UPSTASH_REDIS_REST_TOKEN` | **Somente servidor** | Token Upstash Redis (opcional) |

Padrões da `/bio` e links fixos (Google Maps, WhatsApp) estão em `src/constants/bio.ts`.

O número de WhatsApp oficial da empresa é **+55 92 98594-6242** (`5592985946242`). Ele é usado na landing, na bio e no botão **Falar pelo WhatsApp** da etapa final de `/confirmacao-alocacao`. Se `NEXT_PUBLIC_COMPANY_WHATSAPP` estiver vazia, o código usa esse número como fallback.

Nunca prefixe `SUPABASE_SERVICE_ROLE_KEY` com `NEXT_PUBLIC_`.

## Desenvolvimento

```bash
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

### Rotas públicas

| Rota | Descrição |
| --- | --- |
| `/` | Landing principal (entrada pública) |
| `/bio` | Link in bio — redes sociais e CTAs |
| `/inicio` | Redireciona para `/` (legado do preview) |
| `/confirmacao-alocacao` | Fluxo de solicitação de locação (3 etapas, CNPJ opcional) + WhatsApp na etapa final |
| `/confirmacao-alocacao/termos` | Termos e Condições da locação |
| `/confirmacao-alocacao/privacidade` | Política de Privacidade (LGPD) |
| `/robots.txt` | Robots dinâmico |
| `/sitemap.xml` | Sitemap dinâmico (prioriza `/`) |

### Rotas administrativas

| Rota | Descrição |
| --- | --- |
| `/admin/login` | Login com identidade visual da marca (logo, preto e dourado) |
| `/admin` | Dashboard operacional |
| `/admin/solicitacoes` | Lista de solicitações |
| `/admin/solicitacoes/[id]` | Detalhe, edição e encaminhamento WhatsApp |
| `/admin/solicitacoes/[id]/proposta` | API de PDF (existente; UI oculta por padrão) |

A tela `/admin/login` usa o logo oficial (`public/logos/logo-3j-oficial.jpg`), fundo preto e acentos dourados da marca. O restante do painel mantém o layout operacional.

### Fluxo do painel (atual)

1. Abrir a solicitação em **Solicitações**.
2. Revisar ou ajustar dados (cliente, endereço, caixa, datas, observações internas).
3. **Salvar alterações**.
4. **Encaminhar atendimento** — abre o WhatsApp com mensagem formatada para o outro atendente.

Valores da proposta e botões de PDF não aparecem enquanto `ADMIN_PROPOSAL_PDF_ENABLED` é `false`. Para reativar no futuro, altere essa constante para `true`.

## Estrutura do projeto (resumo)

```
src/
├── app/                    # Rotas Next.js
│   ├── (site)/             # Landing em `/`; `/inicio` → `/`
│   ├── bio/                # Link in bio
│   ├── confirmacao-alocacao/
│   ├── admin/              # Login + painel
│   ├── api/allocation-requests/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── home/               # Landing
│   ├── bio/                # Bio
│   ├── alocacao/           # Fluxo de solicitação + header da marca
│   └── admin/              # Painel e login (`AdminLoginView`)
├── constants/              # home.ts, bio.ts, alocacao.ts, admin.ts, site.ts
└── lib/                    # SEO, Supabase, PDF, validação, documento (CNPJ)
public/
├── images/3j/              # Fotos da empresa
└── logos/                  # Logo oficial (login e locação)
supabase/
├── schema.sql
└── migrations/
```

## SEO

A landing em `/` é a entrada indexável principal (metadados, JSON-LD, Open Graph). O sitemap prioriza `/`, depois `/confirmacao-alocacao` e `/bio`.

A página `/bio` permanece disponível para tráfego de redes sociais.

Após o deploy, configure o domínio em `NEXT_PUBLIC_SITE_URL` e submeta o sitemap no Google Search Console.

## Build e produção

```bash
npm run lint
npm run build
npm start
```

## Supabase

1. Crie o projeto no Supabase.
2. Execute `supabase/schema.sql` em um projeto novo **ou** as migrations em `supabase/migrations/` na ordem, se o banco já existir:
   - `002_proposal_financials.sql` — valores e observações da proposta
   - `003_dashboard_operation_indexes.sql` — índices do dashboard
   - `004_customer_document.sql` — coluna `customer_document` (CNPJ opcional)
   - `005_cnpj_optional.sql` — constraint do CNPJ
   - `006_terms_accepted.sql` — aceite dos Termos e Condições (`terms_accepted_at`, `terms_version`)
3. Confirme RLS ativo nas tabelas `allocation_requests` e `allocation_protocol_counters`, sem políticas para `anon`/`authenticated`.
4. Em Authentication:
   - desative o cadastro público (sign-ups);
   - crie os usuários administrativos manualmente no dashboard;
   - não habilite recuperação de senha pública se não for necessário.
5. Copie URL, anon key e service role key para `.env.local` (local) e para a Vercel (produção).

O protocolo (`3J-AAAA-000000`) é gerado no banco. O cliente nunca envia protocolo, status, valores ou observações internas.

A API pública `POST /api/allocation-requests` tem rate limit de **5 tentativas por IP a cada 15 minutos**. Sem Upstash, o limite roda em memória do processo (suficiente em localhost). Em produção na Vercel, recomenda-se criar um **Upstash Redis** no Marketplace e cadastrar `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` como Config.

Se o painel exibir erro ao abrir uma solicitação com mensagem sobre coluna inexistente, execute as migrations pendentes no **SQL Editor** do Supabase.

## Deploy (Vercel)

1. Publique o repositório no GitHub.
2. Importe o projeto na Vercel (framework: Next.js).
3. Cadastre as variáveis de ambiente em Production e Preview.
4. Faça o deploy. Não é necessário `vercel.json`.

### Variáveis na Vercel (importante)

Cadastre as variáveis como tipo **Config** (não **Sensitive/Secret**). No tipo Secret, o Next.js na Vercel pode não injetar o valor em `process.env`, o que quebra:

- `/admin` e `/admin/login` — se faltarem `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- dashboard e solicitações — se faltar `SUPABASE_SERVICE_ROLE_KEY`

Valores atuais esperados em produção:

| Variável | Valor |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://3-j-caixas-entulhos-manaus.vercel.app` |
| `NEXT_PUBLIC_COMPANY_WHATSAPP` | `5592985946242` |

Após alterar qualquer `NEXT_PUBLIC_*`, faça um **novo deploy** (essas variáveis entram no build).

Após o deploy, teste:

- landing (`/`);
- bio (`/bio`);
- fluxo público de locação (com e sem CNPJ) e botão WhatsApp na etapa final;
- login administrativo (`/admin/login`), dashboard, edição de solicitação e encaminhamento WhatsApp.

## Empresa (referência)

| Campo | Valor |
| --- | --- |
| Nome | 3J Caixas Entulhos Manaus |
| Serviço | Locação de caixa coletora de entulho 6 m³ |
| Permanência padrão | 3 dias úteis |
| Telefone | (92) 98594-6242 |
| WhatsApp | +55 92 98594-6242 (`5592985946242`) |
| E-mail | jadaildodasilvagomes@gmail.com |
| Instagram | @3_j_caixas_entulhos_manaus |
| Localização | Estrada do Tarumã – Tarumã, Manaus – AM |
| Produção | https://3-j-caixas-entulhos-manaus.vercel.app |
