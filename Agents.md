# AGENTS.md — Guia de Desenvolvimento (MVP Next.js)

Este repositório é desenvolvido com suporte de agentes (IA) e humanos.
O objetivo é manter código limpo, testável e com arquitetura pronta para extrair uma API futuramente (ex.: NestJS) sem refatoração pesada.

---

## 0) Regra de ouro (antes de codar)

✅ Antes de codar uma solução, apresente o plano de desenvolvimento e aguarde a confirmação para executar o código.

O plano deve incluir:
- abordagem técnica
- arquivos que serão criados/alterados
- impacto em rotas, schema e banco
- testes a adicionar/ajustar
- migrações (se houver)

---

## 1) Princípios do MVP (100% em Next)

Construir tudo dentro do Next **agora**, mas com arquitetura pronta para extrair a API depois, seguindo 3 cuidados:

- **Camada de domínio/serviços fora de `/app/api`**
- **Contratos tipados (Zod)**
- **Separar “adapters” (IA, DB) do “core” (regras)**

Assim, se migrar para Nest, move-se apenas os adapters e mantém-se o core.

---

## 2) Arquitetura (camadas) e regras de dependência

### Camadas
- **Core (regras):** entidades, value objects, casos de uso, políticas, validações de negócio.
- **Ports (contratos):** interfaces para DB/IA/serviços externos.
- **Adapters (infra):** Prisma/DB, OpenAI, email, cache etc.
- **Web (Next):** UI, Server Actions, Route Handlers, controllers.

### Regras de dependência (obrigatórias)
- `core` **não importa** Next, Prisma, OpenAI, fetch, env, cookies.
- `adapters` podem importar libs externas, mas **não contêm regra de negócio**.
- `app/api` e `app/*` só orquestram: validam input, chamam use cases, retornam resposta.

---

## 3) Estrutura de pastas (sugestão)

- `src/core/`  
  - `entities/`, `value-objects/`, `use-cases/`, `errors/`, `policies/`
- `src/ports/`  
  - contratos: `ItemRepository`, `AiClient`, etc.
- `src/adapters/`  
  - `db/` (Prisma impl), `ai/` (OpenAI impl), `cache/` etc.
- `src/contracts/`  
  - schemas Zod (request/response), types derivados
- `src/app/`  
  - rotas, UI, server actions, route handlers

> Se o repo já tem estrutura do TailAdmin, manter e só encaixar `src/*` acima.

---

## 4) Contratos (Zod) — padrão obrigatório

- Todo endpoint/action deve ter:
  - `RequestSchema` (Zod)
  - `ResponseSchema` (Zod) quando fizer sentido
- Tipos sempre derivados:
  - `type X = z.infer<typeof XSchema>`

**Nunca** duplicar tipo manualmente.

---

## 5) Padrão de endpoints (Route Handlers) e Server Actions

### Route Handlers (`/app/api/*`)
- Responsabilidade:
  1) autenticação/autorização (se aplicável)
  2) parse/validate input (Zod)
  3) chamar use case do core
  4) mapear retorno/erro para HTTP

### Server Actions
- Mesmo padrão: validar (Zod) → use case → retornar DTO

---

## 6) Regras de banco (Prisma) e migrações

- Alterou model Prisma? ✅ criar migration.
- Não usar query direta fora de `src/adapters/db`.
- Repositórios devem existir em `ports` + implementação em `adapters/db`.

---

## 7) Tratamento de erros (padrão único)

- Erros de domínio (core): `DomainError` (ex.: `NotFound`, `Validation`, `Conflict`)
- Web layer converte erro → status code + body padronizado.

**Não** lançar `Error("string")` no core.

---

## 7.1) Finalização do desenvolvimento do código
- executar o script typecheck para verificar erros;
- caso tenha erro corriji-los;

## 8) Convenções de commit e branches

- Branches:
  - `feat/...`, `fix/...`, `chore/...`, `docs/...`
- Commits (sugestão):
  - Conventional Commits: `feat:`, `fix:`, etc.

---

## 9) Testes (mínimo aceitável)

- `core/use-cases`: teste unitário sempre que criar/alterar regra relevante
- `adapters`: teste quando houver lógica de mapeamento relevante
- `web`: smoke test/integração quando endpoints críticos mudarem

---

## 10) Segurança (mínimo do MVP)

- Validar input com Zod sempre.
- Nunca logar tokens/segredos.
- Sanitizar/normalizar dados de entrada onde fizer sentido.
- Rate limit e proteção básica em endpoints sensíveis (quando aplicável).

---

## 11) Definition of Done (DoD)

Uma tarefa está “pronta” quando:
- passa lint/typecheck/build
- contratos Zod estão corretos
- regra de dependência não foi violada (core sem infra)
- testes adicionados/ajustados (quando aplicável)
- sem TODOs soltos sem issue linkada

---

## 12) Checklist rápido (antes do PR)

- [ ] Zod schema para input
- [ ] Use case no core (sem dependência de infra)
- [ ] Port + adapter quando precisar DB/IA
- [ ] Erros de domínio mapeados
- [ ] Testes relevantes
- [ ] Documentação mínima atualizada (README/PRD se necessário)
