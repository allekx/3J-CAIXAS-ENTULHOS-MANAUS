# 3J Caixas Entulhos Manaus

Sistema web da **3J Caixas Entulhos Manaus** para locação de caixas coletoras de entulho (6 m³) em Manaus – AM.

O cliente conhece a empresa na landing page ou na bio (`/bio`), solicita a locação em `/confirmacao-alocacao`, recebe um protocolo gerado no banco e pode continuar pelo WhatsApp. A equipe opera solicitações no painel administrativo: dados da caixa, valores, proposta em PDF e encaminhamento operacional.

## Stack

- Next.js 16 (App Router) e React 19
- TypeScript
- Tailwind CSS 4
- Supabase (Auth, Postgres, RLS)
- Zod
- `@react-pdf/renderer` (proposta comercial em memória)
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
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | Browser | Link de avaliações Google (opcional; padrão em `src/constants/bio.ts`) |
| `NEXT_PUBLIC_YOUTUBE_URL` | Browser | Canal YouTube (opcional; padrão em `src/constants/bio.ts`) |
| `NEXT_PUBLIC_COMPANY_PHONE` | Browser | Telefone no PDF da proposta (opcional) |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Browser | E-mail no PDF da proposta (opcional) |

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
| `/bio` | Link in bio — Instagram, redes sociais |
| `/confirmacao-alocacao` | Fluxo de solicitação de locação (3 etapas) |
| `/robots.txt` | Robots dinâmico |
| `/sitemap.xml` | Sitemap dinâmico |

### Rotas administrativas

| Rota | Descrição |
| --- | --- |
| `/admin/login` | Login |
| `/admin` | Dashboard |
| `/admin/solicitacoes` | Lista de solicitações |
| `/admin/solicitacoes/[id]` | Detalhe e edição |
| `/admin/solicitacoes/[id]/proposta` | Geração de PDF da proposta |

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
├── constants/              # home.ts, bio.ts, alocacao.ts, site.ts
└── lib/                    # SEO, Supabase, PDF, validação
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
2. Execute `supabase/schema.sql` em um projeto novo **ou** as migrations em `supabase/migrations/` na ordem, se o banco já existir.
3. Confirme RLS ativo nas tabelas `allocation_requests` e `allocation_protocol_counters`, sem políticas para `anon`/`authenticated`.
4. Em Authentication:
   - desative o cadastro público (sign-ups);
   - crie os usuários administrativos manualmente no dashboard;
   - não habilite recuperação de senha pública se não for necessário.
5. Copie URL, anon key e service role key para `.env.local` (local) e para a Vercel (produção).

O protocolo (`3J-AAAA-000000`) é gerado no banco. O cliente nunca envia protocolo, status, valores ou observações internas.

## Deploy (Vercel)

1. Publique o repositório no GitHub.
2. Importe o projeto na Vercel (framework: Next.js).
3. Cadastre todas as variáveis de ambiente em Production, Preview e Development — em especial `NEXT_PUBLIC_SITE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
4. Faça o deploy. Não é necessário `vercel.json`.
5. O PDF é gerado em runtime Node.js, em memória. Não usa Storage nem disco persistente.

Após o deploy, teste:

- landing (`/`);
- bio (`/bio`);
- fluxo público de locação;
- login administrativo e geração de PDF.

## Empresa (referência)

| Campo | Valor |
| --- | --- |
| Nome | 3J Caixas Entulhos Manaus |
| Serviço | Locação de caixa coletora de entulho 6 m³ |
| Permanência padrão | 3 dias úteis |
| Telefone | (92) 98594-6242 |
| WhatsApp | +55 92 98594-6242 |
| E-mail | jadaildodasilvagomes@gmail.com |
| Instagram | @3JCAIXASENTULHOSMANAUS |
| Localização | Estrada do Tarumã – Tarumã, Manaus – AM |
