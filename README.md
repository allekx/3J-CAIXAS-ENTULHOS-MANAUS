# 3J Caixas Entulhos Manaus

Sistema web da **3J Caixas Entulhos Manaus** para locação de caixas coletoras de entulho (6 m³) em Manaus – AM.

O cliente conhece a empresa na landing page ou na bio (`/bio`), solicita a locação em `/confirmacao-alocacao`, recebe um protocolo gerado no banco e pode continuar pelo WhatsApp. A equipe opera as solicitações no painel administrativo: revisa os dados, salva alterações e **encaminha o atendimento pelo WhatsApp** para outro responsável. A geração de proposta em PDF está preparada no código, mas **desativada na interface** por enquanto (`ADMIN_PROPOSAL_PDF_ENABLED` em `src/constants/admin.ts`).

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
| `NEXT_PUBLIC_COMPANY_WHATSAPP` | Browser | WhatsApp da empresa (DDI + número, só dígitos) |
| `NEXT_PUBLIC_SITE_URL` | Browser | URL pública do site (canonical, sitemap, Open Graph) |
| `NEXT_PUBLIC_BIO_WEBSITE_URL` | Browser | Site institucional na `/bio` (opcional) |
| `NEXT_PUBLIC_BIO_INSTAGRAM_URL` | Browser | Instagram na `/bio` (opcional) |
| `NEXT_PUBLIC_YOUTUBE_URL` | Browser | YouTube na `/bio` (opcional) |
| `NEXT_PUBLIC_COMPANY_PHONE` | Browser | Telefone no PDF da proposta (opcional; futuro) |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Browser | E-mail no PDF da proposta (opcional; futuro) |

Padrões da `/bio` e links fixos (Google Maps, WhatsApp) estão em `src/constants/bio.ts`.

Nunca prefixe `SUPABASE_SERVICE_ROLE_KEY` com `NEXT_PUBLIC_`.

## Desenvolvimento

```bash
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

### Rotas públicas

| Rota | Descrição |
| --- | --- |
| `/` | Landing page (SEO on-page e local) |
| `/bio` | Link in bio — redes sociais e CTAs |
| `/confirmacao-alocacao` | Fluxo de solicitação de locação (3 etapas, CNPJ opcional) |
| `/robots.txt` | Robots dinâmico |
| `/sitemap.xml` | Sitemap dinâmico |

### Rotas administrativas

| Rota | Descrição |
| --- | --- |
| `/admin/login` | Login |
| `/admin` | Dashboard operacional |
| `/admin/solicitacoes` | Lista de solicitações |
| `/admin/solicitacoes/[id]` | Detalhe, edição e encaminhamento WhatsApp |
| `/admin/solicitacoes/[id]/proposta` | API de PDF (existente; UI oculta por padrão) |

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
│   ├── (site)/             # Landing page
│   ├── bio/                # Página link in bio
│   ├── confirmacao-alocacao/
│   ├── admin/
│   ├── api/allocation-requests/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── home/               # Landing
│   ├── bio/                # Bio
│   ├── alocacao/           # Fluxo de solicitação
│   └── admin/              # Painel
├── constants/              # home.ts, bio.ts, alocacao.ts, admin.ts, site.ts
└── lib/                    # SEO, Supabase, PDF, validação, documento (CNPJ)
public/
├── images/3j/              # Fotos da empresa
└── logos/                  # Logo oficial
supabase/
├── schema.sql
└── migrations/
```

## SEO

A landing principal inclui metadados, JSON-LD (Organization, LocalBusiness, Service, FAQPage), sitemap e canonical configurados via `NEXT_PUBLIC_SITE_URL`.

A página `/bio` é voltada a tráfego de redes sociais e não compete com a landing pelo mesmo objetivo de SEO.

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
3. Confirme RLS ativo nas tabelas `allocation_requests` e `allocation_protocol_counters`, sem políticas para `anon`/`authenticated`.
4. Em Authentication:
   - desative o cadastro público (sign-ups);
   - crie os usuários administrativos manualmente no dashboard;
   - não habilite recuperação de senha pública se não for necessário.
5. Copie URL, anon key e service role key para `.env.local` (local) e para a Vercel (produção).

O protocolo (`3J-AAAA-000000`) é gerado no banco. O cliente nunca envia protocolo, status, valores ou observações internas.

Se o painel exibir erro ao abrir uma solicitação com mensagem sobre coluna inexistente, execute as migrations pendentes no **SQL Editor** do Supabase.

## Deploy (Vercel)

1. Publique o repositório no GitHub.
2. Importe o projeto na Vercel (framework: Next.js).
3. Cadastre todas as variáveis de ambiente em Production, Preview e Development — em especial `NEXT_PUBLIC_SITE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
4. Faça o deploy. Não é necessário `vercel.json`.

Após o deploy, teste:

- landing (`/`);
- bio (`/bio`);
- fluxo público de locação (com e sem CNPJ);
- login administrativo, edição de solicitação e encaminhamento WhatsApp.

## Empresa (referência)

| Campo | Valor |
| --- | --- |
| Nome | 3J Caixas Entulhos Manaus |
| Serviço | Locação de caixa coletora de entulho 6 m³ |
| Permanência padrão | 3 dias úteis |
| Telefone | (92) 98594-6242 |
| WhatsApp | +55 92 98594-6242 |
| E-mail | jadaildodasilvagomes@gmail.com |
| Instagram | @3_j_caixas_entulhos_manaus |
| Localização | Estrada do Tarumã – Tarumã, Manaus – AM |
