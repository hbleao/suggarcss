# useWindowSize

O hook `useWindowSize` monitora as dimensões da janela do navegador em tempo real, retornando largura e altura atualizadas automaticamente quando o tamanho da janela muda.

## Importação

```jsx
import { useWindowSize } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React from 'react';
import { useWindowSize } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      <h2>Tamanho da Janela</h2>
      <p>Largura: {width}px</p>
      <p>Altura: {height}px</p>
      <p>Redimensione a janela para ver os valores mudarem em tempo real.</p>
    </div>
  );
}
```

## Retorno

O hook `useWindowSize` retorna um objeto com as seguintes propriedades:

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `width` | `number` | Largura atual da janela em pixels |
| `height` | `number` | Altura atual da janela em pixels |

## Exemplos

### Layout Responsivo Baseado no Tamanho da Janela

```jsx
import React from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useWindowSize } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ResponsiveLayout() {
  const { width } = useWindowSize();
  
  // Definindo breakpoints
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  
  return (
    <div>
      <Typography variant="title2">Layout Responsivo</Typography>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: '16px',
        marginTop: '16px'
      }}>
        <div style={{ 
          flex: isDesktop ? 2 : 1,
          padding: '16px',
          background: '#f0f0f0',
          borderRadius: '8px'
        }}>
          <Typography variant="subtitle1">Conteúdo Principal</Typography>
          <Typography variant="body2">
            Este painel ocupa {isDesktop ? '2/3' : isMobile ? '100%' : '50%'} do espaço disponível,
            dependendo do tamanho da tela.
          </Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Largura atual: {width}px
          </Typography>
        </div>
        
        <div style={{ 
          flex: 1,
          padding: '16px',
          background: '#e6f7ff',
          borderRadius: '8px',
          display: isMobile && width < 480 ? 'none' : 'block'
        }}>
          <Typography variant="subtitle1">Barra Lateral</Typography>
          <Typography variant="body2">
            Esta barra lateral se adapta ao tamanho da tela e pode desaparecer
            em telas muito pequenas.
          </Typography>
        </div>
      </div>
      
      {isMobile && width < 480 && (
        <Typography variant="caption" style={{ marginTop: '8px', color: '#ff4d4f' }}>
          Barra lateral ocultada devido ao tamanho reduzido da tela.
        </Typography>
      )}
    </div>
  );
}
```

### Grid Responsivo

```jsx
import React from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useWindowSize } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ResponsiveGrid() {
  const { width } = useWindowSize();
  
  // Calculando o número de colunas com base na largura
  const getColumns = () => {
    if (width < 576) return 1;
    if (width < 768) return 2;
    if (width < 992) return 3;
    if (width < 1200) return 4;
    return 5;
  };
  
  const columns = getColumns();
  
  // Criando itens de exemplo para o grid
  const items = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    color: `hsl(${index * 36}, 70%, 80%)`
  }));
  
  return (
    <div>
      <Typography variant="title2">Grid Responsivo</Typography>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Largura atual: {width}px | Colunas: {columns}
      </Typography>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
        marginTop: '16px'
      }}>
        {items.map(item => (
          <div key={item.id} style={{ 
            background: item.color,
            padding: '24px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <Typography variant="subtitle2">{item.title}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Adaptação de Componentes Baseada no Tamanho

```jsx
import React from 'react';
import { Typography, Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useWindowSize } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function AdaptiveComponents() {
  const { width, height } = useWindowSize();
  
  // Adaptando componentes com base no tamanho
  const getFontSize = () => {
    if (width < 768) return '14px';
    if (width < 1200) return '16px';
    return '18px';
  };
  
  const getButtonSize = () => {
    if (width < 576) return 'small';
    if (width < 992) return 'medium';
    return 'large';
  };
  
  const isCompactMode = width < 768 || height < 600;
  
  return (
    <div>
      <Typography 
        variant="title2" 
        style={{ fontSize: getFontSize() }}
      >
        Componentes Adaptativos
      </Typography>
      
      <div style={{ 
        marginTop: '16px',
        padding: isCompactMode ? '12px' : '24px',
        background: '#f9f9f9',
        borderRadius: '8px',
        transition: 'all 0.3s ease'
      }}>
        <Typography variant="body1" style={{ fontSize: getFontSize() }}>
          Este componente se adapta ao tamanho da janela.
          {isCompactMode && ' Modo compacto ativado.'}
        </Typography>
        
        <div style={{ 
          display: 'flex',
          flexDirection: width < 576 ? 'column' : 'row',
          gap: '8px',
          marginTop: '16px'
        }}>
          <Button size={getButtonSize()}>Botão Primário</Button>
          <Button 
            variant="secondary" 
            size={getButtonSize()}
          >
            Botão Secundário
          </Button>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <Typography variant="caption">
            Dimensões atuais: {width}px × {height}px
          </Typography>
        </div>
      </div>
    </div>
  );
}
```

### Detecção de Orientação

```jsx
import React from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useWindowSize } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function OrientationDetector() {
  const { width, height } = useWindowSize();
  
  const isLandscape = width > height;
  const aspectRatio = (width / height).toFixed(2);
  
  return (
    <div>
      <Typography variant="title2">Detector de Orientação</Typography>
      
      <div style={{ 
        marginTop: '16px',
        padding: '16px',
        background: isLandscape ? '#e6f7ff' : '#fff0f6',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease'
      }}>
        <Typography variant="subtitle1">
          Orientação: {isLandscape ? 'Paisagem' : 'Retrato'}
        </Typography>
        
        <Typography variant="body2" style={{ marginTop: '8px' }}>
          Dimensões: {width}px × {height}px
        </Typography>
        
        <Typography variant="body2">
          Proporção: {aspectRatio}
        </Typography>
        
        <div style={{ 
          marginTop: '16px',
          width: '100%',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #ccc',
          borderRadius: '4px'
        }}>
          <div style={{ 
            width: isLandscape ? '160px' : '90px',
            height: isLandscape ? '90px' : '160px',
            background: isLandscape ? '#1890ff' : '#f5317f',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}>
            <Typography 
              variant="body2" 
              style={{ color: 'white', textAlign: 'center' }}
            >
              {isLandscape ? 'Modo Paisagem' : 'Modo Retrato'}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Considerações de Performance

- O hook `useWindowSize` adiciona um event listener para o evento `resize` da janela
- O event listener é removido corretamente quando o componente é desmontado para evitar memory leaks
- Para evitar atualizações excessivas durante o redimensionamento, considere combinar este hook com `useDebouncedValue` para limitar a frequência de atualizações

```jsx
import React from 'react';
import { useWindowSize, useDebouncedValue } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function OptimizedSizeMonitor() {
  const { width, height } = useWindowSize();
  
  // Debounce os valores para melhorar a performance durante redimensionamentos
  const debouncedWidth = useDebouncedValue(width, 200);
  const debouncedHeight = useDebouncedValue(height, 200);
  
  return (
    <div>
      <h2>Monitor de Tamanho Otimizado</h2>
      <p>Largura (tempo real): {width}px</p>
      <p>Altura (tempo real): {height}px</p>
      <p>Largura (debounced): {debouncedWidth}px</p>
      <p>Altura (debounced): {debouncedHeight}px</p>
    </div>
  );
}
```

## Boas Práticas

- Use `useWindowSize` para criar layouts e componentes que se adaptam dinamicamente ao tamanho da janela
- Combine com outros hooks como `useEffect` para executar ações quando o tamanho da janela mudar
- Defina breakpoints consistentes em toda a sua aplicação para manter uma experiência de usuário coesa
- Considere a performance em dispositivos móveis, onde eventos de redimensionamento podem ocorrer durante a rolagem (por exemplo, quando a barra de endereço do navegador aparece/desaparece)
- Para aplicações complexas, considere usar este hook em um contexto React para disponibilizar o tamanho da janela para toda a árvore de componentes
