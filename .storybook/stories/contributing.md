# Guia de Contribuição

Obrigado por considerar contribuir com o SugarCSS! Este documento fornece diretrizes para contribuir com o projeto, desde a configuração do ambiente de desenvolvimento até o processo de envio de pull requests.

## Código de Conduta

Ao participar deste projeto, você concorda em seguir nosso Código de Conduta, que promove um ambiente respeitoso e inclusivo para todos os contribuidores.

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (versão 7 ou superior) ou yarn (versão 1.22 ou superior)
- Git

### Passos para Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/hbleao/sugarcss.git
   cd sugarcss
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Execute o ambiente de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Para visualizar a documentação e os componentes no Storybook:
   ```bash
   npm run storybook
   # ou
   yarn storybook
   ```

## Estrutura do Projeto

```
sugarcss/
├── .storybook/          # Configuração do Storybook
│   └── stories/         # Documentação e stories dos componentes
├── docs/                # Documentação centralizada
├── src/
│   ├── components/      # Componentes da biblioteca
│   ├── styles/          # Estilos globais e tokens
│   └── utils/           # Utilitários e helpers
├── tests/               # Testes e configurações de teste
└── package.json         # Dependências e scripts
```

## Fluxo de Trabalho para Contribuições

### 1. Crie uma Issue

Antes de começar a trabalhar em uma contribuição, verifique se já existe uma issue relacionada. Se não, crie uma nova issue descrevendo:

- O que você pretende fazer
- Por que isso é necessário
- Como você planeja implementar

### 2. Crie um Branch

Crie um branch a partir do `main` com um nome descritivo:

```bash
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

### 3. Desenvolvimento

Ao desenvolver, siga estas diretrizes:

- Siga os padrões de código existentes
- Escreva testes para novas funcionalidades
- Mantenha a documentação atualizada
- Faça commits pequenos e descritivos

### 4. Testes

Certifique-se de que todos os testes passam:

```bash
npm run test
# ou
yarn test
```

E verifique a cobertura de código:

```bash
npm run test:coverage
# ou
yarn test:coverage
```

### 5. Linting e Formatação

Verifique se seu código segue os padrões de linting:

```bash
npm run lint
# ou
yarn lint
```

E formate o código:

```bash
npm run format
# ou
yarn format
```

### 6. Envie um Pull Request

Quando sua contribuição estiver pronta:

1. Atualize seu branch com as últimas alterações do `main`:
   ```bash
   git checkout main
   git pull
   git checkout seu-branch
   git merge main
   ```

2. Resolva quaisquer conflitos

3. Envie seu branch para o repositório:
   ```bash
   git push origin seu-branch
   ```

4. Crie um Pull Request no GitHub com:
   - Um título claro e descritivo
   - Uma descrição detalhada das alterações
   - Referência à issue relacionada (use "Fixes #123" ou "Relates to #123")

## Diretrizes para Contribuição

### Componentes

Ao criar ou modificar componentes:

1. **Estrutura**: Siga a estrutura padrão de componentes:
   ```
   ComponentName/
   ├── index.tsx         # Exportação principal
   ├── ComponentName.tsx # Implementação
   ├── types.ts          # Tipos e interfaces
   ├── styles.scss       # Estilos (se necessário)
   └── __tests__/        # Testes
       └── ComponentName.test.tsx
   ```

2. **Props**: Defina tipos claros para todas as props e use valores padrão quando apropriado.

3. **Acessibilidade**: Garanta que o componente seja acessível, seguindo as diretrizes WCAG.

4. **Testes**: Escreva testes abrangentes para o componente.

5. **Documentação**: Crie ou atualize a documentação do componente, incluindo:
   - Descrição
   - Props
   - Exemplos de uso
   - Considerações de acessibilidade

### Documentação

Ao contribuir com documentação:

1. Use Markdown para formatação.
2. Inclua exemplos de código quando relevante.
3. Mantenha a documentação concisa e direta.
4. Verifique a ortografia e gramática.

### Commits

Siga o padrão de commits convencionais:

```
tipo(escopo): descrição curta

Descrição mais longa, se necessário

Rodapé com referências a issues, breaking changes, etc.
```

Onde `tipo` pode ser:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Alterações que não afetam o código (formatação, etc.)
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Alterações no processo de build, ferramentas, etc.

## Revisão de Código

Seu Pull Request será revisado por pelo menos um mantenedor do projeto. Durante a revisão:

- Esteja aberto a feedback e sugestões
- Responda a comentários de forma clara e respeitosa
- Faça as alterações solicitadas ou explique por que elas não são necessárias

## Versionamento

O SugarCSS segue o Versionamento Semântico (SemVer):

- **Patch (1.0.x)**: Correções de bugs e pequenas melhorias
- **Minor (1.x.0)**: Novas funcionalidades compatíveis com versões anteriores
- **Major (x.0.0)**: Mudanças que quebram compatibilidade

## Recursos Adicionais

- [Documentação do SugarCSS](./README.md)
- [Padrões Técnicos](./technical-patterns.md)
- [Guia de Acessibilidade](./foundations/accessibility.md)

## Agradecimentos

Agradecemos a todos os contribuidores que ajudam a melhorar o SugarCSS! Seu tempo e esforço são muito apreciados.
