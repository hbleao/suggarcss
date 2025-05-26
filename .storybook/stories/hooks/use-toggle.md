# useToggle

O hook `useToggle` fornece uma maneira simples de alternar entre estados booleanos, útil para controlar elementos de interface como menus, acordeões, tabs e outros componentes que possuem estados de aberto/fechado ou ativo/inativo.

## Importação

```jsx
import { useToggle } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useToggle } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ExemploToggle() {
  const [ativo, toggle] = useToggle(false);
  
  return (
    <div>
      <Button onClick={toggle}>
        {ativo ? 'Desativar' : 'Ativar'}
      </Button>
      
      {ativo && <p>Conteúdo visível quando ativo</p>}
    </div>
  );
}
```

## Retorno

O hook `useToggle` retorna um array com dois elementos:

| Índice | Tipo | Descrição |
|--------|------|-----------|
| `[0]` | `boolean` | Estado atual (true ou false) |
| `[1]` | `(nextValue?: boolean) => void` | Função para alternar o estado. Opcionalmente aceita um valor específico |

## Parâmetros

O hook `useToggle` aceita um parâmetro opcional:

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `initialValue` | `boolean` | `false` | Valor inicial do estado |

```jsx
// Iniciar com o estado ativo
const [ativo, toggle] = useToggle(true);
```

## Exemplos

### Acordeão Simples

```jsx
function Acordeao() {
  const [aberto, toggleAberto] = useToggle(false);
  
  return (
    <div className="acordeao">
      <div 
        className="acordeao-cabecalho" 
        onClick={toggleAberto}
        style={{ cursor: 'pointer' }}
      >
        <h3>Título do Acordeão</h3>
        <span>{aberto ? '▲' : '▼'}</span>
      </div>
      
      {aberto && (
        <div className="acordeao-conteudo">
          <p>Este é o conteúdo do acordeão que é exibido quando o acordeão está aberto.</p>
        </div>
      )}
    </div>
  );
}
```

### Menu Hambúrguer

```jsx
function MenuHamburguer() {
  const [menuAberto, toggleMenu] = useToggle(false);
  
  return (
    <div>
      <button 
        className="botao-hamburguer"
        onClick={toggleMenu}
        aria-expanded={menuAberto}
        aria-label="Menu principal"
      >
        <span className={`hamburguer ${menuAberto ? 'aberto' : ''}`}></span>
      </button>
      
      <nav className={`menu ${menuAberto ? 'visivel' : 'oculto'}`}>
        <ul>
          <li><a href="#inicio">Início</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
      
      {menuAberto && (
        <div className="overlay" onClick={toggleMenu}></div>
      )}
    </div>
  );
}
```

### Múltiplos Toggles Independentes

```jsx
function ListaDeItens() {
  const itens = [
    { id: 1, titulo: 'Item 1', descricao: 'Descrição do item 1' },
    { id: 2, titulo: 'Item 2', descricao: 'Descrição do item 2' },
    { id: 3, titulo: 'Item 3', descricao: 'Descrição do item 3' },
  ];
  
  // Criando um objeto para armazenar os estados de cada item
  const toggles = {
    item1: useToggle(false),
    item2: useToggle(false),
    item3: useToggle(false),
  };
  
  return (
    <ul className="lista-itens">
      {itens.map((item) => {
        const [expandido, toggleExpandido] = toggles[`item${item.id}`];
        
        return (
          <li key={item.id} className="item">
            <div 
              className="item-cabecalho" 
              onClick={toggleExpandido}
              style={{ cursor: 'pointer' }}
            >
              <h3>{item.titulo}</h3>
              <span>{expandido ? '▲' : '▼'}</span>
            </div>
            
            {expandido && (
              <div className="item-descricao">
                <p>{item.descricao}</p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
```

### Definindo um Valor Específico

O hook `useToggle` também permite definir um valor específico em vez de apenas alternar:

```jsx
function ExemploValorEspecifico() {
  const [ativo, setAtivo] = useToggle(false);
  
  return (
    <div>
      <div className="botoes">
        <Button onClick={() => setAtivo(true)}>Ativar</Button>
        <Button onClick={() => setAtivo(false)}>Desativar</Button>
        <Button onClick={setAtivo}>Alternar</Button>
      </div>
      
      <p>Estado atual: {ativo ? 'Ativo' : 'Inativo'}</p>
    </div>
  );
}
```

## Integração com Outros Hooks

O hook `useToggle` pode ser facilmente combinado com outros hooks:

```jsx
function ExemploCombinadoComLocalStorage() {
  // Combina useToggle com useLocalStorage para persistir o estado
  const [valor, setValor] = useLocalStorage('tema-escuro', false);
  const [temaEscuro, toggleTema] = useToggle(valor);
  
  // Sincroniza os dois hooks
  useEffect(() => {
    setValor(temaEscuro);
  }, [temaEscuro, setValor]);
  
  return (
    <div className={`app ${temaEscuro ? 'tema-escuro' : 'tema-claro'}`}>
      <Button onClick={toggleTema}>
        Alternar para tema {temaEscuro ? 'claro' : 'escuro'}
      </Button>
      
      <p>Tema atual: {temaEscuro ? 'Escuro' : 'Claro'}</p>
    </div>
  );
}
```

## Boas Práticas

- Use o hook `useToggle` para simplificar a lógica de alternância de estados booleanos
- Combine com outros hooks para criar funcionalidades mais complexas
- Utilize o parâmetro `initialValue` para definir o estado inicial quando necessário
- Aproveite a capacidade de definir um valor específico quando precisar forçar um estado específico
- Considere a acessibilidade ao implementar elementos de interface que usam o `useToggle`, como adicionar atributos `aria-expanded`, `aria-hidden`, etc.
