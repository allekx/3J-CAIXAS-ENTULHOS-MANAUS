# 3J Caixas Entulhos Manaus

Sistema web da **3J Caixas Entulhos Manaus** para locação de caixas coletoras de entulho (6 m³) em Manaus – AM.

Produção: [https://www.3jcaixasentulhosmanaus.com](https://www.3jcaixasentulhosmanaus.com)

## Visão geral

- **Entrada pública:** landing em `/` (SEO, galeria, FAQ, mapa, CTAs de solicitação / WhatsApp / Instagram).
- **Bio:** `/bio` para redes sociais; o CTA “Ir para o site” aponta para a landing (`/`).
- **Locação:** `/confirmacao-alocacao` — formulário em 3 etapas (CNPJ opcional), exemplos visuais do que **não é permitido** (ex.: paredão), aceite dos **Termos e Condições**, geração de protocolo no banco e WhatsApp na etapa final.
- **Documentos públicos:** Termos (`/confirmacao-alocacao/termos`) e Política de Privacidade LGPD (`/confirmacao-alocacao/privacidade`).
- **Painel admin:** login com identidade visual da marca; dashboard; lista e detalhe de solicitações; registro do aceite dos termos; encaminhamento WhatsApp.
- **PDF de proposta:** código preparado, UI desativada (`ADMIN_PROPOSAL_PDF_ENABLED = false` em `src/constants/admin.ts`).

Permanência padrão da caixa: **3 dias úteis** (ultrapassar gera acréscimo).

Na landing, o nome da marca (**3J Caixas Entulhos Manaus** e variantes) aparece em destaque na cor dourada padrão (`BrandText`).

## Stack

- Next.js 16 (App Router) e React 19
- TypeScript
- Tailwind CSS 4
- Supabase (Auth, Postgres, RLS)
- Zod
- `@upstash/ratelimit` + `@upstash/redis` (rate limit da API pública; opcional em produção)
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
| `SUPABASE_SERVICE_ROLE_KEY` | **Somente servidor** | Inserts e painel (aceita `service_role` legada `eyJ...` ou `sb_secret_...`) |
| `NEXT_PUBLIC_COMPANY_WHATSAPP` | Browser | WhatsApp da empresa (DDI + número, só dígitos). Padrão: `5592985946242` |
| `NEXT_PUBLIC_SITE_URL` | Browser | URL pública do site (canonical, sitemap, Open Graph) |
| `NEXT_PUBLIC_BIO_WEBSITE_URL` | Browser | Override do CTA “Ir para o site” na `/bio` (padrão: `/`) |
| `NEXT_PUBLIC_BIO_INSTAGRAM_URL` | Browser | Instagram na `/bio` (opcional) |
| `NEXT_PUBLIC_YOUTUBE_URL` | Browser | YouTube na `/bio` (opcional) |
| `NEXT_PUBLIC_COMPANY_PHONE` | Browser | Telefone no PDF da proposta (opcional; futuro) |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Browser | E-mail no PDF da proposta (opcional; futuro) |
| `UPSTASH_REDIS_REST_URL` | **Somente servidor** | Rate limit da API pública (opcional; Upstash) |
| `UPSTASH_REDIS_REST_TOKEN` | **Somente servidor** | Token Upstash Redis (opcional) |

Padrões da `/bio` e WhatsApp estão em `src/constants/bio.ts`. Endereço, Instagram da landing e mapa (`HOME_COMPANY`, `HOME_MAPS`) estão em `src/constants/home.ts`. Exemplos de uso proibido da caixa (`FORBIDDEN_USAGE_EXAMPLES`) estão em `src/constants/termos-locacao.ts`.

O perfil oficial no Google Maps: [maps.app.goo.gl/K4KQGPyK1nJ5nfpp8](https://maps.app.goo.gl/K4KQGPyK1nJ5nfpp8).

O número de WhatsApp oficial é **+55 92 98594-6242** (`5592985946242`). Usado na landing, na bio e no botão **Falar pelo WhatsApp** da etapa final de `/confirmacao-alocacao`.

Instagram da landing: [@3_j_caixas_entulhos_manaus](https://www.instagram.com/3_j_caixas_entulhos_manaus) — CTAs no hero e no rodapé.

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
| `/inicio` | Redireciona para `/` (legado) |
| `/confirmacao-alocacao` | Solicitação de locação (3 etapas) + exemplos “não permitido” + WhatsApp na etapa final |
| `/confirmacao-alocacao/termos` | Termos e Condições (com imagens de exemplo) |
| `/confirmacao-alocacao/privacidade` | Política de Privacidade (LGPD) |
| `/robots.txt` | Robots dinâmico |
| `/sitemap.xml` | Sitemap dinâmico |

### Rotas administrativas

| Rota | Descrição |
| --- | --- |
| `/admin/login` | Login (logo oficial, preto e dourado) |
| `/admin` | Dashboard operacional |
| `/admin/solicitacoes` | Lista com busca + filtros avançados (“Filtrar por”) |
| `/admin/solicitacoes/[id]` | Detalhe, edição, aceite dos termos e encaminhamento WhatsApp |
| `/admin/solicitacoes/[id]/proposta` | API de PDF (UI oculta por padrão) |

Login e sidebar do painel usam o logo oficial (`public/logos/logo-3j-oficial.jpg`). Favicon do site também usa a logo da marca.

### Fluxo público de locação

1. Preencher dados (CNPJ opcional), ver exemplos do que não é permitido (ex.: paredão) e aceitar os Termos e Condições.
2. Revisar informações da caixa (6 m³, permanência de 3 dias úteis).
3. Confirmar — o servidor valida o payload (Zod), aplica rate limit e grava a solicitação com protocolo + aceite dos termos.
4. Na etapa final, falar pelo WhatsApp e consultar a Política de Privacidade.

### Fluxo do painel

1. Abrir a solicitação em **Solicitações**.
2. Revisar ou ajustar dados (cliente, endereço, caixa, datas, observações internas).
3. Conferir o **aceite dos Termos** (data/hora e versão), quando registrado.
4. **Salvar alterações**.
5. **Encaminhar atendimento** — WhatsApp com mensagem formatada (inclui o aceite, se houver).

Valores da proposta e botões de PDF não aparecem enquanto `ADMIN_PROPOSAL_PDF_ENABLED` é `false`.

## Estrutura do projeto (resumo)

```
src/
├── app/                    # Rotas Next.js
│   ├── (site)/             # Landing em `/`; `/inicio` → `/`
│   ├── bio/
│   ├── confirmacao-alocacao/   # Fluxo + /termos + /privacidade
│   ├── admin/              # Login + painel
│   ├── api/allocation-requests/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── home/               # Landing (BrandText, galeria, FAQ, CTAs)
│   ├── bio/
│   ├── alocacao/           # Fluxo + exemplos de uso proibido
│   └── admin/              # Painel, login, filtros, formulários
├── constants/              # home, bio, alocacao, termos, privacidade, admin, site
└── lib/                    # SEO, Supabase, rate limit, PDF, validação, LGPD helpers
public/
├── images/3j/              # Fotos da empresa + exemplos “não permitido”
├── logos/                  # Logo oficial
├── videos/                 # Vídeo do serviço
└── favicon.ico
supabase/
├── schema.sql
└── migrations/
```

## SEO

A landing em `/` é a entrada indexável principal (metadados, JSON-LD `Organization` / `LocalBusiness` / `WebSite` / `WebPage`, Open Graph).

Para o Google Search mostrar **nome da empresa**, **favicon** e **miniatura**:

- `NEXT_PUBLIC_SITE_URL` deve ser o domínio canônico em produção (ex.: `https://www.3jcaixasentulhosmanaus.com`).
- Favicons em `/icons/icon-48.png` (e 96/192/512) + logo em `public/logos/`.
- Imagem social `og:image` em `/images/3j/og-share.jpg` (1200×630).
- Schema com `name: "3J Caixas Entulhos Manaus"` e `logo` / `primaryImageOfPage`.

O Google pode levar dias para atualizar o resultado. Após o deploy: Google Search Console → solicitar indexação da home e, se disponível, definir o **nome do site**.

O sitemap inclui `/`, locação, termos, privacidade e `/bio`.

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
   - `006_terms_accepted.sql` — aceite dos Termos (`terms_accepted_at`, `terms_version`)
3. Confirme RLS ativo nas tabelas `allocation_requests` e `allocation_protocol_counters`, sem políticas para `anon`/`authenticated`.
4. Em Authentication:
   - desative o cadastro público (sign-ups);
   - crie os usuários administrativos **manualmente** no dashboard (qualquer usuário Auth autenticado acessa o painel);
   - não habilite recuperação de senha pública se não for necessário.
5. Copie URL, anon key e service role / secret key para `.env.local` e para a Vercel.

O protocolo (`3J-AAAA-000000`) é gerado no banco. O cliente nunca envia protocolo, status, valores ou observações internas.

### Rate limit da API pública

`POST /api/allocation-requests` limita **5 tentativas por IP a cada 15 minutos**.

- Sem Upstash: limite em memória do processo (ok em localhost).
- Em produção na Vercel: recomenda-se **Upstash Redis** no Marketplace e as variáveis `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` como **Config**.

Se o painel falhar por coluna inexistente, execute as migrations pendentes no **SQL Editor** do Supabase.

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
| `NEXT_PUBLIC_SITE_URL` | domínio canônico (ex.: `https://www.3jcaixasentulhosmanaus.com`) |
| `NEXT_PUBLIC_COMPANY_WHATSAPP` | `5592985946242` |

Após alterar qualquer `NEXT_PUBLIC_*`, faça um **novo deploy**.

### Checklist pós-deploy

- Landing (`/`) — mapa oficial, CTAs (solicitação, WhatsApp, Instagram) no hero e no rodapé
- Bio (`/bio`) — “Ir para o site” → `/`; mapa e Instagram/YouTube
- Locação — exemplos “não permitido” (paredão), Termos, Privacidade e WhatsApp na etapa final
- SEO — favicon da logo, nome “3J Caixas Entulhos Manaus”, preview `og-share.jpg`; solicitar reindexação no Search Console
- Login admin, dashboard, lista/filtros, detalhe com aceite dos termos e encaminhamento WhatsApp
- Rate limit (opcional: confirmar Upstash em produção)

## Empresa (referência)

| Campo | Valor |
| --- | --- |
| Nome | 3J Caixas Entulhos Manaus |
| Razão social | Jadaildo da Silva Gomes |
| CNPJ | 64.160.751/0001-58 |
| Inscrição municipal | 702250001 |
| Serviço | Locação de caixa coletora de entulho 6 m³ |
| Permanência padrão | 3 dias úteis |
| Telefone / WhatsApp | (92) 98594-6242 (`5592985946242`) |
| E-mail | jadaildodasilvagomes@gmail.com |
| Instagram | [@3_j_caixas_entulhos_manaus](https://www.instagram.com/3_j_caixas_entulhos_manaus) |
| Endereço | Estrada do Tarumã – Tarumã, Manaus – AM, CEP 69041-650 |
| Google Maps | [Perfil oficial 3J CAIXAS ENTULHOS MANAUS](https://maps.app.goo.gl/K4KQGPyK1nJ5nfpp8) |
| Produção | https://www.3jcaixasentulhosmanaus.com |
