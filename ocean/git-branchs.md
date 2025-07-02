# 📄 RFC #0003: Estratégia de Branching para **@sugarcss/react**

- **Status:** `Proposed`
- **Autor:** @henriqueleao
- **Criado em:** 04 / 06 / 2025
- **Revisores:** @core-team-sugarcss
- **Versão do documento:** 1.0

---

## 🧠 Contexto

@sugarcss/react é uma biblioteca de componentes em **Sass + React** que:

1. **Entrega incremental:** novos componentes e correções precisam chegar rápido aos consumidores.
2. **Equipe enxuta:** 2–4 mantenedores + contribuidores externos ocasionais.
3. **Suporte a versões múltiplas:** cada _major_ deve receber _patches_ críticos até seis meses após o próximo _major_.

Precisamos definir uma convenção de branches que:

- Diminua conflitos de merge.
- Integre bem com nosso fluxo de **Release PRs**, **Storybook Preview** e **Semantic Release**.
- Seja fácil de entender para colaboradores externos.

---

## 🎯 Objetivo

Selecionar e documentar **uma estratégia oficial de branching** que cubra:

- Desenvolvimento diário
- Releases estáveis
- Hotfixes urgentes
- Back-ports para versões antigas
- Automatização de _changelog_ e _version bump_ no CI

---

## 🔍 Estratégias Consideradas

| Estratégia | Descrição resumida | Prós | Contras |
|------------|-------------------|------|---------|
| **Git Flow** | `main`, `develop`, `feature/`, `release/`, `hotfix/` | Processo claro; bom p/ equipes grandes; separa release | Pesado p/ time enxuto; muitos merges; CI mais lento |
| **GitHub Flow** | `main` + _feature branches_ + deploy contínuo | Simples; perfeito p/ lib open-source | Precisa _feature flags_; difícil dar suporte a várias versões estáveis |
| **Trunk-Based** | Apenas `main`, _short-lived branches_ | Feedback rápido; menos dívidas de merge | Requer testes e lint bloqueando o merge; back-port manual |
| **Release Train** | `main` + `release/x.y` criadas em datas fixas | Previsível p/ consumidores; bom p/ libs | Demanda disciplina com calendário; pouca flexibilidade |

---

## ✨ Proposta

Adotar um **modelo híbrido “GitHub Flow + Release Branches”**:


### Regras principais

| Regra | Detalhe |
|-------|---------|
| **Commits** | Somente via PR squash-merge, no padrão Conventional Commits (`feat:`, `fix:`, `docs:` …). |
| **Versionamento** | **Semantic-release** roda no CI após merge em `main`;<br>`feat:` → _minor_, `fix:` → _patch_, `BREAKING CHANGE` → _major_. |
| **Release branch** | Criada com `npm run release-branch x.y` logo após _major/minor_ publicado. Mantém patches críticos por 6 meses. |
| **Hotfix** | Abre a partir da branch onde o bug existe. Merge em `main` **e** na branch de release relevante (cherry-pick ou PR duplo). |
| **Proteções** | `main` e `release/*` protegidas: require ✓ testes, lint, coverage ≥ 90 %, 1 revisor. |

---

## 🔥 Impacto

- **Positivo:** fluxo leve para dia-a-dia; usuários recebem releases automáticos; colaboração externa continua simples.
- **Custo:** precisamos automatizar cherry-pick para hotfixes (script ou bot).
- **Risco:** se a cobertura de testes cair, trunk fica instável. Mitigação: CI obrigatório + BiomeJS/lint estritos.

---

## ✅ Critérios de Aceitação

- [ ] Documentação no `CONTRIBUTING.md` atualizada com diagrama de branches.
- [ ] Hooks do **commitlint** configurados (`@commitlint/config-conventional`).
- [ ] Pipeline CI com semantic-release + proteções de branch ativas.
- [ ] Script `npm run release-branch <x.y>` cria branch, ajusta `package.json` e abre PR.

---

## 🧪 Plano de Adoção

1. **Semana 1**
   - Aprovar RFC; ligar proteções em `main`.
2. **Semana 2**
   - Migrar PRs abertos para `feat/*`; configurar semantic-release.
3. **Semana 3**
   - Publicar primeiro release automatizado (`v2.0.0`).
   - Criar `release/1.x` para manutenção da versão antiga.
4. **Semana 4 →**
   - Monitorar métricas (tempo de merge, falhas de CI).
   - Ajustar scripts de hotfix conforme feedback.

---

## 📈 Métricas de Sucesso

- ⬇️ **Tempo médio de merge** < 24 h
- ⬆️ **Cobertura de testes** ≥ 90 %
- ⬇️ **Incidentes em produção** (bugs críticos) ≤ 1 por trimestre
- ⬆️ **Contribuidores externos ativos** +20 % em 6 meses

---

*Com essa estratégia, mantemos a simplicidade do GitHub Flow, mas garantimos estabilidade para usuários que dependem de versões antigas — exatamente o equilíbrio que a comunidade espera do **@sugarcss/react**.*
