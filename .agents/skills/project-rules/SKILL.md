---
name: project-rules
description: "Regras do projeto. Use ao criar arquivos, instalar dependências, ou configurar deploy. Aplica-se a todo o ciclo de desenvolvimento no OpenCode: instalação de pacotes, geração de lockfiles, commits, e configuração de CI/CD."
metadata:
  author: developer-platform
  version: "1.0.0"
---

# Project Rules — Developer Platform

## 1. NUNCA crie `package-lock.json`

Este projeto usa **pnpm** como gerenciador de pacotes. O lockfile oficial é `pnpm-lock.yaml`.

- **NUNCA** execute `npm install` — isso criaria `package-lock.json` desnecessariamente.
- **NUNCA** crie ou commite `package-lock.json`, `yarn.lock`, `bun.lock`, ou qualquer outro lockfile que não seja `pnpm-lock.yaml`.
- O `pnpm-lock.yaml` já existe e deve ser a única fonte de verdade das dependências.

**Motivo:** Evitar arquivos grandes e desnecessários no repositório que gastam memória e confundem o histórico.

## 2. `node_modules` nunca é comitado

`/node_modules` já está no `.gitignore`. Nunca force a inclusão.

## 3. GitHub/Vercel cuidam da instalação em produção

- O Vercel detecta automaticamente o `pnpm-lock.yaml` e instala as dependências no deploy.
- O GitHub Actions (quando configurado) também instala automaticamente.
- No OpenCode, o ambiente de desenvolvimento local é apenas para **desenvolvimento e testes**.

## 4. Uso do OpenCode

- OpenCode é usado exclusivamente para desenvolvimento local: editar código, rodar `pnpm dev`, testar, debugar.
- Não usar OpenCode para fazer deploy ou gerenciar infraestrutura.
- Scripts disponíveis:
  ```
  pnpm dev        — Iniciar servidor de desenvolvimento Next.js
  pnpm build      — Build de produção
  pnpm start      — Iniciar servidor de produção
  pnpm lint       — Rodar ESLint
  pnpm format     — Rodar Prettier
  pnpm typegen    — Gerar tipos TypeScript do Supabase
  ```

## 5. Stack do Projeto

| Tecnologia | Versão |
|---|---|
| Next.js | 15 (App Router) |
| React | 19 |
| Supabase | latest |
| shadcn/ui | New York style |
| Tailwind CSS | v4 |
| TypeScript | strict mode |
| pnpm | workspace |

## 6. Commits

- Commits devem ser concisos e descritivos.
- Não commitar arquivos gerados (`.next/`, `node_modules/`, lockfiles extras).
- Husky + lint-staged rodam ESLint e Prettier automaticamente nos arquivos staged.
