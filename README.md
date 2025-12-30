# 🧠✨ Life Consultant — MVP

## 🌍 Visão do Produto

O **Life Consultant** é um aplicativo que atua como um **consultor inteligente e realista**, ajudando o usuário a definir objetivos, avaliar sua viabilidade com base na vida real (rotina, tempo, energia e recursos) e transformar esses objetivos em **planos executáveis**, por meio da geração de tarefas claras e priorizadas.

Diferente de apps de produtividade tradicionais, o Life Consultant:

* ❌ Não assume que todo objetivo é viável
* ❌ Não gera tarefas genéricas
* ❌ Não ignora limitações reais

O sistema confronta objetivos com dados concretos, explica quando algo **não é possível no momento**, sugere **caminhos alternativos** e ajuda o usuário a executar com os pés no chão.

---

## 🧭 O que o App Faz (MVP)

### 🎯 Consultoria Orientada a Objetivos

* O usuário define objetivos por área da vida (ex: 💰 Finanças, 🏋️ Saúde, 🚀 Carreira).
* É possível ter **múltiplos objetivos por área**, com prioridades definidas pelo usuário.
* O consultor avalia se cada objetivo é:

  * ✅ Viável
  * ⚠️ Parcialmente viável
  * ❌ Inviável

---

### 🔍 Avaliação Realista de Viabilidade

* O sistema cruza objetivos com:

  * 🕒 Rotina do usuário
  * ⏳ Tempo disponível
  * ⚡ Energia média
  * 💸 Recursos (renda, conhecimento, etc.)
* Quando um objetivo não é viável, o consultor:

  * Explica o **porquê**
  * Sugere alternativas realistas (ex: aumentar renda, ajustar prazo ou escopo)

---

### 🧠🛣️ Estratégias e Planos de Ação

* Para cada objetivo, o sistema sugere **estratégias possíveis**.
* O usuário escolhe **qual caminho seguir**.
* A partir disso, o sistema gera **tarefas SMART**, adaptadas à rotina real.

---

### 🗓️ Planejamento Baseado na Vida Real

* O app entende diferentes **tipos de dia**:

  * 🏠 Home office
  * 🏢 Escritório
  * 😴 Baixa energia
  * ⚡ Alta energia
* As tarefas são criadas com:

  * ⏱️ Duração estimada
  * 🔋 Nível de energia necessário
  * 🧩 Tipo de tarefa (objetivo, rotina, manutenção)

---

### 📊 Priorização com Matriz de Eisenhower

* A Matriz de Eisenhower é usada **apenas para priorização e execução**.
* Tarefas SMART **não são eliminadas** pela matriz.
* A Eisenhower ajuda a decidir:

  * 🕰️ **Quando fazer**
  * 🎯 **O que focar agora**

---

### ⚠️🤝 Conflitos e Decisão do Usuário

* Quando há conflito entre objetivos (tempo, energia ou recursos), o consultor:

  * 🚨 Comunica claramente o problema
  * 🗣️ Pede confirmação do usuário
* O sistema se adapta com base na decisão, **sem impor prioridades automaticamente**.

---

### 🔄📈 Feedback Contínuo

* O usuário faz check-ins periódicos.
* O consultor:

  * Ajusta planos
  * Reavalia estratégias
  * Refina estimativas
* 📌 O sistema aprende com a execução real, **sem culpar o usuário**.

---

## 🧪 Escopo do MVP

O MVP foca **exclusivamente** em:

* 🧠 Consultoria orientada a objetivos
* 🔍 Avaliação de viabilidade
* 🛣️ Geração de estratégias
* 🛠️ Geração de tarefas SMART
* 📊 Priorização com Eisenhower
* ⚠️ Conflitos e decisões do usuário

### 🚫 Fora do MVP (por enquanto)

* 💳 Controle financeiro detalhado
* 🏃 Fitness tracker completo
* 😴 Sono, hábitos, saúde avançada
* 🔗 Integrações externas
* 🏆 Gamificação ou social

📌 Esses módulos futuramente servirão como **fontes de dados** para melhorar o consultor.

---

## 🧩 Épicos do MVP (Guia de Desenvolvimento)

### 1️⃣ 🧍 Onboarding & Rotina

* Cadastro do usuário
* Configuração da rotina mínima
* Definição de tipos de dia e energia média
* Cálculo de capacidade semanal real

---

### 2️⃣ 🎯 Áreas da Vida & Objetivos

* CRUD de áreas da vida
* CRUD de objetivos
* Múltiplos objetivos por área
* Definição de prioridade pelo usuário
* Pausar e reativar objetivos

---

### 3️⃣ 🧠 Consultor Inteligente (Core do Produto)

* Avaliação de viabilidade de objetivos
* Explicações claras e realistas
* Detecção de conflitos entre objetivos
* Solicitação de decisão explícita do usuário

---

### 4️⃣ 🛣️ Estratégias

* Geração de estratégias alternativas
* Avaliação de esforço, impacto e risco
* Escolha da estratégia pelo usuário
* Controle da estratégia ativa

---

### 5️⃣ 🛠️ Gerador de Tarefas SMART

* Geração de tarefas a partir da estratégia
* Tarefas pequenas, executáveis e realistas
* Metadados de tempo, energia e tipo
* Edição manual pelo usuário

---

### 6️⃣ 📊 Priorização com Eisenhower

* Classificação semanal das tarefas
* Visualização por quadrantes
* Ajuste manual de prioridade
* Proteção das tarefas importantes e não urgentes

---

### 7️⃣ ⚠️ Conflitos & Decisão do Usuário

* Registro de conflitos de prioridade
* Comunicação clara do consultor
* Decisão explícita do usuário
* Histórico de decisões

---

### 8️⃣ 🔄 Feedback & Aprendizado

* Check-in semanal
* Ajuste de capacidade
* Reavaliação de estratégias
* Evolução contínua do plano

---

## 🧱 Infra e Setup Local

### ✅ Pré-requisitos

* Docker + Docker Compose
* Node.js 18+

### 🚀 Subindo o banco (Postgres)

1. Copie o `.env.example` para `.env` e ajuste se necessário.
2. Suba o container:

```bash
docker compose up -d
```

### 🧬 Prisma (migrations)

```bash
npm run db:migrate
```

### ▶️ Rodando o app

```bash
npm run dev
```

### 🔐 Auth (registro básico)

* Endpoint para criar usuário:

```
POST /api/auth/register
```

Body esperado:

```json
{
  "email": "user@email.com",
  "password": "minha-senha",
  "name": "Meu Nome"
}
```

### 📌 Variáveis de ambiente (Vercel)

Configure no dashboard:

* `DATABASE_URL`
* `NEXTAUTH_SECRET`
* `NEXTAUTH_URL` (ex: `https://sua-url.vercel.app`)

## 🗂️ Backlog do MVP (Épicos, User Stories e Critérios de Aceite)

### 1️⃣ 🧍 Onboarding & Rotina

**US1 — Cadastro de rotina mínima**  
Como usuário, quero informar minha rotina e disponibilidade para que o consultor calcule minha capacidade real.

Critérios de aceite:
* Formulário com horários de trabalho, tempo livre e sono/energia média.
* Validação de campos obrigatórios e confirmação de salvamento.
* Dados ficam editáveis após o onboarding.

**US2 — Tipos de dia e níveis de energia**  
Como usuário, quero definir tipos de dia (home office, escritório, baixa/alta energia) para que tarefas respeitem meu contexto.

Critérios de aceite:
* Criar/editar tipos de dia com um nível de energia associado.
* Deve existir ao menos um tipo de dia ativo.
* Tipos de dia são usados no planejamento semanal.

**US3 — Capacidade semanal real**  
Como usuário, quero ver minha capacidade semanal estimada para entender o quanto consigo executar.

Critérios de aceite:
* Exibe horas/slots disponíveis por semana.
* Mostra a origem do cálculo (rotina + energia).
* Recalcula ao alterar rotina.

---

### 2️⃣ 🎯 Áreas da Vida & Objetivos

**US1 — CRUD de áreas da vida**  
Como usuário, quero criar e editar áreas (finanças, saúde, carreira) para organizar meus objetivos.

Critérios de aceite:
* Criar/editar/excluir áreas.
* Listagem de áreas com contagem de objetivos.
* Ao excluir, solicita confirmação.

**US2 — CRUD de objetivos com prioridade e foco**  
Como usuário, quero criar objetivos com horizonte e foco para definir o que é principal agora.

Critérios de aceite:
* Objetivo exige: título, área, horizonte (curto/médio/longo), prioridade e foco.
* Permite pausar/reativar objetivos.
* Lista objetivos por área e status.

**US3 — Múltiplos objetivos por área**  
Como usuário, quero ter vários objetivos na mesma área para refletir minha vida real.

Critérios de aceite:
* Suporta múltiplos objetivos por área.
* Identifica foco principal/ secundário/ em espera.
* Não limita a quantidade de objetivos cadastrados.

---

### 3️⃣ 🧠 Consultor Inteligente (Viabilidade & Conflitos)

**US1 — Avaliação de viabilidade**  
Como usuário, quero saber se meu objetivo é viável para decidir o que fazer agora.

Critérios de aceite:
* Classifica como viável/parcialmente viável/inviável.
* Explica o motivo com base em tempo, energia e recursos.
* Registra o resultado junto ao objetivo.

**US2 — Detecção de conflitos**  
Como usuário, quero ser avisado quando objetivos competem entre si.

Critérios de aceite:
* Detecta conflitos por tempo ou energia.
* Mostra quais objetivos estão em choque.
* Direciona para decisão do usuário.

**US3 — Decisão explícita do usuário**  
Como usuário, quero decidir o que priorizar quando há conflito.

Critérios de aceite:
* Opções: repriorizar, adiar ou reduzir escopo.
* Decisão é registrada no histórico.
* O plano é atualizado após a escolha.

---

### 4️⃣ 🛣️ Estratégias

**US1 — Geração de estratégias alternativas**  
Como usuário, quero ver caminhos alternativos para objetivos difíceis.

Critérios de aceite:
* Gera pelo menos duas estratégias por objetivo.
* Cada estratégia exibe impacto, esforço e risco.
* Estratégias ficam vinculadas ao objetivo.

**US2 — Seleção de estratégia ativa**  
Como usuário, quero escolher a estratégia que vou seguir.

Critérios de aceite:
* Apenas uma estratégia fica ativa por objetivo.
* A seleção é salva e visível no objetivo.
* A estratégia ativa orienta a geração de tarefas.

---

### 5️⃣ 🛠️ Gerador de Tarefas SMART

**US1 — Geração de tarefas SMART**  
Como usuário, quero tarefas pequenas e executáveis a partir da estratégia escolhida.

Critérios de aceite:
* Cada tarefa tem descrição clara, duração e nível de energia.
* Tarefas estão alinhadas à estratégia ativa.
* Classificação por tipo: objetivo, rotina, manutenção.

**US2 — Edição manual de tarefas**  
Como usuário, quero ajustar tarefas para refletir minha realidade.

Critérios de aceite:
* Editar descrição, duração, energia e tipo.
* Excluir tarefas geradas.
* Mudanças são persistidas.

---

### 6️⃣ 📊 Priorização com Matriz de Eisenhower

**US1 — Classificação semanal automática**  
Como usuário, quero que as tarefas sejam classificadas na matriz para organizar minha semana.

Critérios de aceite:
* Classifica tarefas em 4 quadrantes.
* Não remove tarefas da lista.
* Exibe quantidade por quadrante.

**US2 — Ajuste manual de quadrantes**  
Como usuário, quero ajustar a classificação quando fizer sentido.

Critérios de aceite:
* Permite mover tarefa entre quadrantes.
* Mantém histórico de alterações.
* Alterações impactam o planejamento semanal.

---

### 7️⃣ ⚠️ Conflitos & Decisão do Usuário

**US1 — Registro de conflitos**  
Como usuário, quero ter um histórico de conflitos e decisões.

Critérios de aceite:
* Cada conflito registra objetivos, motivo e data.
* Decisões ficam associadas ao conflito.
* Lista consultável por período.

**US2 — Diálogo de resolução**  
Como usuário, quero ser guiado para resolver conflitos sem perder contexto.

Critérios de aceite:
* Mensagem clara explicando o conflito.
* Bloqueia continuidade até decisão.
* Salva a decisão escolhida.

---

### 8️⃣ 🔄 Feedback & Aprendizado

**US1 — Planejamento semanal baseado em rotina**  
Como usuário, quero um plano semanal que respeite meus tipos de dia.

Critérios de aceite:
* Distribui tarefas conforme tipos de dia e energia.
* Exibe plano por dia da semana.
* Permite ajustar manualmente o plano.

**US2 — Check-in semanal**  
Como usuário, quero registrar o que consegui executar para melhorar o plano.

Critérios de aceite:
* Check-in com tarefas concluídas e dificuldades.
* Atualiza taxa de conclusão semanal.
* Solicita feedback qualitativo curto.

**US3 — Ajuste de capacidade e reavaliação**  
Como usuário, quero que o sistema aprenda com minha execução real.

Critérios de aceite:
* Atualiza capacidade estimada com base no check-in.
* Reavalia viabilidade de objetivos afetados.
* Sugere ajustes de estratégia quando necessário.

---

## 🧠✨ Princípios do Produto

* 🧱 **Realismo acima de motivação**
* 🤝 **Usuário decide, consultor orienta**
* 🧭 **Objetivos definem o rumo**
* 🛠️ **Tarefas constroem o caminho**
* ⚡ **Prioridade define a velocidade**
* 🌱 **A vida real é o parâmetro, não o ideal**
