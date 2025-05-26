# useForm

O hook `useForm` simplifica o gerenciamento de estados de formulários em React, fornecendo uma maneira elegante de lidar com valores de campos, validação, envio e reinicialização de formulários.

## Importação

```jsx
import { useForm } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useForm } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function FormularioSimples() {
  const { 
    formState, 
    handleChange, 
    handleSubmit, 
    errors, 
    resetForm 
  } = useForm({
    nome: '',
    email: '',
    mensagem: ''
  });
  
  const onSubmit = (data) => {
    console.log('Dados enviados:', data);
    // Aqui você pode enviar os dados para uma API
    resetForm(); // Limpa o formulário após o envio
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="campo">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          value={formState.nome}
          onChange={handleChange}
        />
      </div>
      
      <div className="campo">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>
      
      <div className="campo">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formState.mensagem}
          onChange={handleChange}
        />
      </div>
      
      <Button type="submit">Enviar</Button>
    </form>
  );
}
```

## Retorno

O hook `useForm` retorna um objeto com as seguintes propriedades:

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `formState` | `object` | Estado atual do formulário com todos os valores dos campos |
| `handleChange` | `(e: ChangeEvent) => void` | Função para atualizar o estado do formulário com base em eventos de mudança |
| `setFieldValue` | `(name: string, value: any) => void` | Função para atualizar um campo específico diretamente |
| `handleSubmit` | `(onSubmit: Function) => (e: FormEvent) => void` | Função que recebe a função de envio e retorna um manipulador de eventos de envio |
| `errors` | `object` | Objeto contendo erros de validação, se houver |
| `resetForm` | `() => void` | Função para reiniciar o formulário para os valores iniciais |
| `setErrors` | `(errors: object) => void` | Função para definir erros manualmente |
| `clearErrors` | `() => void` | Função para limpar todos os erros |
| `isValid` | `boolean` | Indica se o formulário é válido (sem erros) |
| `isDirty` | `boolean` | Indica se o formulário foi modificado em relação aos valores iniciais |

## Parâmetros

O hook `useForm` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `initialValues` | `object` | Sim | Valores iniciais do formulário |
| `validationSchema` | `object` | Não | Esquema de validação (opcional) |
| `options` | `object` | Não | Opções adicionais para configurar o comportamento do formulário |

### Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `validateOnChange` | `boolean` | `true` | Se deve validar os campos ao mudar |
| `validateOnBlur` | `boolean` | `true` | Se deve validar os campos ao perder o foco |
| `validateOnSubmit` | `boolean` | `true` | Se deve validar todos os campos no envio |

## Exemplos

### Formulário com Validação

```jsx
import React from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useForm } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function FormularioComValidacao() {
  // Definindo o esquema de validação
  const validationSchema = {
    nome: {
      required: 'Nome é obrigatório',
      minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' }
    },
    email: {
      required: 'Email é obrigatório',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Email inválido'
      }
    },
    senha: {
      required: 'Senha é obrigatória',
      minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' }
    },
    confirmarSenha: {
      required: 'Confirmação de senha é obrigatória',
      validate: (value, formValues) => 
        value === formValues.senha || 'As senhas não coincidem'
    }
  };
  
  const { 
    formState, 
    handleChange, 
    handleSubmit, 
    errors, 
    resetForm 
  } = useForm(
    {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: ''
    },
    validationSchema
  );
  
  const onSubmit = (data) => {
    console.log('Dados validados:', data);
    // Processamento do formulário...
    resetForm();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="campo">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          value={formState.nome}
          onChange={handleChange}
          className={errors.nome ? 'erro' : ''}
        />
        {errors.nome && <span className="mensagem-erro">{errors.nome}</span>}
      </div>
      
      <div className="campo">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          className={errors.email ? 'erro' : ''}
        />
        {errors.email && <span className="mensagem-erro">{errors.email}</span>}
      </div>
      
      <div className="campo">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          value={formState.senha}
          onChange={handleChange}
          className={errors.senha ? 'erro' : ''}
        />
        {errors.senha && <span className="mensagem-erro">{errors.senha}</span>}
      </div>
      
      <div className="campo">
        <label htmlFor="confirmarSenha">Confirmar Senha</label>
        <input
          id="confirmarSenha"
          name="confirmarSenha"
          type="password"
          value={formState.confirmarSenha}
          onChange={handleChange}
          className={errors.confirmarSenha ? 'erro' : ''}
        />
        {errors.confirmarSenha && (
          <span className="mensagem-erro">{errors.confirmarSenha}</span>
        )}
      </div>
      
      <div className="acoes">
        <Button type="button" styles="ghost" onClick={resetForm}>
          Limpar
        </Button>
        <Button type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
```

### Formulário com Campos Dinâmicos

```jsx
import React from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useForm } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function FormularioDinamico() {
  const { 
    formState, 
    handleChange, 
    setFieldValue, 
    handleSubmit 
  } = useForm({
    titulo: '',
    descricao: '',
    itens: []
  });
  
  const adicionarItem = () => {
    setFieldValue('itens', [
      ...formState.itens,
      { id: Date.now(), nome: '', quantidade: 1 }
    ]);
  };
  
  const removerItem = (id) => {
    setFieldValue(
      'itens',
      formState.itens.filter(item => item.id !== id)
    );
  };
  
  const atualizarItem = (id, campo, valor) => {
    setFieldValue(
      'itens',
      formState.itens.map(item => 
        item.id === id ? { ...item, [campo]: valor } : item
      )
    );
  };
  
  const onSubmit = (data) => {
    console.log('Formulário enviado:', data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="campo">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          name="titulo"
          value={formState.titulo}
          onChange={handleChange}
        />
      </div>
      
      <div className="campo">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formState.descricao}
          onChange={handleChange}
        />
      </div>
      
      <div className="secao-itens">
        <div className="cabecalho-secao">
          <h3>Itens</h3>
          <Button type="button" onClick={adicionarItem}>
            Adicionar Item
          </Button>
        </div>
        
        {formState.itens.map((item, index) => (
          <div key={item.id} className="item">
            <div className="campo">
              <label htmlFor={`item-nome-${item.id}`}>Nome do Item</label>
              <input
                id={`item-nome-${item.id}`}
                value={item.nome}
                onChange={(e) => atualizarItem(item.id, 'nome', e.target.value)}
              />
            </div>
            
            <div className="campo">
              <label htmlFor={`item-quantidade-${item.id}`}>Quantidade</label>
              <input
                id={`item-quantidade-${item.id}`}
                type="number"
                min="1"
                value={item.quantidade}
                onChange={(e) => atualizarItem(item.id, 'quantidade', parseInt(e.target.value))}
              />
            </div>
            
            <Button 
              type="button" 
              variant="negative" 
              onClick={() => removerItem(item.id)}
            >
              Remover
            </Button>
          </div>
        ))}
      </div>
      
      <Button type="submit">Enviar</Button>
    </form>
  );
}
```

### Integração com Componentes do Ocean

```jsx
import React from 'react';
import { Button, Checkbox, Modal } from '@porto/js-library-corp-hubv-porto-ocean';
import { useForm, useModal } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function FormularioIntegrado() {
  const { isOpen, openModal, closeModal } = useModal();
  
  const { 
    formState, 
    handleChange, 
    setFieldValue, 
    handleSubmit, 
    errors, 
    resetForm 
  } = useForm({
    nome: '',
    email: '',
    telefone: '',
    aceitaTermos: false
  });
  
  const onSubmit = (data) => {
    console.log('Dados enviados:', data);
    openModal(); // Abre o modal de sucesso
  };
  
  const fecharELimpar = () => {
    closeModal();
    resetForm();
  };
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            value={formState.nome}
            onChange={handleChange}
            className={errors.nome ? 'erro' : ''}
          />
          {errors.nome && <span className="mensagem-erro">{errors.nome}</span>}
        </div>
        
        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            className={errors.email ? 'erro' : ''}
          />
          {errors.email && <span className="mensagem-erro">{errors.email}</span>}
        </div>
        
        <div className="campo">
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            value={formState.telefone}
            onChange={handleChange}
            className={errors.telefone ? 'erro' : ''}
          />
          {errors.telefone && <span className="mensagem-erro">{errors.telefone}</span>}
        </div>
        
        <div className="campo-checkbox">
          <Checkbox
            label="Aceito os termos e condições"
            checked={formState.aceitaTermos}
            onChange={(e) => setFieldValue('aceitaTermos', e.target.checked)}
            error={!!errors.aceitaTermos}
            errorMessage={errors.aceitaTermos}
          />
        </div>
        
        <Button type="submit">Enviar</Button>
      </form>
      
      <Modal
        title="Sucesso!"
        subtitle="Seu formulário foi enviado com sucesso."
        isOpen={isOpen}
        onClose={fecharELimpar}
      >
        <p>Obrigado por enviar seus dados. Entraremos em contato em breve.</p>
        <Button onClick={fecharELimpar}>Fechar</Button>
      </Modal>
    </>
  );
}
```

## Boas Práticas

- Use o hook `useForm` para simplificar o gerenciamento de estados de formulários
- Aproveite o esquema de validação para implementar validações consistentes
- Utilize `setFieldValue` para atualizar campos específicos ou campos dinâmicos
- Combine com outros hooks como `useModal` para criar fluxos de interface completos
- Implemente feedback visual para erros de validação
- Use o parâmetro `resetForm` após o envio bem-sucedido para limpar o formulário
- Considere a acessibilidade ao implementar formulários, como associar labels com inputs e fornecer mensagens de erro claras
