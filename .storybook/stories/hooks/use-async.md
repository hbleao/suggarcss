# useAsync

O hook `useAsync` gerencia estados de loading, erro e sucesso em operações assíncronas, simplificando o tratamento de requisições e processamento de dados.

## Importação

```jsx
import { useAsync } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useAsync } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function AsyncExample() {
  const fetchData = async () => {
    // Simulando uma requisição com 1 segundo de delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Dados carregados com sucesso!' };
  };
  
  const { 
    execute, 
    status, 
    value, 
    error 
  } = useAsync(fetchData, false);
  
  return (
    <div>
      <Typography variant="title2">Exemplo de useAsync</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <Button 
          onClick={execute}
          disabled={status === 'pending'}
        >
          {status === 'pending' ? 'Carregando...' : 'Carregar Dados'}
        </Button>
        
        <div style={{ marginTop: '16px' }}>
          {status === 'idle' && (
            <Typography variant="body2">Clique no botão para carregar os dados.</Typography>
          )}
          
          {status === 'pending' && (
            <Typography variant="body2">Carregando dados...</Typography>
          )}
          
          {status === 'success' && (
            <Typography variant="body2" style={{ color: '#52c41a' }}>
              Sucesso: {value.message}
            </Typography>
          )}
          
          {status === 'error' && (
            <Typography variant="body2" style={{ color: '#f5222d' }}>
              Erro: {error.message}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
```

## Parâmetros

O hook `useAsync` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `asyncFunction` | `() => Promise<T>` | Sim | Função assíncrona a ser executada |
| `immediate` | `boolean` | Não | Se a função deve ser executada imediatamente (padrão: `true`) |
| `initialState` | `object` | Não | Estado inicial para o hook |

## Retorno

O hook `useAsync` retorna um objeto com as seguintes propriedades:

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `execute` | `() => Promise<T>` | Função para executar a operação assíncrona |
| `status` | `'idle' \| 'pending' \| 'success' \| 'error'` | Estado atual da operação |
| `value` | `T \| null` | Valor retornado pela operação (quando bem-sucedida) |
| `error` | `Error \| null` | Erro ocorrido (quando falha) |
| `reset` | `() => void` | Função para resetar o estado para `idle` |

## Exemplos

### Carregamento de Dados de API

```jsx
import React, { useEffect } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useAsync } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function UserProfile({ userId }) {
  const fetchUserData = async () => {
    // Em uma aplicação real, você faria uma chamada de API
    // Simulando uma requisição
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulando dados de usuário
    if (Math.random() > 0.8) {
      throw new Error('Falha ao carregar dados do usuário');
    }
    
    return {
      id: userId,
      name: 'João Silva',
      email: 'joao@exemplo.com',
      role: 'Desenvolvedor',
      joinedAt: '2023-01-15'
    };
  };
  
  const { 
    execute: fetchUser,
    status,
    value: user,
    error,
    reset
  } = useAsync(fetchUserData, true);
  
  useEffect(() => {
    // Recarrega os dados quando o userId mudar
    if (userId) {
      reset();
      fetchUser();
    }
  }, [userId, reset, fetchUser]);
  
  return (
    <div>
      <Typography variant="title2">Perfil do Usuário</Typography>
      
      <div style={{ 
        marginTop: '16px',
        padding: '16px',
        background: '#f9f9f9',
        borderRadius: '8px'
      }}>
        {status === 'pending' && (
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <Typography variant="body1">Carregando perfil...</Typography>
          </div>
        )}
        
        {status === 'error' && (
          <div style={{ 
            padding: '16px', 
            background: '#fff1f0', 
            border: '1px solid #ffa39e',
            borderRadius: '4px'
          }}>
            <Typography variant="subtitle1" style={{ color: '#cf1322' }}>
              Erro ao carregar perfil
            </Typography>
            <Typography variant="body2" style={{ color: '#f5222d', marginTop: '4px' }}>
              {error.message}
            </Typography>
            <Button 
              size="small" 
              onClick={fetchUser}
              style={{ marginTop: '8px' }}
            >
              Tentar Novamente
            </Button>
          </div>
        )}
        
        {status === 'success' && user && (
          <div>
            <Typography variant="subtitle1">{user.name}</Typography>
            <div style={{ marginTop: '8px' }}>
              <Typography variant="body2">Email: {user.email}</Typography>
              <Typography variant="body2">Função: {user.role}</Typography>
              <Typography variant="body2">
                Membro desde: {new Date(user.joinedAt).toLocaleDateString()}
              </Typography>
            </div>
          </div>
        )}
      </div>
      
      {status === 'success' && (
        <Button 
          variant="secondary" 
          size="small" 
          onClick={fetchUser}
          style={{ marginTop: '8px' }}
        >
          Atualizar Dados
        </Button>
      )}
    </div>
  );
}
```

### Envio de Formulário

```jsx
import React, { useState } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useAsync } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const submitForm = async (data) => {
    // Simulando envio de formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulando validação do servidor
    if (!data.email.includes('@')) {
      throw new Error('Email inválido');
    }
    
    if (data.message.length < 10) {
      throw new Error('Mensagem muito curta');
    }
    
    // Simulando resposta de sucesso
    return { success: true, id: Math.floor(Math.random() * 1000) };
  };
  
  const { 
    execute: handleSubmit,
    status,
    value: result,
    error,
    reset
  } = useAsync(() => submitForm(formData), false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Resetar o estado se houver um erro ou sucesso anterior
    if (status === 'error' || status === 'success') {
      reset();
    }
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    reset();
  };
  
  return (
    <div>
      <Typography variant="title2">Formulário de Contato</Typography>
      
      {status === 'success' ? (
        <div style={{ 
          marginTop: '16px',
          padding: '24px',
          background: '#f6ffed',
          border: '1px solid #b7eb8f',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <Typography variant="subtitle1" style={{ color: '#52c41a' }}>
            Mensagem Enviada com Sucesso!
          </Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Sua mensagem foi recebida. Número de protocolo: #{result.id}
          </Typography>
          <Button 
            onClick={handleReset}
            style={{ marginTop: '16px' }}
          >
            Enviar Nova Mensagem
          </Button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} style={{ marginTop: '16px' }}>
          {status === 'error' && (
            <div style={{ 
              padding: '12px', 
              background: '#fff1f0', 
              border: '1px solid #ffa39e',
              borderRadius: '4px',
              marginBottom: '16px'
            }}>
              <Typography variant="body2" style={{ color: '#f5222d' }}>
                {error.message}
              </Typography>
            </div>
          )}
          
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>
              <Typography variant="body2">Nome</Typography>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'pending'}
              required
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px',
                border: '1px solid #d9d9d9'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>
              <Typography variant="body2">Email</Typography>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'pending'}
              required
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px',
                border: '1px solid #d9d9d9'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '4px' }}>
              <Typography variant="body2">Mensagem</Typography>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'pending'}
              required
              rows={4}
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px',
                border: '1px solid #d9d9d9'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              type="submit" 
              disabled={status === 'pending'}
            >
              {status === 'pending' ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
            
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleReset}
              disabled={status === 'pending'}
            >
              Limpar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
```

### Operações Paralelas

```jsx
import React, { useState } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useAsync } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ParallelOperations() {
  // Simulando três operações diferentes
  const fetchUserData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { name: 'João Silva', email: 'joao@exemplo.com' };
  };
  
  const fetchUserPosts = async () => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    return [
      { id: 1, title: 'Primeiro Post' },
      { id: 2, title: 'Segundo Post' },
      { id: 3, title: 'Terceiro Post' }
    ];
  };
  
  const fetchUserStats = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulando um erro ocasional
    if (Math.random() > 0.7) {
      throw new Error('Falha ao carregar estatísticas');
    }
    
    return { followers: 120, following: 85, likes: 450 };
  };
  
  // Usando useAsync para cada operação
  const userDataAsync = useAsync(fetchUserData, false);
  const userPostsAsync = useAsync(fetchUserPosts, false);
  const userStatsAsync = useAsync(fetchUserStats, false);
  
  // Função para carregar todos os dados
  const loadAllData = () => {
    userDataAsync.execute();
    userPostsAsync.execute();
    userStatsAsync.execute();
  };
  
  // Função para verificar se todos os dados foram carregados
  const allDataLoaded = 
    userDataAsync.status === 'success' && 
    userPostsAsync.status === 'success' && 
    userStatsAsync.status === 'success';
  
  // Função para verificar se alguma operação está em andamento
  const isLoading = 
    userDataAsync.status === 'pending' || 
    userPostsAsync.status === 'pending' || 
    userStatsAsync.status === 'pending';
  
  return (
    <div>
      <Typography variant="title2">Operações Paralelas</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <Button 
          onClick={loadAllData}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Carregar Todos os Dados'}
        </Button>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          {/* Seção de Dados do Usuário */}
          <div style={{ 
            padding: '16px', 
            background: '#f9f9f9', 
            borderRadius: '8px',
            border: '1px solid #d9d9d9'
          }}>
            <Typography variant="subtitle1">Dados do Usuário</Typography>
            
            {userDataAsync.status === 'idle' && (
              <Typography variant="body2" style={{ marginTop: '8px', color: '#8c8c8c' }}>
                Clique no botão para carregar
              </Typography>
            )}
            
            {userDataAsync.status === 'pending' && (
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Carregando dados...
              </Typography>
            )}
            
            {userDataAsync.status === 'error' && (
              <Typography variant="body2" style={{ marginTop: '8px', color: '#f5222d' }}>
                Erro: {userDataAsync.error.message}
              </Typography>
            )}
            
            {userDataAsync.status === 'success' && userDataAsync.value && (
              <div style={{ marginTop: '8px' }}>
                <Typography variant="body2">Nome: {userDataAsync.value.name}</Typography>
                <Typography variant="body2">Email: {userDataAsync.value.email}</Typography>
              </div>
            )}
          </div>
          
          {/* Seção de Posts do Usuário */}
          <div style={{ 
            padding: '16px', 
            background: '#f9f9f9', 
            borderRadius: '8px',
            border: '1px solid #d9d9d9'
          }}>
            <Typography variant="subtitle1">Posts do Usuário</Typography>
            
            {userPostsAsync.status === 'idle' && (
              <Typography variant="body2" style={{ marginTop: '8px', color: '#8c8c8c' }}>
                Clique no botão para carregar
              </Typography>
            )}
            
            {userPostsAsync.status === 'pending' && (
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Carregando posts...
              </Typography>
            )}
            
            {userPostsAsync.status === 'error' && (
              <Typography variant="body2" style={{ marginTop: '8px', color: '#f5222d' }}>
                Erro: {userPostsAsync.error.message}
              </Typography>
            )}
            
            {userPostsAsync.status === 'success' && userPostsAsync.value && (
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                {userPostsAsync.value.map(post => (
                  <li key={post.id}>
                    <Typography variant="body2">{post.title}</Typography>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Seção de Estatísticas do Usuário */}
          <div style={{ 
            padding: '16px', 
            background: '#f9f9f9', 
            borderRadius: '8px',
            border: '1px solid #d9d9d9'
          }}>
            <Typography variant="subtitle1">Estatísticas</Typography>
            
            {userStatsAsync.status === 'idle' && (
              <Typography variant="body2" style={{ marginTop: '8px', color: '#8c8c8c' }}>
                Clique no botão para carregar
              </Typography>
            )}
            
            {userStatsAsync.status === 'pending' && (
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Carregando estatísticas...
              </Typography>
            )}
            
            {userStatsAsync.status === 'error' && (
              <div style={{ marginTop: '8px' }}>
                <Typography variant="body2" style={{ color: '#f5222d' }}>
                  Erro: {userStatsAsync.error.message}
                </Typography>
                <Button 
                  size="small" 
                  onClick={userStatsAsync.execute}
                  style={{ marginTop: '8px' }}
                >
                  Tentar Novamente
                </Button>
              </div>
            )}
            
            {userStatsAsync.status === 'success' && userStatsAsync.value && (
              <div style={{ marginTop: '8px' }}>
                <Typography variant="body2">Seguidores: {userStatsAsync.value.followers}</Typography>
                <Typography variant="body2">Seguindo: {userStatsAsync.value.following}</Typography>
                <Typography variant="body2">Curtidas: {userStatsAsync.value.likes}</Typography>
              </div>
            )}
          </div>
        </div>
        
        {allDataLoaded && (
          <div style={{ 
            marginTop: '24px',
            padding: '16px',
            background: '#f6ffed',
            border: '1px solid #b7eb8f',
            borderRadius: '8px'
          }}>
            <Typography variant="body1" style={{ color: '#52c41a' }}>
              Todos os dados foram carregados com sucesso!
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Considerações de Performance

- O hook `useAsync` utiliza `useCallback` internamente para memoizar a função `execute`, evitando re-renderizações desnecessárias
- Para operações que dependem de parâmetros externos, você pode passar esses parâmetros para a função `execute` em vez de capturá-los no escopo da função assíncrona
- Considere usar o parâmetro `immediate: false` para operações que não precisam ser executadas imediatamente na montagem do componente
- Para operações frequentes, considere adicionar um mecanismo de cache ou debounce para evitar chamadas desnecessárias

## Boas Práticas

- Use `useAsync` para simplificar o gerenciamento de estados em operações assíncronas como chamadas de API
- Combine com outros hooks como `useEffect` para executar operações assíncronas quando determinadas dependências mudarem
- Aproveite os diferentes estados (`idle`, `pending`, `success`, `error`) para fornecer feedback visual adequado ao usuário
- Para formulários, use `useAsync` para gerenciar o envio e o feedback de erros de validação do servidor
- Considere criar hooks personalizados baseados em `useAsync` para operações específicas da sua aplicação, como `useFetchUser` ou `useSubmitForm`
