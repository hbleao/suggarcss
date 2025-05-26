# useOnScreen

O hook `useOnScreen` detecta quando um elemento entra ou sai da viewport, sendo ideal para implementar lazy loading, animações de entrada e infinite scroll.

## Importação

```jsx
import { useOnScreen } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useOnScreen } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function VisibilityDetector() {
  const [ref, isVisible] = useOnScreen();
  
  return (
    <div>
      <Typography variant="title2">Detector de Visibilidade</Typography>
      
      <div style={{ height: '400px', overflow: 'auto', border: '1px solid #ccc', marginTop: '16px' }}>
        <div style={{ height: '800px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body1">Role para baixo para ver o elemento</Typography>
        </div>
        
        <div 
          ref={ref}
          style={{ 
            padding: '24px', 
            background: isVisible ? '#f6ffed' : '#fff2f0',
            transition: 'background-color 0.3s ease',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '400px'
          }}
        >
          <Typography variant="subtitle1">
            Este elemento está {isVisible ? 'visível' : 'fora da viewport'}
          </Typography>
          <Typography variant="body2">
            {isVisible 
              ? 'O elemento entrou na viewport!' 
              : 'Role para baixo para ver este elemento'}
          </Typography>
        </div>
      </div>
    </div>
  );
}
```

## Parâmetros

O hook `useOnScreen` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `options` | `object` | Não | Opções para configurar o comportamento do Intersection Observer |
| `externalRef` | `React.RefObject` | Não | Referência externa para usar em vez de criar uma nova |

### Opções do Intersection Observer

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `root` | `Element` | `null` | Elemento que é usado como viewport para verificar a visibilidade do alvo |
| `rootMargin` | `string` | `'0px'` | Margem ao redor do root, similar a CSS margin |
| `threshold` | `number` ou `number[]` | `0` | Porcentagem do elemento visível necessária para acionar a callback (0-1) |

## Retorno

O hook `useOnScreen` retorna um array com dois elementos:

| Índice | Tipo | Descrição |
|--------|------|-----------|
| `0` | `React.RefObject` | Referência que deve ser anexada ao elemento a ser monitorado |
| `1` | `boolean` | Estado de visibilidade do elemento (true quando visível na viewport) |

## Exemplos

### Lazy Loading de Imagens

```jsx
import React from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useOnScreen } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function LazyImage({ src, alt, width, height }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div 
      ref={ref}
      style={{ 
        width, 
        height, 
        background: '#f0f0f0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {isVisible && (
        <img
          src={src}
          alt={alt}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      {(!isVisible || !isLoaded) && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)'
        }}>
          <Typography variant="caption">Carregando...</Typography>
        </div>
      )}
    </div>
  );
}

function LazyLoadingGallery() {
  // Simulando uma galeria de imagens
  const images = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    src: `https://picsum.photos/500/300?random=${i}`,
    alt: `Imagem ${i + 1}`
  }));
  
  return (
    <div>
      <Typography variant="title2">Galeria com Lazy Loading</Typography>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Role para baixo para carregar as imagens sob demanda
      </Typography>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
        marginTop: '16px'
      }}>
        {images.map(image => (
          <LazyImage
            key={image.id}
            src={image.src}
            alt={image.alt}
            width="100%"
            height="200px"
          />
        ))}
      </div>
    </div>
  );
}
```

### Animações de Entrada

```jsx
import React from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useOnScreen } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function AnimatedSection({ children, direction = 'up', delay = 0 }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(50px)';
        case 'down': return 'translateY(-50px)';
        case 'left': return 'translateX(50px)';
        case 'right': return 'translateX(-50px)';
        default: return 'translateY(50px)';
      }
    }
    return 'translate(0, 0)';
  };
  
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.6s ease, transform 0.6s ease`,
        transitionDelay: `${delay}ms`,
        marginBottom: '24px'
      }}
    >
      {children}
    </div>
  );
}

function AnimatedPage() {
  return (
    <div>
      <Typography variant="title2">Página com Animações de Entrada</Typography>
      <Typography variant="body2" style={{ marginTop: '8px', marginBottom: '32px' }}>
        Role para baixo para ver os elementos animados entrando na tela
      </Typography>
      
      <AnimatedSection>
        <div style={{ padding: '24px', background: '#e6f7ff', borderRadius: '8px' }}>
          <Typography variant="subtitle1">Seção 1</Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Este elemento anima de baixo para cima quando entra na viewport.
          </Typography>
        </div>
      </AnimatedSection>
      
      <AnimatedSection direction="left" delay={200}>
        <div style={{ padding: '24px', background: '#f6ffed', borderRadius: '8px' }}>
          <Typography variant="subtitle1">Seção 2</Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Este elemento anima da direita para a esquerda com um pequeno atraso.
          </Typography>
        </div>
      </AnimatedSection>
      
      <AnimatedSection direction="right" delay={400}>
        <div style={{ padding: '24px', background: '#fff7e6', borderRadius: '8px' }}>
          <Typography variant="subtitle1">Seção 3</Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Este elemento anima da esquerda para a direita com um atraso maior.
          </Typography>
        </div>
      </AnimatedSection>
      
      <AnimatedSection direction="down" delay={600}>
        <div style={{ padding: '24px', background: '#fff0f6', borderRadius: '8px' }}>
          <Typography variant="subtitle1">Seção 4</Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Este elemento anima de cima para baixo com o maior atraso.
          </Typography>
        </div>
      </AnimatedSection>
    </div>
  );
}
```

### Infinite Scroll

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useOnScreen } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function InfiniteScroll() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Referência para o elemento sentinela no final da lista
  const [loaderRef, isLoaderVisible] = useOnScreen({ threshold: 0.5 });
  
  // Função para carregar mais itens
  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulando uma chamada de API com setTimeout
    setTimeout(() => {
      const lastItem = items[items.length - 1];
      const newItems = Array.from({ length: 10 }, (_, i) => lastItem + i + 1);
      
      setItems(prev => [...prev, ...newItems]);
      setIsLoading(false);
      
      // Limitar o número total de itens para demonstração
      if (items.length + newItems.length >= 100) {
        setHasMore(false);
      }
    }, 1500);
  }, [isLoading, hasMore, items]);
  
  // Carregar mais itens quando o loader ficar visível
  useEffect(() => {
    if (isLoaderVisible && hasMore) {
      loadMoreItems();
    }
  }, [isLoaderVisible, loadMoreItems, hasMore]);
  
  return (
    <div>
      <Typography variant="title2">Exemplo de Infinite Scroll</Typography>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Role para baixo para carregar mais itens automaticamente
      </Typography>
      
      <div style={{ marginTop: '16px' }}>
        {items.map(item => (
          <div 
            key={item}
            style={{ 
              padding: '16px', 
              marginBottom: '8px', 
              background: '#f9f9f9',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="subtitle2">Item {item}</Typography>
            <Typography variant="body2">
              Este é o conteúdo do item {item}. Cada item é carregado conforme você rola a página.
            </Typography>
          </div>
        ))}
        
        {/* Elemento sentinela para detectar quando o usuário chegou ao final da lista */}
        <div ref={loaderRef} style={{ height: '20px', margin: '16px 0' }}>
          {isLoading && (
            <Typography variant="body2" style={{ textAlign: 'center' }}>
              Carregando mais itens...
            </Typography>
          )}
          
          {!hasMore && (
            <Typography variant="body2" style={{ textAlign: 'center', color: '#999' }}>
              Não há mais itens para carregar
            </Typography>
          )}
        </div>
      </div>
      
      {!isLoading && hasMore && (
        <Button 
          onClick={loadMoreItems}
          style={{ display: 'block', margin: '0 auto' }}
        >
          Carregar Mais
        </Button>
      )}
    </div>
  );
}
```

### Rastreamento de Métricas de Visualização

```jsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useOnScreen } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ViewTracker({ id, name, onView }) {
  const [hasTracked, setHasTracked] = useState(false);
  const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
  
  useEffect(() => {
    if (isVisible && !hasTracked) {
      onView({ id, name, timestamp: new Date().toISOString() });
      setHasTracked(true);
    }
  }, [isVisible, hasTracked, id, name, onView]);
  
  return (
    <div ref={ref}>
      <div style={{ 
        padding: '24px', 
        background: hasTracked ? '#f6ffed' : '#f9f9f9',
        borderRadius: '8px',
        marginBottom: '16px',
        transition: 'background-color 0.3s ease',
        border: hasTracked ? '1px solid #b7eb8f' : '1px solid #d9d9d9'
      }}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="body2" style={{ marginTop: '8px' }}>
          {hasTracked 
            ? 'Visualização registrada!' 
            : 'Role para visualizar este conteúdo e registrar a visualização'}
        </Typography>
      </div>
    </div>
  );
}

function AnalyticsDemo() {
  const [viewedSections, setViewedSections] = useState([]);
  
  const handleSectionView = (sectionData) => {
    setViewedSections(prev => [...prev, sectionData]);
    
    // Em uma aplicação real, você enviaria estes dados para um serviço de analytics
    console.log('Seção visualizada:', sectionData);
  };
  
  const sections = [
    { id: 1, name: 'Introdução' },
    { id: 2, name: 'Recursos' },
    { id: 3, name: 'Preços' },
    { id: 4, name: 'Depoimentos' },
    { id: 5, name: 'Contato' }
  ];
  
  return (
    <div>
      <Typography variant="title2">Rastreamento de Visualizações</Typography>
      <Typography variant="body2" style={{ marginTop: '8px', marginBottom: '24px' }}>
        Role para baixo para registrar visualizações de cada seção
      </Typography>
      
      {sections.map(section => (
        <ViewTracker
          key={section.id}
          id={section.id}
          name={section.name}
          onView={handleSectionView}
        />
      ))}
      
      <div style={{ marginTop: '32px', padding: '16px', background: '#f0f0f0', borderRadius: '8px' }}>
        <Typography variant="subtitle1">Relatório de Visualizações</Typography>
        
        {viewedSections.length > 0 ? (
          <div style={{ marginTop: '8px' }}>
            <ul style={{ paddingLeft: '20px' }}>
              {viewedSections.map((section, index) => (
                <li key={index}>
                  <Typography variant="body2">
                    {section.name} - {new Date(section.timestamp).toLocaleTimeString()}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Nenhuma seção visualizada ainda.
          </Typography>
        )}
      </div>
    </div>
  );
}
```

## Considerações de Performance

- O hook `useOnScreen` utiliza a API Intersection Observer, que é mais eficiente que verificar a posição do elemento manualmente
- O Intersection Observer opera de forma assíncrona, não bloqueando a thread principal
- Para elementos que aparecem e desaparecem frequentemente da viewport, considere adicionar um pequeno debounce para evitar múltiplas atualizações
- Defina o `threshold` apropriado para sua aplicação - valores mais altos (próximos de 1) exigem que mais do elemento esteja visível

## Boas Práticas

- Use `useOnScreen` para implementar lazy loading de imagens e conteúdo pesado
- Para infinite scroll, combine com gerenciamento de estado para evitar recarregar itens já carregados
- Em animações de entrada, considere desabilitar as animações para usuários que preferem movimento reduzido (`prefers-reduced-motion`)
- Para rastreamento de métricas, considere adicionar um tempo mínimo de visualização antes de registrar o evento
- Lembre-se que o Intersection Observer não é suportado em navegadores muito antigos, então considere um fallback quando necessário
