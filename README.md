# Frontend Farmácia

Arquitetura: Next.js (App Router), TypeScript, React Query, Axios, Radix UI, Tailwind, Design System custom.

## Scripts

- dev: desenvolvimento
- build/start: produção
- lint / type-check

## Config

API base: `NEXT_PUBLIC_API_BASE_URL` (.env.local)

## Autenticação

Access token em memória/sessionStorage. Refresh httpOnly cookie (backend). Interceptor renova em 401.

## Estrutura

- src/domain: DTOs
- src/services: chamadas HTTP puras
- src/lib: infraestrutura (axios, react-query)
- src/context: Auth
- src/design-system: componentes reutilizáveis
- src/components: composição/páginas
- src/app: rotas App Router

## Próximos Passos

- Forms com react-hook-form + zod
- Testes (Vitest / RTL)
- Internationalization (next-intl)
- CI pipeline (lint, typecheck, build)
