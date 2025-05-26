# useEventListener

O hook `useEventListener` simplifica a adição e remoção de event listeners, gerenciando automaticamente o ciclo de vida dos listeners e evitando memory leaks.

## Importação

```jsx
import { useEventListener } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React, { useState, useRef } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useEventListener } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function KeyPressExample() {
  const [lastKey, setLastKey] = useState('');
  
  // Adiciona um event listener ao documento para o evento 'keydown'
  useEventListener('keydown', (event) => {
    setLastKey(event.key);
  });
  
  return (
    <div>
      <Typography variant="title2">Detector de Teclas</Typography>
      
      <Typography variant="body1" style={{ marginTop: '16px' }}>
        Pressione qualquer tecla para detectar
      </Typography>
      
      {lastKey && (
        <div style={{ 
          marginTop: '24px',
          padding: '24px',
          background: '#f0f0f0',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <Typography variant="title1">{lastKey}</Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Última tecla pressionada
          </Typography>
        </div>
      )}
    </div>
  );
}
```

## Parâmetros

O hook `useEventListener` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `eventName` | `string` | Sim | Nome do evento a ser escutado (ex: 'click', 'keydown') |
| `handler` | `(event: Event) => void` | Sim | Função de callback a ser executada quando o evento ocorrer |
| `element` | `RefObject<T> \| T \| Window \| Document \| null` | Não | Elemento ao qual o evento será anexado (padrão: `window`) |
| `options` | `AddEventListenerOptions` | Não | Opções adicionais para o addEventListener |

## Exemplos

### Monitorando Cliques em um Elemento Específico

```jsx
import React, { useRef, useState } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useEventListener } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ClickTracker() {
  const boxRef = useRef(null);
  const [clicks, setClicks] = useState([]);
  
  // Monitora cliques apenas dentro do elemento referenciado
  useEventListener('click', (event) => {
    const rect = boxRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setClicks(prev => [...prev, { x, y, time: new Date().toLocaleTimeString() }].slice(-5));
  }, boxRef);
  
  return (
    <div>
      <Typography variant="title2">Rastreador de Cliques</Typography>
      
      <div 
        ref={boxRef}
        style={{ 
          marginTop: '16px',
          width: '100%',
          height: '200px',
          background: '#f0f0f0',
          border: '1px solid #d9d9d9',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="body2" 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            opacity: 0.7
          }}
        >
          Clique em qualquer lugar desta área
        </Typography>
        
        {clicks.map((click, index) => (
          <div 
            key={index}
            style={{
              position: 'absolute',
              left: `${click.x}px`,
              top: `${click.y}px`,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: 'rgba(24, 144, 255, 0.6)',
              transform: 'translate(-50%, -50%)',
              animation: 'pulse 1.5s infinite',
              zIndex: index
            }}
          />
        ))}
      </div>
      
      {clicks.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <Typography variant="subtitle2">Últimos cliques:</Typography>
          
          <ul style={{ paddingLeft: '20px' }}>
            {clicks.map((click, index) => (
              <li key={index}>
                <Typography variant="body2">
                  Posição: ({Math.round(click.x)}, {Math.round(click.y)}) - Hora: {click.time}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
```

### Formulário com Salvamento Automático

```jsx
import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useEventListener } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function AutoSaveForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  
  const [lastSaved, setLastSaved] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  
  // Carregar dados salvos ao iniciar
  useEffect(() => {
    const savedData = localStorage.getItem('autosave-form');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.data);
        setLastSaved(new Date(parsed.timestamp));
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }
  }, []);
  
  // Função para salvar os dados
  const saveData = () => {
    const saveObject = {
      data: formData,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('autosave-form', JSON.stringify(saveObject));
    setLastSaved(new Date());
    setIsDirty(false);
  };
  
  // Salvar ao pressionar Ctrl+S
  useEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault(); // Previne o comportamento padrão do navegador
      saveData();
    }
  });
  
  // Salvar antes de sair da página se houver alterações
  useEventListener('beforeunload', (event) => {
    if (isDirty) {
      event.preventDefault();
      event.returnValue = 'Você tem alterações não salvas. Tem certeza que deseja sair?';
      return event.returnValue;
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };
  
  // Salvar automaticamente após 3 segundos de inatividade
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        saveData();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [formData, isDirty]);
  
  return (
    <div>
      <Typography variant="title2">Formulário com Salvamento Automático</Typography>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px'
      }}>
        <Typography variant="subtitle1">Editor de Documento</Typography>
        
        {lastSaved && (
          <Typography variant="caption" style={{ color: '#8c8c8c' }}>
            Último salvamento: {lastSaved.toLocaleTimeString()}
          </Typography>
        )}
      </div>
      
      <div style={{ marginTop: '16px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '4px' }}>
            <Typography variant="body2">Título</Typography>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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
          <label htmlFor="content" style={{ display: 'block', marginBottom: '4px' }}>
            <Typography variant="body2">Conteúdo</Typography>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={saveData} disabled={!isDirty}>
            Salvar Agora
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={() => {
              localStorage.removeItem('autosave-form');
              setFormData({ title: '', content: '' });
              setLastSaved(null);
              setIsDirty(false);
            }}
          >
            Limpar Tudo
          </Button>
        </div>
      </div>
      
      <div style={{ marginTop: '16px', padding: '12px', background: '#f6ffed', borderRadius: '4px' }}>
        <Typography variant="body2">
          <strong>Dicas:</strong>
        </Typography>
        <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
          <li>
            <Typography variant="body2">
              O conteúdo é salvo automaticamente após 3 segundos de inatividade
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Pressione Ctrl+S (ou Cmd+S) para salvar manualmente
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Você receberá um alerta se tentar sair com alterações não salvas
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  );
}
```

### Detector de Inatividade

```jsx
import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@porto/js-library-corp-hubv-porto-ocean';
import { useEventListener } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function InactivityDetector() {
  const [lastActivity, setLastActivity] = useState(new Date());
  const [isInactive, setIsInactive] = useState(false);
  const [timeoutDuration, setTimeoutDuration] = useState(10); // segundos
  const [timeLeft, setTimeLeft] = useState(timeoutDuration);
  
  // Atualiza o timestamp da última atividade para vários eventos
  const updateActivity = () => {
    setLastActivity(new Date());
    if (isInactive) {
      setIsInactive(false);
    }
  };
  
  // Monitora eventos de atividade do usuário
  useEventListener('mousemove', updateActivity);
  useEventListener('mousedown', updateActivity);
  useEventListener('keydown', updateActivity);
  useEventListener('touchstart', updateActivity);
  useEventListener('scroll', updateActivity);
  
  // Verifica inatividade e atualiza contador
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const inactiveTime = (now - lastActivity) / 1000; // em segundos
      
      if (!isInactive) {
        setTimeLeft(Math.max(0, Math.floor(timeoutDuration - inactiveTime)));
        
        if (inactiveTime >= timeoutDuration) {
          setIsInactive(true);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [lastActivity, isInactive, timeoutDuration]);
  
  // Função para alterar a duração do timeout
  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value, 10);
    setTimeoutDuration(newDuration);
    setTimeLeft(newDuration);
    updateActivity(); // Reseta o timer
  };
  
  return (
    <div>
      <Typography variant="title2">Detector de Inatividade</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography variant="body1">Timeout de inatividade:</Typography>
          <select 
            value={timeoutDuration} 
            onChange={handleDurationChange}
            style={{ 
              padding: '4px 8px', 
              borderRadius: '4px',
              border: '1px solid #d9d9d9'
            }}
          >
            <option value="5">5 segundos</option>
            <option value="10">10 segundos</option>
            <option value="30">30 segundos</option>
            <option value="60">1 minuto</option>
          </select>
        </div>
        
        <div style={{ 
          marginTop: '24px',
          padding: '24px',
          background: isInactive ? '#fff1f0' : '#f6ffed',
          borderRadius: '8px',
          textAlign: 'center',
          transition: 'background-color 0.3s ease'
        }}>
          {isInactive ? (
            <>
              <Typography variant="title1" style={{ color: '#cf1322' }}>
                Inatividade Detectada!
              </Typography>
              <Typography variant="body1" style={{ marginTop: '8px' }}>
                Você está inativo há mais de {timeoutDuration} segundos.
              </Typography>
              <Button 
                onClick={updateActivity}
                style={{ marginTop: '16px' }}
              >
                Continuar Sessão
              </Button>
            </>
          ) : (
            <>
              <Typography variant="title1" style={{ color: '#52c41a' }}>
                Sessão Ativa
              </Typography>
              <Typography variant="body1" style={{ marginTop: '8px' }}>
                Timeout em: {timeLeft} segundos
              </Typography>
              <div 
                style={{ 
                  marginTop: '16px',
                  height: '4px',
                  background: '#d9d9d9',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  style={{ 
                    height: '100%',
                    width: `${(timeLeft / timeoutDuration) * 100}%`,
                    background: '#52c41a',
                    transition: 'width 1s linear'
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <Typography variant="subtitle2">Última atividade:</Typography>
        <Typography variant="body2">
          {lastActivity.toLocaleTimeString()}
        </Typography>
      </div>
      
      <div style={{ marginTop: '16px', padding: '12px', background: '#e6f7ff', borderRadius: '4px' }}>
        <Typography variant="body2">
          <strong>Nota:</strong> Em uma aplicação real, este detector poderia ser usado para:
        </Typography>
        <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
          <li>
            <Typography variant="body2">
              Encerrar sessões por inatividade
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Salvar automaticamente o trabalho não salvo
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Exibir um screensaver ou modo de economia de energia
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  );
}
```

### Monitoramento de Redimensionamento de Elementos

```jsx
import React, { useRef, useState } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useEventListener } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function ResizeObserver() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [resizing, setResizing] = useState(false);
  
  // Função para atualizar as dimensões
  const updateDimensions = () => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  };
  
  // Inicializa as dimensões quando o componente monta
  useEffect(() => {
    updateDimensions();
  }, []);
  
  // Monitora o redimensionamento da janela
  useEventListener('resize', () => {
    updateDimensions();
  });
  
  // Implementa o redimensionamento manual
  const startResize = (e) => {
    e.preventDefault();
    setResizing(true);
  };
  
  useEventListener('mousemove', (e) => {
    if (resizing && containerRef.current) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Calcula as novas dimensões baseadas na posição do mouse
      const newWidth = Math.max(200, e.clientX - rect.left);
      const newHeight = Math.max(100, e.clientY - rect.top);
      
      // Atualiza o estilo do container
      container.style.width = `${newWidth}px`;
      container.style.height = `${newHeight}px`;
      
      // Atualiza o estado
      setDimensions({ width: newWidth, height: newHeight });
    }
  });
  
  useEventListener('mouseup', () => {
    if (resizing) {
      setResizing(false);
    }
  });
  
  return (
    <div>
      <Typography variant="title2">Monitor de Redimensionamento</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <div 
          ref={containerRef}
          style={{ 
            width: '100%',
            height: '200px',
            background: '#f0f0f0',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            padding: '16px',
            position: 'relative',
            resize: 'both',
            overflow: 'auto'
          }}
        >
          <Typography variant="body1">
            Elemento Redimensionável
          </Typography>
          
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Você pode redimensionar este elemento arrastando o canto inferior direito ou usando o controle de redimensionamento do navegador.
          </Typography>
          
          <div style={{ 
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: '#1890ff',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            cursor: 'nwse-resize',
            opacity: 0.7
          }}
          onMouseDown={startResize}
          />
        </div>
        
        <div style={{ 
          marginTop: '16px',
          padding: '12px',
          background: '#e6f7ff',
          borderRadius: '4px'
        }}>
          <Typography variant="subtitle2">Dimensões Atuais:</Typography>
          <Typography variant="body2">
            Largura: {Math.round(dimensions.width)}px
          </Typography>
          <Typography variant="body2">
            Altura: {Math.round(dimensions.height)}px
          </Typography>
        </div>
      </div>
    </div>
  );
}
```

## Considerações de Performance

- O hook `useEventListener` utiliza `useCallback` internamente para memoizar a função handler, evitando re-renderizações desnecessárias
- Para eventos que disparam com alta frequência (como 'mousemove', 'scroll', 'resize'), considere implementar técnicas de throttling ou debouncing para limitar o número de chamadas
- O hook gerencia automaticamente a limpeza dos event listeners quando o componente é desmontado, evitando memory leaks
- Para melhor performance, passe uma referência estável para o elemento alvo, como uma ref criada com `useRef`

## Boas Práticas

- Use `useEventListener` para substituir a adição manual de event listeners com `addEventListener` e `removeEventListener`
- Prefira anexar event listeners a elementos específicos em vez do `window` ou `document` quando possível, para melhor performance e escopo
- Combine com outros hooks como `useCallback` para memoizar funções de callback complexas
- Para eventos de teclado globais, considere verificar se o foco está em um elemento de entrada antes de processar o evento
- Use as opções do `addEventListener` (como `passive: true`) para eventos de toque em interfaces móveis, melhorando a performance de rolagem
- Para eventos personalizados, certifique-se de que eles são disparados corretamente e considere usar uma biblioteca de gerenciamento de eventos se necessário
