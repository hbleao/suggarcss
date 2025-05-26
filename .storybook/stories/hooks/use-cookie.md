# useCookie

O hook `useCookie` gerencia cookies no navegador, permitindo leitura, escrita e exclusão com opções avançadas como expiração, domínio e flags de segurança.

## Importação

```jsx
import { useCookie } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCookie } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function CookieExample() {
  const [cookieValue, setCookieValue, removeCookie] = useCookie('meu-cookie', 'valor-inicial');
  
  return (
    <div>
      <Typography variant="title2">Exemplo de Cookie</Typography>
      
      <Typography variant="body1" style={{ marginTop: '16px' }}>
        Valor atual do cookie: <strong>{cookieValue}</strong>
      </Typography>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button onClick={() => setCookieValue('novo-valor')}>
          Atualizar Cookie
        </Button>
        
        <Button onClick={() => setCookieValue('outro-valor', { days: 7 })}>
          Atualizar (7 dias)
        </Button>
        
        <Button variant="secondary" onClick={removeCookie}>
          Remover Cookie
        </Button>
      </div>
    </div>
  );
}
```

## Parâmetros

O hook `useCookie` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `name` | `string` | Sim | Nome do cookie |
| `initialValue` | `string` | Não | Valor inicial do cookie (caso não exista) |
| `options` | `object` | Não | Opções adicionais para configurar o comportamento do cookie |

### Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `days` | `number` | `undefined` | Número de dias até a expiração do cookie |
| `path` | `string` | `'/'` | Caminho do cookie |
| `domain` | `string` | `undefined` | Domínio do cookie |
| `secure` | `boolean` | `false` | Se o cookie deve ser enviado apenas por HTTPS |
| `sameSite` | `string` | `'Lax'` | Política SameSite ('Strict', 'Lax' ou 'None') |
| `httpOnly` | `boolean` | `false` | Se o cookie deve ser acessível apenas pelo servidor |

## Retorno

O hook `useCookie` retorna um array com três elementos:

| Índice | Tipo | Descrição |
|--------|------|-----------|
| `0` | `string` | Valor atual do cookie |
| `1` | `function` | Função para atualizar o valor do cookie: `(newValue, options?) => void` |
| `2` | `function` | Função para remover o cookie: `() => void` |

## Exemplos

### Preferências de Tema

```jsx
import React, { useEffect } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCookie } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ThemePreference() {
  const [theme, setTheme, removeTheme] = useCookie('theme-preference', 'light');
  
  // Aplica o tema ao body
  useEffect(() => {
    document.body.className = `theme-${theme}`;
    
    return () => {
      document.body.className = '';
    };
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light', { days: 365 });
  };
  
  return (
    <div style={{ 
      padding: '24px',
      background: theme === 'light' ? '#ffffff' : '#1f1f1f',
      color: theme === 'light' ? '#000000' : '#ffffff',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    }}>
      <Typography 
        variant="title2" 
        style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}
      >
        Preferência de Tema
      </Typography>
      
      <Typography 
        variant="body1" 
        style={{ 
          marginTop: '16px',
          color: theme === 'light' ? '#333333' : '#cccccc'
        }}
      >
        Tema atual: <strong>{theme === 'light' ? 'Claro' : 'Escuro'}</strong>
      </Typography>
      
      <Typography 
        variant="body2" 
        style={{ 
          marginTop: '8px',
          color: theme === 'light' ? '#666666' : '#aaaaaa'
        }}
      >
        Sua preferência de tema será lembrada por 1 ano.
      </Typography>
      
      <div style={{ marginTop: '16px' }}>
        <Button 
          onClick={toggleTheme}
          variant={theme === 'light' ? 'primary' : 'secondary'}
        >
          Mudar para tema {theme === 'light' ? 'escuro' : 'claro'}
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={removeTheme}
          style={{ marginLeft: '8px' }}
        >
          Resetar preferência
        </Button>
      </div>
    </div>
  );
}
```

### Consentimento de Cookies

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCookie } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function CookieConsent() {
  const [consent, setConsent, removeConsent] = useCookie('cookie-consent', '');
  const [showBanner, setShowBanner] = useState(false);
  
  // Verifica se o usuário já deu consentimento
  useEffect(() => {
    if (!consent) {
      setShowBanner(true);
    }
  }, [consent]);
  
  const acceptAll = () => {
    setConsent('all', { days: 180 });
    setShowBanner(false);
  };
  
  const acceptEssential = () => {
    setConsent('essential', { days: 180 });
    setShowBanner(false);
  };
  
  const rejectAll = () => {
    setConsent('none', { days: 180 });
    setShowBanner(false);
  };
  
  const resetConsent = () => {
    removeConsent();
    setShowBanner(true);
  };
  
  return (
    <div>
      <Typography variant="title2">Gerenciamento de Consentimento de Cookies</Typography>
      
      {showBanner && (
        <div style={{ 
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '16px',
          background: '#f0f0f0',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000
        }}>
          <Typography variant="subtitle1">Política de Cookies</Typography>
          
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Utilizamos cookies para melhorar sua experiência em nosso site. 
            Você pode escolher quais tipos de cookies deseja aceitar.
          </Typography>
          
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <Button onClick={acceptAll}>Aceitar Todos</Button>
            <Button variant="secondary" onClick={acceptEssential}>Apenas Essenciais</Button>
            <Button variant="secondary" onClick={rejectAll}>Rejeitar Todos</Button>
          </div>
        </div>
      )}
      
      <div style={{ marginTop: '24px', padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
        <Typography variant="subtitle1">Status de Consentimento</Typography>
        
        {consent ? (
          <div>
            <Typography variant="body1" style={{ marginTop: '8px' }}>
              Preferência atual: <strong>{
                consent === 'all' ? 'Todos os cookies aceitos' :
                consent === 'essential' ? 'Apenas cookies essenciais' :
                'Todos os cookies rejeitados'
              }</strong>
            </Typography>
            
            <Button 
              variant="secondary" 
              size="small" 
              onClick={resetConsent}
              style={{ marginTop: '16px' }}
            >
              Redefinir Consentimento
            </Button>
          </div>
        ) : (
          <Typography variant="body1" style={{ marginTop: '8px' }}>
            Nenhuma preferência definida.
          </Typography>
        )}
      </div>
    </div>
  );
}
```

### Autenticação Simplificada

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCookie } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function SimpleAuth() {
  const [authToken, setAuthToken, removeAuthToken] = useCookie('auth-token', '');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (authToken) {
      // Em uma aplicação real, você validaria o token no servidor
      setIsLoggedIn(true);
      
      // Simula a obtenção do nome de usuário a partir do token
      const fakeUsername = authToken.split('-')[0];
      setUsername(fakeUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, [authToken]);
  
  const handleLogin = () => {
    // Simula um login bem-sucedido
    const fakeToken = `usuario${Math.floor(Math.random() * 1000)}-${Date.now()}`;
    
    // Armazena o token por 1 dia
    setAuthToken(fakeToken, { 
      days: 1,
      secure: true,
      sameSite: 'Strict'
    });
  };
  
  const handleLogout = () => {
    removeAuthToken();
  };
  
  return (
    <div>
      <Typography variant="title2">Autenticação com Cookies</Typography>
      
      <div style={{ 
        marginTop: '24px', 
        padding: '24px', 
        background: isLoggedIn ? '#f6ffed' : '#fff7e6',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease'
      }}>
        {isLoggedIn ? (
          <div>
            <Typography variant="subtitle1">
              Bem-vindo, {username}!
            </Typography>
            
            <Typography variant="body2" style={{ marginTop: '8px' }}>
              Você está autenticado. Seu token de autenticação expirará em 1 dia.
            </Typography>
            
            <Button 
              variant="secondary" 
              onClick={handleLogout}
              style={{ marginTop: '16px' }}
            >
              Sair
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant="subtitle1">
              Você não está autenticado
            </Typography>
            
            <Typography variant="body2" style={{ marginTop: '8px' }}>
              Clique no botão abaixo para simular um login.
            </Typography>
            
            <Button 
              onClick={handleLogin}
              style={{ marginTop: '16px' }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <Typography variant="caption" style={{ color: '#666' }}>
          Nota: Este é um exemplo simplificado. Em uma aplicação real, você deve implementar
          medidas de segurança adicionais e validar tokens no servidor.
        </Typography>
      </div>
    </div>
  );
}
```

### Cookies com Opções Avançadas

```jsx
import React, { useState } from 'react';
import { Button, Typography, Checkbox } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCookie } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function AdvancedCookieOptions() {
  const [cookieValue, setCookieValue, removeCookie] = useCookie('advanced-cookie', '');
  
  const [options, setOptions] = useState({
    days: 7,
    path: '/',
    secure: true,
    sameSite: 'Strict',
  });
  
  const [inputValue, setInputValue] = useState('');
  
  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSetCookie = () => {
    setCookieValue(inputValue || 'valor-padrao', options);
  };
  
  return (
    <div>
      <Typography variant="title2">Opções Avançadas de Cookies</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <Typography variant="body1">
          Valor atual do cookie: <strong>{cookieValue || '(não definido)'}</strong>
        </Typography>
        
        <div style={{ marginTop: '16px' }}>
          <label htmlFor="cookieValue" style={{ display: 'block', marginBottom: '4px' }}>
            <Typography variant="body2">Valor do Cookie</Typography>
          </label>
          <input
            type="text"
            id="cookieValue"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite um valor para o cookie"
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              marginBottom: '16px'
            }}
          />
          
          <Typography variant="subtitle2" style={{ marginTop: '16px' }}>
            Opções do Cookie
          </Typography>
          
          <div style={{ marginTop: '8px' }}>
            <div style={{ marginBottom: '8px' }}>
              <label htmlFor="days" style={{ display: 'block', marginBottom: '4px' }}>
                <Typography variant="body2">Dias até expirar</Typography>
              </label>
              <input
                type="number"
                id="days"
                name="days"
                value={options.days}
                onChange={handleOptionChange}
                min="0"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  borderRadius: '4px',
                  border: '1px solid #d9d9d9'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <label htmlFor="path" style={{ display: 'block', marginBottom: '4px' }}>
                <Typography variant="body2">Caminho</Typography>
              </label>
              <input
                type="text"
                id="path"
                name="path"
                value={options.path}
                onChange={handleOptionChange}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  borderRadius: '4px',
                  border: '1px solid #d9d9d9'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <label htmlFor="sameSite" style={{ display: 'block', marginBottom: '4px' }}>
                <Typography variant="body2">SameSite</Typography>
              </label>
              <select
                id="sameSite"
                name="sameSite"
                value={options.sameSite}
                onChange={handleOptionChange}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  borderRadius: '4px',
                  border: '1px solid #d9d9d9'
                }}
              >
                <option value="Strict">Strict</option>
                <option value="Lax">Lax</option>
                <option value="None">None</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Checkbox
                id="secure"
                name="secure"
                checked={options.secure}
                onChange={handleOptionChange}
                label="Secure (apenas HTTPS)"
              />
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button onClick={handleSetCookie}>
            Definir Cookie
          </Button>
          
          <Button variant="secondary" onClick={removeCookie}>
            Remover Cookie
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## Considerações de Segurança

- **Dados Sensíveis**: Nunca armazene dados sensíveis (senhas, tokens de acesso completos, informações pessoais) em cookies sem criptografia.
- **Opção Secure**: Use a opção `secure: true` para garantir que o cookie só seja transmitido por HTTPS.
- **SameSite**: Configure a opção `sameSite` adequadamente para proteger contra ataques CSRF:
  - `'Strict'`: O cookie só é enviado em requisições do mesmo site.
  - `'Lax'`: O cookie é enviado em requisições do mesmo site e em navegações de nível superior (padrão moderno).
  - `'None'`: O cookie é enviado em todas as requisições (requer `secure: true`).
- **HttpOnly**: Cookies que não precisam ser acessados por JavaScript devem usar a opção `httpOnly: true` (observe que isso limitará o uso do cookie pelo navegador).

## Boas Práticas

- Use cookies para armazenar pequenas quantidades de dados (menos de 4KB).
- Defina um tempo de expiração apropriado para seus cookies usando a opção `days`.
- Para dados maiores ou que não precisam ser enviados ao servidor em cada requisição, considere usar `localStorage` ou `sessionStorage`.
- Documente claramente quais cookies sua aplicação utiliza e para quê, especialmente para conformidade com leis de privacidade como GDPR e LGPD.
- Combine com outros hooks como `useEffect` para executar ações quando o valor do cookie mudar.
- Considere criar hooks personalizados baseados em `useCookie` para casos de uso específicos, como `useThemePreference` ou `useAuthToken`.
