# 3J Caixas Entulhos

Sistema web para solicitação e atendimento de alocação de caixas coletoras de entulho em Manaus - AM.

O cliente preenche a solicitação pública, recebe um protocolo gerado no banco e pode continuar o contato pelo WhatsApp. A equipe opera o atendimento no painel administrativo: dados da caixa, valores, proposta em PDF e encaminhamento operacional.

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

Preencha `.env.local` com as chaves do projeto Supabase. Não commite esse arquivo.

## Variáveis

| Variável | Onde | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser e servidor | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser e servidor | Chave anon (RLS bloqueia tabelas) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Somente servidor** | Inserts e painel via API/server actions |
| `NEXT_PUBLIC_COMPANY_WHATSAPP` | Browser | WhatsApp da empresa (DDI, só dígitos) |
| `NEXT_PUBLIC_COMPANY_PHONE` | Browser | Telefone no PDF (opcional) |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Browser | E-mail no PDF (opcional) |

Nunca prefixe `SUPABASE_SERVICE_ROLE_KEY` com `NEXT_PUBLIC_`.

## Desenvolvimento

```bash
npm run dev
```

Rotas principais:

- `/` — página inicial
- `/confirmacao-alocacao` — solicitação pública
- `/admin/login` — login administrativo
- `/admin` — dashboard
- `/admin/solicitacoes` — lista e detalhe

## Build

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
3. Cadastre as variáveis de ambiente em Production, Preview e Development.
4. Faça o deploy. Não é necessário `vercel.json`.
5. O PDF é gerado em runtime Node.js, em memória. Não usa Storage nem disco persistente.

Após o deploy, teste o fluxo público e o login administrativo.
