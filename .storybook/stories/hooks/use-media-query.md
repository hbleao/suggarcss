# useMediaQuery

O hook `useMediaQuery` permite detectar se uma media query CSS corresponde ao estado atual da tela, facilitando a criação de componentes responsivos.

## Importação

```jsx
import { useMediaQuery } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React from 'react';
import { useMediaQuery } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div>
      <h2>Componente Responsivo</h2>
      <p>Você está usando um dispositivo {isMobile ? 'móvel' : 'desktop'}</p>
      {isMobile ? (
        <div className="mobile-layout">Layout para dispositivos móveis</div>
      ) : (
        <div className="desktop-layout">Layout para desktop</div>
      )}
    </div>
  );
}
```

## Parâmetros

O hook `useMediaQuery` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `query` | `string` | Sim | A media query CSS a ser avaliada |
| `defaultValue` | `boolean` | Não | Valor padrão a ser retornado antes da avaliação da media query (padrão: `false`) |

## Retorno

O hook `useMediaQuery` retorna um valor booleano que indica se a media query corresponde ao estado atual:

```jsx
const matches = useMediaQuery(query, defaultValue);
```

## Exemplos

### Detectando Dispositivos Móveis

```jsx
import React from 'react';
import { Typography, Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useMediaQuery } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function MobileDetection() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  
  return (
    <div>
      <Typography variant="title2">Detecção de Dispositivo</Typography>
      
      <div style={{ marginTop: '16px' }}>
        {isMobile && (
          <div>
            <Typography variant="body1">Você está usando um dispositivo móvel</Typography>
            <Button size="small" fullWidth>Botão adaptado para telas pequenas</Button>
          </div>
        )}
        
        {isTablet && (
          <div>
            <Typography variant="body1">Você está usando um tablet</Typography>
            <Button size="medium">Botão para tablet</Button>
          </div>
        )}
        
        {isDesktop && (
          <div>
            <Typography variant="body1">Você está usando um desktop</Typography>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button size="large">Botão Principal</Button>
              <Button size="large" variant="secondary">Botão Secundário</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Detectando Orientação do Dispositivo

```jsx
import React from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useMediaQuery } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function OrientationDetection() {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  
  return (
    <div>
      <Typography variant="title2">Orientação do Dispositivo</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <Typography variant="body1">
          Seu dispositivo está em modo {isPortrait ? 'retrato' : 'paisagem'}
        </Typography>
        
        <div style={{ 
          marginTop: '24px',
          padding: '16px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          background: isPortrait ? '#e6f7ff' : '#f6ffed'
        }}>
          {isPortrait ? (
            <div>
              <Typography variant="subtitle1">Modo Retrato</Typography>
              <Typography variant="body2">
                Este layout é otimizado para visualização em modo retrato.
                Experimente girar seu dispositivo para ver a diferença.
              </Typography>
              <div style={{ height: '200px', background: '#1890ff', marginTop: '16px' }}></div>
            </div>
          ) : (
            <div>
              <Typography variant="subtitle1">Modo Paisagem</Typography>
              <Typography variant="body2">
                Este layout é otimizado para visualização em modo paisagem.
                Você tem mais espaço horizontal disponível.
              </Typography>
              <div style={{ height: '100px', background: '#52c41a', marginTop: '16px' }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Preferência de Tema (Claro/Escuro)

```jsx
import React from 'react';
import { Typography, Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useMediaQuery } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ThemePreference() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  const themeStyles = {
    container: {
      background: prefersDarkMode ? '#1f1f1f' : '#ffffff',
      color: prefersDarkMode ? '#ffffff' : '#000000',
      padding: '24px',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    },
    card: {
      background: prefersDarkMode ? '#2d2d2d' : '#f5f5f5',
      padding: '16px',
      borderRadius: '4px',
      marginTop: '16px',
      boxShadow: prefersDarkMode 
        ? '0 4px 12px rgba(0, 0, 0, 0.5)' 
        : '0 4px 12px rgba(0, 0, 0, 0.1)'
    }
  };
  
  return (
    <div style={themeStyles.container}>
      <Typography 
        variant="title2" 
        style={{ color: prefersDarkMode ? '#ffffff' : '#000000' }}
      >
        Preferência de Tema
      </Typography>
      
      <Typography 
        variant="body1" 
        style={{ color: prefersDarkMode ? '#cccccc' : '#333333', marginTop: '8px' }}
      >
        Seu sistema está configurado para o tema {prefersDarkMode ? 'escuro' : 'claro'}
      </Typography>
      
      <div style={themeStyles.card}>
        <Typography 
          variant="subtitle1" 
          style={{ color: prefersDarkMode ? '#ffffff' : '#000000' }}
        >
          Conteúdo Adaptativo
        </Typography>
        
        <Typography 
          variant="body2" 
          style={{ color: prefersDarkMode ? '#aaaaaa' : '#666666', marginTop: '8px' }}
        >
          Este componente se adapta automaticamente à sua preferência de tema.
          Tente mudar a configuração do seu sistema para ver a mudança.
        </Typography>
        
        <Button 
          style={{ marginTop: '16px' }}
          variant={prefersDarkMode ? 'primary' : 'secondary'}
        >
          Botão Adaptativo
        </Button>
      </div>
    </div>
  );
}
```

### Recursos de Acessibilidade

```jsx
import React from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useMediaQuery } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function AccessibilityFeatures() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const prefersHighContrast = useMediaQuery('(prefers-contrast: more)');
  
  const styles = {
    container: {
      padding: '16px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      marginTop: '16px'
    },
    animation: {
      width: '100px',
      height: '100px',
      background: 'linear-gradient(45deg, #1890ff, #52c41a)',
      borderRadius: '50%',
      margin: '16px auto',
      transition: prefersReducedMotion ? 'none' : 'all 0.5s ease',
      animation: prefersReducedMotion 
        ? 'none' 
        : 'pulse 2s infinite alternate',
    },
    text: {
      color: prefersHighContrast ? '#000000' : '#666666',
      background: prefersHighContrast ? '#ffffff' : 'transparent',
      padding: prefersHighContrast ? '8px' : '0',
      border: prefersHighContrast ? '1px solid #000000' : 'none',
    }
  };
  
  return (
    <div>
      <Typography variant="title2">Recursos de Acessibilidade</Typography>
      
      <div style={styles.container}>
        <Typography variant="subtitle1">
          Configurações de Acessibilidade Detectadas
        </Typography>
        
        <ul>
          <li>
            <Typography variant="body2">
              Preferência por movimento reduzido: {prefersReducedMotion ? 'Sim' : 'Não'}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Preferência por alto contraste: {prefersHighContrast ? 'Sim' : 'Não'}
            </Typography>
          </li>
        </ul>
        
        <div style={styles.animation}></div>
        
        <Typography variant="body1" style={styles.text}>
          Este texto se adapta às suas preferências de acessibilidade.
          {prefersHighContrast && ' O alto contraste está ativado para melhor legibilidade.'}
          {prefersReducedMotion && ' As animações foram reduzidas ou removidas.'}
        </Typography>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
```

## Considerações de Performance

- O hook `useMediaQuery` usa o `window.matchMedia` API e adiciona um event listener para detectar mudanças na correspondência da media query
- O event listener é adicionado e removido corretamente para evitar memory leaks
- Para media queries que não mudam frequentemente (como detecção de dispositivo), considere memoizar o resultado com `useMemo`

## Boas Práticas

- Use media queries semânticas que descrevem o propósito em vez de valores específicos
- Combine com outros hooks como `useEffect` para executar ações quando a media query mudar
- Considere criar hooks personalizados baseados em `useMediaQuery` para casos de uso comuns, como `useIsMobile`, `useIsTablet`, etc.
- Prefira a abordagem "mobile-first" ao definir suas media queries
