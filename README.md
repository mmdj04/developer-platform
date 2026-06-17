# Kit de Desenvolvimento @SDKdoMatheus

Plataforma full-stack construída com Next.js 16, Tailwind CSS e shadcn/ui.

## Stack

- **Framework:** Next.js 16 (App Router, Cache Components)
- **UI:** Tailwind CSS, shadcn/ui, Radix UI
- **Formulários:** react-hook-form + zod
- **Autenticação:** localStorage (sem backend)
- **Gráficos:** D3.js, Recharts
- **Database:** Supabase (opcional)

## Começar

```bash
pnpm install
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de Ambiente

Copie `.env.example` para `.env.local` e preencha (opcional — o app funciona sem Supabase):

```
NEXT_PUBLIC_SUPABASE_URL=seu-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua-key
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Iniciar servidor em produção |
| `pnpm lint` | ESLint |
| `pnpm test` | Testes (Vitest) |
| `pnpm format` | Prettier |

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
