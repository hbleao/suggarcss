# usePrevious

O hook `usePrevious` armazena e permite acessar o valor anterior de uma variável de estado ou prop, sendo útil para detectar mudanças e implementar efeitos baseados em alterações.

## Importação

```jsx
import { usePrevious } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React, { useState } from 'react';
import { Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { usePrevious } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);
  
  return (
    <div>
      <h2>Contador</h2>
      <p>Valor atual: {count}</p>
      <p>Valor anterior: {previousCount !== undefined ? previousCount : 'Nenhum'}</p>
      <Button onClick={() => setCount(count + 1)}>Incrementar</Button>
    </div>
  );
}
```

## Parâmetros

O hook `usePrevious` aceita um único parâmetro:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `value` | `any` | Sim | O valor atual que você deseja rastrear |

## Retorno

O hook `usePrevious` retorna o valor anterior do parâmetro fornecido. Na primeira renderização, retorna `undefined`.

## Exemplos

### Detectando Mudanças de Estado

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { usePrevious } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function StateChangeDetector() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);
  const [changeDirection, setChangeDirection] = useState(null);
  
  useEffect(() => {
    if (previousCount !== undefined) {
      if (count > previousCount) {
        setChangeDirection('aumentou');
      } else if (count < previousCount) {
        setChangeDirection('diminuiu');
      }
    }
  }, [count, previousCount]);
  
  return (
    <div>
      <Typography variant="title2">Detector de Mudanças</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <Typography variant="body1">Valor atual: {count}</Typography>
        <Typography variant="body1">Valor anterior: {previousCount !== undefined ? previousCount : 'Nenhum'}</Typography>
        
        {changeDirection && (
          <Typography 
            variant="body1" 
            style={{ 
              color: changeDirection === 'aumentou' ? '#52c41a' : '#f5222d',
              marginTop: '8px'
            }}
          >
            O valor {changeDirection} (de {previousCount} para {count})
          </Typography>
        )}
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button onClick={() => setCount(count + 1)}>Incrementar</Button>
          <Button onClick={() => setCount(count - 1)}>Decrementar</Button>
          <Button variant="secondary" onClick={() => setCount(0)}>Resetar</Button>
        </div>
      </div>
    </div>
  );
}
```

### Animação Baseada em Mudanças

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { usePrevious } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function AnimatedCounter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Só anima se não for a primeira renderização
    if (previousCount !== undefined && previousCount !== count) {
      setIsAnimating(true);
      
      // Reseta a animação após 500ms
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [count, previousCount]);
  
  return (
    <div>
      <Typography variant="title2">Contador Animado</Typography>
      
      <div 
        style={{ 
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px'
        }}
      >
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1890ff',
            transition: 'transform 0.5s, opacity 0.5s',
            transform: isAnimating ? 'scale(1.5)' : 'scale(1)',
            opacity: isAnimating ? 0.8 : 1
          }}
        >
          {count}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
        <Button onClick={() => setCount(count - 5)}>-5</Button>
        <Button onClick={() => setCount(count - 1)}>-1</Button>
        <Button variant="secondary" onClick={() => setCount(0)}>Reset</Button>
        <Button onClick={() => setCount(count + 1)}>+1</Button>
        <Button onClick={() => setCount(count + 5)}>+5</Button>
      </div>
      
      <Typography 
        variant="caption" 
        style={{ 
          display: 'block', 
          textAlign: 'center', 
          marginTop: '16px',
          color: '#666'
        }}
      >
        Valor anterior: {previousCount !== undefined ? previousCount : 'Nenhum'}
      </Typography>
    </div>
  );
}
```

### Rastreando Mudanças em Objetos Complexos

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { usePrevious } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function UserProfileTracker() {
  const [user, setUser] = useState({
    name: 'João Silva',
    email: 'joao@exemplo.com',
    role: 'usuário',
    isActive: true
  });
  
  const previousUser = usePrevious(user);
  const [changes, setChanges] = useState([]);
  
  // Detecta quais propriedades mudaram
  useEffect(() => {
    if (previousUser) {
      const newChanges = [];
      
      Object.keys(user).forEach(key => {
        if (user[key] !== previousUser[key]) {
          newChanges.push({
            field: key,
            oldValue: previousUser[key],
            newValue: user[key],
            timestamp: new Date().toLocaleTimeString()
          });
        }
      });
      
      if (newChanges.length > 0) {
        setChanges(prev => [...newChanges, ...prev].slice(0, 5)); // Mantém apenas as 5 mudanças mais recentes
      }
    }
  }, [user, previousUser]);
  
  // Funções para atualizar o usuário
  const updateName = () => {
    const names = ['João Silva', 'Maria Souza', 'Pedro Santos', 'Ana Oliveira'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    setUser(prev => ({ ...prev, name: randomName }));
  };
  
  const updateEmail = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setUser(prev => ({ ...prev, email: `usuario${randomId}@exemplo.com` }));
  };
  
  const updateRole = () => {
    const roles = ['usuário', 'editor', 'administrador', 'convidado'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    setUser(prev => ({ ...prev, role: randomRole }));
  };
  
  const toggleActive = () => {
    setUser(prev => ({ ...prev, isActive: !prev.isActive }));
  };
  
  return (
    <div>
      <Typography variant="title2">Rastreador de Perfil de Usuário</Typography>
      
      <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="subtitle1">Perfil Atual</Typography>
        
        <div style={{ marginTop: '8px' }}>
          <Typography variant="body2">Nome: {user.name}</Typography>
          <Typography variant="body2">Email: {user.email}</Typography>
          <Typography variant="body2">Função: {user.role}</Typography>
          <Typography variant="body2">
            Status: {user.isActive ? 'Ativo' : 'Inativo'}
          </Typography>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
          <Button size="small" onClick={updateName}>Mudar Nome</Button>
          <Button size="small" onClick={updateEmail}>Mudar Email</Button>
          <Button size="small" onClick={updateRole}>Mudar Função</Button>
          <Button 
            size="small" 
            variant={user.isActive ? 'secondary' : 'primary'} 
            onClick={toggleActive}
          >
            {user.isActive ? 'Desativar' : 'Ativar'}
          </Button>
        </div>
      </div>
      
      {changes.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <Typography variant="subtitle1">Histórico de Mudanças</Typography>
          
          <div style={{ marginTop: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {changes.map((change, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '8px', 
                  marginBottom: '8px', 
                  background: '#e6f7ff', 
                  borderRadius: '4px',
                  borderLeft: '3px solid #1890ff'
                }}
              >
                <Typography variant="body2">
                  <strong>Campo:</strong> {change.field}
                </Typography>
                <Typography variant="body2">
                  <strong>De:</strong> {String(change.oldValue)}
                </Typography>
                <Typography variant="body2">
                  <strong>Para:</strong> {String(change.newValue)}
                </Typography>
                <Typography variant="caption" style={{ color: '#666' }}>
                  {change.timestamp}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Integração com Formulários

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { usePrevious } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function FormWithUnsavedChanges() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const previousFormData = usePrevious(formData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Verifica se há mudanças não salvas
  useEffect(() => {
    if (previousFormData) {
      const isChanged = Object.keys(formData).some(
        key => formData[key] !== previousFormData[key]
      );
      setHasUnsavedChanges(isChanged);
    }
  }, [formData, previousFormData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulário enviado com sucesso!');
    setHasUnsavedChanges(false);
  };
  
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  
  // Aviso ao tentar sair da página com mudanças não salvas
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
  
  return (
    <div>
      <Typography variant="title2">Formulário com Detecção de Mudanças</Typography>
      
      {hasUnsavedChanges && (
        <div style={{ 
          padding: '8px 16px', 
          background: '#fffbe6', 
          border: '1px solid #ffe58f',
          borderRadius: '4px',
          marginTop: '16px'
        }}>
          <Typography variant="body2" style={{ color: '#d48806' }}>
            Você tem alterações não salvas. Certifique-se de enviar o formulário antes de sair.
          </Typography>
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
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
          <Button type="submit" disabled={!hasUnsavedChanges}>
            Enviar
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleReset}
            disabled={!formData.name && !formData.email && !formData.message}
          >
            Limpar
          </Button>
        </div>
      </form>
    </div>
  );
}
```

## Considerações de Performance

- O hook `usePrevious` utiliza `useRef` internamente, o que significa que não causa re-renderizações quando o valor anterior é acessado
- É eficiente mesmo com objetos complexos, pois apenas armazena uma referência ao valor anterior
- Para objetos grandes ou complexos, considere usar uma função de comparação personalizada para determinar se houve mudanças significativas

## Boas Práticas

- Use `usePrevious` quando precisar comparar valores atuais com valores anteriores para detectar mudanças
- Combine com `useEffect` para executar efeitos colaterais baseados em mudanças de estado
- Para formulários, use para detectar mudanças não salvas e avisar o usuário antes de sair da página
- Em visualizações de dados, use para animar transições quando os valores mudam
- Lembre-se que na primeira renderização, o valor anterior será `undefined`
