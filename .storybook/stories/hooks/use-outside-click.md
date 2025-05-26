# useOutsideClick

O hook `useOutsideClick` permite detectar cliques fora de um elemento específico, sendo muito útil para componentes como dropdowns, modais e menus que precisam fechar quando o usuário clica fora deles.

## Importação

```jsx
import { useOutsideClick } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React, { useState } from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useOutsideClick } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function DropdownExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  const ref = useOutsideClick(() => {
    if (isOpen) setIsOpen(false);
  });
  
  return (
    <div ref={ref} className="dropdown-container">
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Fechar Menu' : 'Abrir Menu'}
      </Button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>Opção 1</li>
            <li>Opção 2</li>
            <li>Opção 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}
```

## Parâmetros

O hook `useOutsideClick` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `callback` | `() => void` | Sim | Função a ser executada quando ocorrer um clique fora do elemento |
| `options` | `object` | Não | Opções adicionais para configurar o comportamento do hook |

### Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `events` | `string[]` | `['mousedown', 'touchstart']` | Lista de eventos para monitorar |
| `enabled` | `boolean` | `true` | Se o hook está ativo |

## Retorno

O hook `useOutsideClick` retorna uma referência (ref) que deve ser anexada ao elemento que você deseja monitorar:

```jsx
const ref = useOutsideClick(callback, options);
```

## Exemplos

### Menu de Contexto

```jsx
import React, { useState } from 'react';
import { useOutsideClick } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ContextMenu() {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  };
  
  const menuRef = useOutsideClick(() => {
    if (isVisible) setIsVisible(false);
  });
  
  return (
    <div 
      className="context-menu-area" 
      onContextMenu={handleContextMenu}
      style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}
    >
      <p>Clique com o botão direito nesta área para abrir o menu de contexto</p>
      
      {isVisible && (
        <div 
          ref={menuRef}
          className="context-menu"
          style={{
            position: 'fixed',
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
            background: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            padding: '8px 0'
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ padding: '8px 16px', cursor: 'pointer' }}>Copiar</li>
            <li style={{ padding: '8px 16px', cursor: 'pointer' }}>Colar</li>
            <li style={{ padding: '8px 16px', cursor: 'pointer' }}>Recortar</li>
            <li style={{ padding: '8px 16px', cursor: 'pointer' }}>Excluir</li>
          </ul>
        </div>
      )}
    </div>
  );
}
```

### Modal Personalizado

```jsx
import React, { useState } from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useOutsideClick } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function CustomModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  const modalRef = useOutsideClick(() => {
    if (isOpen) setIsOpen(false);
  });
  
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
      
      {isOpen && (
        <div className="modal-overlay" style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div 
            ref={modalRef}
            className="modal-content"
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '100%'
            }}
          >
            <h2>Modal Personalizado</h2>
            <p>Este modal fechará quando você clicar fora dele.</p>
            <p>Note que o clique no overlay não fecha o modal diretamente, mas sim o hook useOutsideClick que detecta o clique fora do conteúdo do modal.</p>
            <Button onClick={() => setIsOpen(false)}>Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Desativando o Hook Condicionalmente

```jsx
import React, { useState } from 'react';
import { Button, Checkbox } from '@porto/js-library-corp-hubv-porto-ocean';
import { useOutsideClick } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ConditionalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [allowOutsideClick, setAllowOutsideClick] = useState(true);
  
  const dropdownRef = useOutsideClick(() => {
    if (isOpen) setIsOpen(false);
  }, { enabled: allowOutsideClick });
  
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Checkbox
          label="Permitir fechar ao clicar fora"
          checked={allowOutsideClick}
          onChange={(e) => setAllowOutsideClick(e.target.checked)}
        />
      </div>
      
      <div ref={dropdownRef} className="dropdown-container">
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Fechar Menu' : 'Abrir Menu'}
        </Button>
        
        {isOpen && (
          <div className="dropdown-menu" style={{
            border: '1px solid #ccc',
            padding: '16px',
            marginTop: '8px',
            background: 'white'
          }}>
            <p>Menu de exemplo</p>
            <p>{allowOutsideClick 
              ? 'Clique fora para fechar este menu' 
              : 'Clique fora está desativado, use o botão para fechar'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Considerações de Acessibilidade

- Ao implementar menus e dropdowns com `useOutsideClick`, lembre-se de também suportar fechamento via teclado (tecla ESC)
- Para modais, certifique-se de gerenciar o foco corretamente, mantendo-o dentro do modal quando aberto
- Adicione atributos ARIA apropriados para melhorar a acessibilidade

## Boas Práticas

- Use `useOutsideClick` para simplificar a lógica de fechamento de elementos interativos
- Combine com outros hooks como `useToggle` ou `useModal` para criar componentes interativos completos
- Considere a opção `enabled` para controlar quando o hook deve estar ativo
- Lembre-se que o hook monitora eventos de mouse e touch, tornando-o compatível com dispositivos móveis
