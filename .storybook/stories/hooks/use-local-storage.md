# useLocalStorage

O hook `useLocalStorage` permite persistir e sincronizar o estado do React com o localStorage do navegador, facilitando o armazenamento de dados entre sessões de navegação.

## Importação

```jsx
import { useLocalStorage } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useLocalStorage } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ExemploLocalStorage() {
  const [nome, setNome] = useLocalStorage('nome-usuario', '');
  
  return (
    <div>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome"
      />
      
      <p>
        {nome ? `Olá, ${nome}!` : 'Por favor, digite seu nome.'}
      </p>
      
      <Button onClick={() => setNome('')}>
        Limpar
      </Button>
    </div>
  );
}
```

## Retorno

O hook `useLocalStorage` retorna um array com dois elementos, similar ao hook `useState`:

| Índice | Tipo | Descrição |
|--------|------|-----------|
| `[0]` | `any` | Valor atual armazenado |
| `[1]` | `(value: any) => void` | Função para atualizar o valor armazenado |

## Parâmetros

O hook `useLocalStorage` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `key` | `string` | Sim | Chave usada para armazenar o valor no localStorage |
| `initialValue` | `any` | Sim | Valor inicial caso não exista um valor armazenado |
| `options` | `object` | Não | Opções adicionais para configurar o comportamento do hook |

### Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `serialize` | `(value: any) => string` | `JSON.stringify` | Função para serializar o valor antes de armazenar |
| `deserialize` | `(value: string) => any` | `JSON.parse` | Função para deserializar o valor após recuperá-lo |

## Exemplos

### Tema Escuro/Claro

```jsx
import React from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useLocalStorage } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function TemaApp() {
  const [temaEscuro, setTemaEscuro] = useLocalStorage('tema-escuro', false);
  
  // Aplica a classe do tema ao elemento body
  React.useEffect(() => {
    document.body.classList.toggle('tema-escuro', temaEscuro);
    document.body.classList.toggle('tema-claro', !temaEscuro);
  }, [temaEscuro]);
  
  return (
    <div className="controle-tema">
      <Button onClick={() => setTemaEscuro(!temaEscuro)}>
        Alternar para tema {temaEscuro ? 'claro' : 'escuro'}
      </Button>
      
      <p>Tema atual: {temaEscuro ? 'Escuro' : 'Claro'}</p>
    </div>
  );
}
```

### Carrinho de Compras

```jsx
import React from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useLocalStorage } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function CarrinhoDeCompras() {
  const [itensCarrinho, setItensCarrinho] = useLocalStorage('carrinho', []);
  
  const adicionarItem = (produto) => {
    // Verifica se o produto já está no carrinho
    const itemExistente = itensCarrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
      // Atualiza a quantidade se o produto já existir
      setItensCarrinho(
        itensCarrinho.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      // Adiciona novo produto ao carrinho
      setItensCarrinho([...itensCarrinho, { ...produto, quantidade: 1 }]);
    }
  };
  
  const removerItem = (produtoId) => {
    setItensCarrinho(itensCarrinho.filter(item => item.id !== produtoId));
  };
  
  const atualizarQuantidade = (produtoId, quantidade) => {
    if (quantidade <= 0) {
      removerItem(produtoId);
      return;
    }
    
    setItensCarrinho(
      itensCarrinho.map(item =>
        item.id === produtoId ? { ...item, quantidade } : item
      )
    );
  };
  
  const limparCarrinho = () => {
    setItensCarrinho([]);
  };
  
  // Produtos de exemplo
  const produtos = [
    { id: 1, nome: 'Camiseta', preco: 49.90 },
    { id: 2, nome: 'Calça', preco: 99.90 },
    { id: 3, nome: 'Tênis', preco: 199.90 },
  ];
  
  // Calcula o total do carrinho
  const total = itensCarrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );
  
  return (
    <div className="loja">
      <div className="produtos">
        <h2>Produtos Disponíveis</h2>
        <ul>
          {produtos.map(produto => (
            <li key={produto.id}>
              <span>{produto.nome} - R$ {produto.preco.toFixed(2)}</span>
              <Button onClick={() => adicionarItem(produto)}>
                Adicionar ao Carrinho
              </Button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="carrinho">
        <h2>Carrinho de Compras</h2>
        {itensCarrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul>
              {itensCarrinho.map(item => (
                <li key={item.id}>
                  <span>{item.nome} - R$ {item.preco.toFixed(2)}</span>
                  <div className="controle-quantidade">
                    <button
                      onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                    >
                      +
                    </button>
                  </div>
                  <Button variant="negative" onClick={() => removerItem(item.id)}>
                    Remover
                  </Button>
                </li>
              ))}
            </ul>
            <div className="resumo">
              <p><strong>Total: R$ {total.toFixed(2)}</strong></p>
              <Button onClick={limparCarrinho}>Limpar Carrinho</Button>
              <Button variant="primary">Finalizar Compra</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

### Formulário com Persistência

```jsx
import React from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useLocalStorage, useForm } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function FormularioComPersistencia() {
  // Recupera dados do formulário do localStorage
  const [dadosSalvos, setDadosSalvos] = useLocalStorage('formulario-rascunho', {
    nome: '',
    email: '',
    mensagem: ''
  });
  
  const { 
    formState, 
    handleChange, 
    handleSubmit, 
    resetForm 
  } = useForm(dadosSalvos);
  
  // Atualiza o localStorage quando o formulário muda
  React.useEffect(() => {
    setDadosSalvos(formState);
  }, [formState, setDadosSalvos]);
  
  const onSubmit = (data) => {
    console.log('Formulário enviado:', data);
    // Limpa o rascunho após envio bem-sucedido
    setDadosSalvos({
      nome: '',
      email: '',
      mensagem: ''
    });
    resetForm();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="nota">
        Seus dados são salvos automaticamente enquanto você digita.
      </p>
      
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
          rows={5}
        />
      </div>
      
      <div className="acoes">
        <Button type="button" styles="ghost" onClick={resetForm}>
          Limpar
        </Button>
        <Button type="submit">
          Enviar
        </Button>
      </div>
    </form>
  );
}
```

### Serialização Personalizada

```jsx
import React from 'react';
import { useLocalStorage } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ExemploSerializacaoPersonalizada() {
  // Usando funções de serialização personalizadas para criptografar dados
  const [dadosSensiveis, setDadosSensiveis] = useLocalStorage(
    'dados-sensiveis',
    { token: '', usuario: '' },
    {
      // Função simples de "criptografia" (apenas para demonstração)
      serialize: (value) => {
        const encoded = btoa(JSON.stringify(value));
        return `encrypted_${encoded}`;
      },
      // Função de "descriptografia"
      deserialize: (storedValue) => {
        if (typeof storedValue !== 'string') return {};
        if (!storedValue.startsWith('encrypted_')) return {};
        
        const encoded = storedValue.replace('encrypted_', '');
        try {
          return JSON.parse(atob(encoded));
        } catch (error) {
          console.error('Erro ao deserializar:', error);
          return {};
        }
      }
    }
  );
  
  return (
    <div>
      <h2>Dados Sensíveis (Criptografados)</h2>
      <div className="campo">
        <label htmlFor="token">Token de API</label>
        <input
          id="token"
          type="password"
          value={dadosSensiveis.token}
          onChange={(e) => setDadosSensiveis({
            ...dadosSensiveis,
            token: e.target.value
          })}
        />
      </div>
      
      <div className="campo">
        <label htmlFor="usuario">Nome de Usuário</label>
        <input
          id="usuario"
          value={dadosSensiveis.usuario}
          onChange={(e) => setDadosSensiveis({
            ...dadosSensiveis,
            usuario: e.target.value
          })}
        />
      </div>
      
      <p>
        <small>
          Nota: Os dados são armazenados com uma criptografia simples no localStorage.
          Para dados realmente sensíveis, considere usar soluções mais seguras.
        </small>
      </p>
    </div>
  );
}
```

## Considerações de Segurança

- O localStorage não é criptografado por padrão e pode ser acessado por qualquer código JavaScript executado no mesmo domínio
- Não armazene informações sensíveis como senhas, tokens de autenticação ou dados pessoais sem criptografia adequada
- Considere o uso de bibliotecas de criptografia para dados sensíveis ou, melhor ainda, evite armazenar dados sensíveis no cliente

## Limitações

- O localStorage tem limite de armazenamento (geralmente 5-10MB dependendo do navegador)
- Só pode armazenar strings, por isso usamos JSON para serialização/deserialização
- Não é compartilhado entre diferentes domínios ou navegadores
- Não é acessível em navegação privada após o fechamento da janela

## Boas Práticas

- Use chaves descritivas e específicas para evitar colisões com outros scripts
- Considere adicionar um prefixo à chave para identificar seu aplicativo (ex: `app-name:user-preferences`)
- Implemente tratamento de erros para casos em que o localStorage não esteja disponível
- Evite armazenar grandes quantidades de dados que possam impactar a performance
- Use o hook para dados que realmente precisam persistir entre sessões, não para estado temporário
