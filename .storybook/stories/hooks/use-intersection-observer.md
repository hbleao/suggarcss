# useIntersectionObserver

O hook `useIntersectionObserver` detecta quando elementos se tornam visíveis na viewport, utilizando a API Intersection Observer para monitorar de forma eficiente a visibilidade dos elementos.

## Importação

```jsx
import { useIntersectionObserver } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React, { useRef, useState } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useIntersectionObserver } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function IntersectionExample() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useIntersectionObserver(ref, {
    onIntersect: ([entry]) => {
      setIsVisible(entry.isIntersecting);
    }
  });
  
  return (
    <div>
      <Typography variant="title2">Detector de Interseção</Typography>
      
      <div style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc', marginTop: '16px' }}>
        <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            marginBottom: '300px'
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

O hook `useIntersectionObserver` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `elementRef` | `RefObject<Element>` | Sim | Referência ao elemento a ser observado |
| `options` | `object` | Não | Opções para configurar o comportamento do observer |

### Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `root` | `Element \| null` | `null` | Elemento que é usado como viewport para verificar a visibilidade do alvo |
| `rootMargin` | `string` | `'0px'` | Margem ao redor do root, similar a CSS margin |
| `threshold` | `number \| number[]` | `0` | Porcentagem do elemento visível necessária para acionar a callback (0-1) |
| `onIntersect` | `(entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void` | - | Callback executada quando o estado de interseção muda |
| `enabled` | `boolean` | `true` | Se o observer está ativo |

## Exemplos

### Lazy Loading de Componentes

```jsx
import React, { useRef, useState } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useIntersectionObserver } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

// Componente que será carregado sob demanda
function HeavyComponent() {
  // Simulando um componente pesado
  return (
    <div style={{ 
      padding: '24px',
      background: '#f0f5ff',
      borderRadius: '8px',
      border: '1px solid #d9d9d9'
    }}>
      <Typography variant="subtitle1">Componente Carregado</Typography>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Este componente foi carregado apenas quando se tornou visível na viewport.
      </Typography>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        marginTop: '16px'
      }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index}
            style={{ 
              background: `hsl(${index * 60}, 70%, 80%)`,
              padding: '16px',
              borderRadius: '4px',
              textAlign: 'center'
            }}
          >
            <Typography variant="body2">Item {index + 1}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

function LazyLoadComponent() {
  const [components, setComponents] = useState(
    Array.from({ length: 5 }).map(() => ({ loaded: false }))
  );
  
  return (
    <div>
      <Typography variant="title2">Lazy Loading de Componentes</Typography>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Role para baixo para carregar os componentes sob demanda
      </Typography>
      
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '300px' }}>
        {components.map((component, index) => (
          <LazyItem 
            key={index}
            index={index}
            onVisible={() => {
              setComponents(prev => {
                const newComponents = [...prev];
                newComponents[index].loaded = true;
                return newComponents;
              });
            }}
            isLoaded={component.loaded}
          />
        ))}
      </div>
    </div>
  );
}

function LazyItem({ index, onVisible, isLoaded }) {
  const ref = useRef(null);
  
  useIntersectionObserver(ref, {
    onIntersect: ([entry]) => {
      if (entry.isIntersecting && !isLoaded) {
        onVisible();
      }
    },
    threshold: 0.1
  });
  
  return (
    <div ref={ref}>
      {!isLoaded ? (
        <div style={{ 
          padding: '24px',
          background: '#f5f5f5',
          borderRadius: '8px',
          border: '1px solid #d9d9d9',
          textAlign: 'center'
        }}>
          <Typography variant="subtitle1">Componente {index + 1}</Typography>
          <Typography variant="body2" style={{ color: '#8c8c8c', marginTop: '8px' }}>
            Role para carregar este componente
          </Typography>
        </div>
      ) : (
        <div>
          <Typography variant="caption" style={{ display: 'block', marginBottom: '8px' }}>
            Componente {index + 1}:
          </Typography>
          <HeavyComponent />
        </div>
      )}
    </div>
  );
}
```

### Infinite Scroll

```jsx
import React, { useRef, useState, useCallback } from 'react';
import { Typography, Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useIntersectionObserver } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function InfiniteScrollExample() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  
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
  
  useIntersectionObserver(loaderRef, {
    onIntersect: ([entry]) => {
      if (entry.isIntersecting && hasMore && !isLoading) {
        loadMoreItems();
      }
    },
    threshold: 0.5,
    enabled: hasMore && !isLoading
  });
  
  return (
    <div>
      <Typography variant="title2">Infinite Scroll</Typography>
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

### Animações de Entrada

```jsx
import React, { useRef } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useIntersectionObserver } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function AnimatedSection({ children, direction = 'up', delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useIntersectionObserver(ref, {
    onIntersect: ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    threshold: 0.1,
    // Uma vez que o elemento se torna visível, não precisamos mais observá-lo
    enabled: !isVisible
  });
  
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
      <Typography variant="title2">Animações de Entrada</Typography>
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

### Rastreamento de Métricas de Visualização

```jsx
import React, { useRef, useState } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useIntersectionObserver } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ViewTracker({ id, name, onView }) {
  const ref = useRef(null);
  const [hasTracked, setHasTracked] = useState(false);
  
  useIntersectionObserver(ref, {
    onIntersect: ([entry]) => {
      if (entry.isIntersecting && !hasTracked) {
        onView({ id, name, timestamp: new Date().toISOString() });
        setHasTracked(true);
      }
    },
    threshold: 0.5,
    enabled: !hasTracked
  });
  
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
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '200px' }}>
        {sections.map(section => (
          <ViewTracker
            key={section.id}
            id={section.id}
            name={section.name}
            onView={handleSectionView}
          />
        ))}
      </div>
      
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

- O hook `useIntersectionObserver` utiliza a API Intersection Observer, que é mais eficiente que verificar a posição do elemento manualmente
- O Intersection Observer opera de forma assíncrona, não bloqueando a thread principal
- Use a opção `enabled: false` quando não precisar mais observar o elemento (por exemplo, após uma animação de entrada)
- Defina o `threshold` apropriado para sua aplicação - valores mais altos (próximos de 1) exigem que mais do elemento esteja visível
- Para elementos que aparecem e desaparecem frequentemente da viewport, considere adicionar um pequeno debounce para evitar múltiplas atualizações

## Boas Práticas

- Use `useIntersectionObserver` para implementar lazy loading de imagens, vídeos e componentes pesados
- Para infinite scroll, combine com gerenciamento de estado para evitar recarregar itens já carregados
- Em animações de entrada, considere desabilitar as animações para usuários que preferem movimento reduzido (`prefers-reduced-motion`)
- Para rastreamento de métricas, considere adicionar um tempo mínimo de visualização antes de registrar o evento
- Lembre-se que o Intersection Observer não é suportado em navegadores muito antigos, então considere um fallback quando necessário
- Use a opção `rootMargin` para carregar conteúdo antes que ele entre na viewport, proporcionando uma experiência mais fluida
