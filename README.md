# SugarCSS

Uma biblioteca de componentes React com SASS inspirada no shadcn/ui, mas utilizando SASS em vez de Tailwind CSS.

## Sobre

SugarCSS é uma biblioteca de componentes React que segue a filosofia do shadcn/ui: não é uma biblioteca tradicional que você instala via npm, mas sim um conjunto de componentes que você copia para seu projeto, permitindo total controle sobre o código.

A diferença principal é que o SugarCSS utiliza SASS para estilização em vez de Tailwind CSS, oferecendo uma alternativa para quem prefere trabalhar com SASS.

## Instalação

```bash
# Instalar a CLI globalmente
npm install -g sugarcss-react

# Ou usar diretamente com npx
npx sugarcss-react install <componente>
```

## Uso

Após instalar a CLI, você pode instalar componentes individuais em seu projeto:

```bash
# Instalar o componente Button
sugarcss install button

# Instalar o componente Input
sugarcss install input
```

Isso copiará os arquivos do componente para a pasta `src/components/ui/` do seu projeto.

## Componentes disponíveis

- ✅ Button - Um botão estilizado com SASS
- ✅ Input - Um campo de entrada com suporte para label e mensagens de erro
- 🔄 Modal (em breve)
- 🔄 Dropdown (em breve)
- 🔄 Textarea (em breve)
- 🔄 Typography (em breve)
- 🔄 Accordion (em breve)
- 🔄 Tabs (em breve)
- 🔄 Link (em breve)

## Uso dos componentes

### Button

```tsx
import { Button } from './components/ui/button';

export default function App() {
  return (
    <Button onClick={() => alert('Clicado!')}>
      Clique em mim
    </Button>
  );
}
```

### Input

```tsx
import { Input } from './components/ui/input';

export default function App() {
  return (
    <div>
      <Input 
        label="Nome"
        placeholder="Digite seu nome"
      />
      
      <Input 
        label="Email"
        type="email"
        placeholder="Digite seu email"
        error="Email inválido"
      />
    </div>
  );
}
```

## Desenvolvimento

Para contribuir com o desenvolvimento:

```bash
# Clonar o repositório
git clone <repo-url>
cd sugarcss

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Construir a biblioteca
npm run build
```

## Licença

MIT
