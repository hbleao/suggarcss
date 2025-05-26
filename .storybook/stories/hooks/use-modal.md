# useModal

O hook `useModal` fornece uma maneira simples de gerenciar o estado de abertura e fechamento de modais em sua aplicação.

## Importação

```jsx
import { useModal } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React from 'react';
import { Modal, Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useModal } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ExemploModal() {
  const { isOpen, openModal, closeModal, toggleModal } = useModal();
  
  return (
    <>
      <Button onClick={openModal}>Abrir Modal</Button>
      
      <Modal 
        title="Exemplo de Modal"
        isOpen={isOpen}
        onClose={closeModal}
      >
        <p>Conteúdo do modal aqui.</p>
        <Button onClick={closeModal}>Fechar</Button>
      </Modal>
    </>
  );
}
```

## Retorno

O hook `useModal` retorna um objeto com as seguintes propriedades:

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `isOpen` | `boolean` | Estado atual do modal (aberto ou fechado) |
| `openModal` | `() => void` | Função para abrir o modal |
| `closeModal` | `() => void` | Função para fechar o modal |
| `toggleModal` | `() => void` | Função para alternar o estado do modal |

## Parâmetros

O hook `useModal` aceita um parâmetro opcional:

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `initialState` | `boolean` | `false` | Estado inicial do modal |

```jsx
// Iniciar com o modal aberto
const { isOpen, closeModal } = useModal(true);
```

## Exemplos

### Modal com Confirmação

```jsx
function ModalConfirmacao() {
  const { isOpen, openModal, closeModal } = useModal();
  const [resultado, setResultado] = useState('');
  
  const handleConfirmar = () => {
    setResultado('Ação confirmada!');
    closeModal();
  };
  
  return (
    <>
      <Button onClick={openModal}>Excluir Item</Button>
      {resultado && <p>{resultado}</p>}
      
      <Modal 
        title="Confirmação"
        isOpen={isOpen}
        onClose={closeModal}
      >
        <p>Tem certeza que deseja excluir este item?</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button styles="ghost" onClick={closeModal}>Cancelar</Button>
          <Button variant="negative" onClick={handleConfirmar}>Excluir</Button>
        </div>
      </Modal>
    </>
  );
}
```

### Múltiplos Modais

```jsx
function MultipleModals() {
  const modal1 = useModal();
  const modal2 = useModal();
  
  return (
    <>
      <Button onClick={modal1.openModal}>Abrir Modal 1</Button>
      <Button onClick={modal2.openModal} style={{ marginLeft: '8px' }}>Abrir Modal 2</Button>
      
      <Modal 
        title="Modal 1"
        isOpen={modal1.isOpen}
        onClose={modal1.closeModal}
      >
        <p>Conteúdo do Modal 1</p>
        <Button onClick={() => {
          modal1.closeModal();
          modal2.openModal();
        }}>
          Ir para Modal 2
        </Button>
      </Modal>
      
      <Modal 
        title="Modal 2"
        isOpen={modal2.isOpen}
        onClose={modal2.closeModal}
      >
        <p>Conteúdo do Modal 2</p>
        <Button onClick={modal2.closeModal}>Fechar</Button>
      </Modal>
    </>
  );
}
```

## Integração com Outros Hooks

O hook `useModal` pode ser facilmente combinado com outros hooks para criar funcionalidades mais complexas:

```jsx
function ModalComFormulario() {
  const { isOpen, openModal, closeModal } = useModal();
  const { formState, handleChange, resetForm } = useForm({
    nome: '',
    email: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formState);
    resetForm();
    closeModal();
  };
  
  const handleCancel = () => {
    resetForm();
    closeModal();
  };
  
  return (
    <>
      <Button onClick={openModal}>Abrir Formulário</Button>
      
      <Modal 
        title="Formulário"
        isOpen={isOpen}
        onClose={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              value={formState.nome}
              onChange={handleChange}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button type="button" styles="ghost" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
```

## Boas Práticas

- Use o hook `useModal` para gerenciar o estado de modais em vez de criar estados manualmente
- Combine com outros hooks para criar fluxos de interface mais complexos
- Utilize o parâmetro `initialState` apenas quando necessário iniciar com o modal aberto
- Sempre forneça uma maneira clara para o usuário fechar o modal (botão de fechar, clique no overlay, tecla ESC)
