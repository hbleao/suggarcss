# useCopyToClipboard

O hook `useCopyToClipboard` facilita a cópia de texto para a área de transferência do usuário, fornecendo feedback sobre o sucesso ou falha da operação.

## Importação

```jsx
import { useCopyToClipboard } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React, { useState } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCopyToClipboard } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function CopyExample() {
  const [value, copy, { success, error }] = useCopyToClipboard();
  const textToCopy = 'Este texto será copiado para a área de transferência!';
  
  return (
    <div>
      <Typography variant="title2">Exemplo de Cópia</Typography>
      
      <div style={{ 
        padding: '16px', 
        background: '#f5f5f5', 
        borderRadius: '4px',
        marginTop: '16px'
      }}>
        <Typography variant="body2">{textToCopy}</Typography>
      </div>
      
      <Button 
        onClick={() => copy(textToCopy)}
        style={{ marginTop: '16px' }}
      >
        Copiar Texto
      </Button>
      
      {success && (
        <Typography 
          variant="body2" 
          style={{ color: '#52c41a', marginTop: '8px' }}
        >
          Texto copiado com sucesso!
        </Typography>
      )}
      
      {error && (
        <Typography 
          variant="body2" 
          style={{ color: '#f5222d', marginTop: '8px' }}
        >
          Erro ao copiar: {error.message}
        </Typography>
      )}
      
      {value && (
        <div style={{ marginTop: '16px' }}>
          <Typography variant="subtitle2">Valor copiado:</Typography>
          <Typography variant="body2">{value}</Typography>
        </div>
      )}
    </div>
  );
}
```

## Retorno

O hook `useCopyToClipboard` retorna um array com três elementos:

| Índice | Tipo | Descrição |
|--------|------|-----------|
| `0` | `string \| null` | O último valor copiado com sucesso |
| `1` | `(text: string) => Promise<boolean>` | Função para copiar texto para a área de transferência |
| `2` | `{ success: boolean, error: Error \| null }` | Estado da última operação de cópia |

## Exemplos

### Botão de Cópia com Feedback Visual

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCopyToClipboard } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function CopyButton({ text, label = 'Copiar' }) {
  const [, copy, { success, error }] = useCopyToClipboard();
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Mostrar feedback por 2 segundos
  useEffect(() => {
    if (success || error) {
      setShowFeedback(true);
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [success, error]);
  
  return (
    <Button
      onClick={() => copy(text)}
      variant={success ? 'primary' : 'secondary'}
      style={{ 
        minWidth: '100px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {showFeedback ? (
        success ? (
          <span style={{ color: '#fff' }}>Copiado! ✓</span>
        ) : (
          <span style={{ color: '#ff4d4f' }}>Erro ✗</span>
        )
      ) : (
        label
      )}
      
      {success && showFeedback && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background: 'rgba(82, 196, 26, 0.2)',
            animation: 'fadeOut 2s forwards'
          }}
        />
      )}
      
      <style jsx>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </Button>
  );
}

function EnhancedCopyExample() {
  const codeSnippet = `function hello() {
  console.log('Olá, mundo!');
}`;

  const url = 'https://exemplo.com/pagina-importante';
  
  return (
    <div>
      <Typography variant="title2">Botões de Cópia Aprimorados</Typography>
      
      <div style={{ marginTop: '24px' }}>
        <Typography variant="subtitle1">Trecho de Código</Typography>
        <div style={{ 
          padding: '16px', 
          background: '#f5f5f5', 
          borderRadius: '4px',
          marginTop: '8px',
          fontFamily: 'monospace',
          position: 'relative'
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{codeSnippet}</pre>
          <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
            <CopyButton text={codeSnippet} />
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <Typography variant="subtitle1">Link Compartilhável</Typography>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '8px'
        }}>
          <input
            type="text"
            value={url}
            readOnly
            style={{ 
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d9d9d9'
            }}
          />
          <CopyButton text={url} label="Copiar URL" />
        </div>
      </div>
    </div>
  );
}
```

### Cópia de Texto Formatado

```jsx
import React, { useState } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCopyToClipboard } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function FormattedTextCopy() {
  const [, copy, { success, error }] = useCopyToClipboard();
  const [selectedFormat, setSelectedFormat] = useState('plain');
  
  const data = {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    phone: '(11) 98765-4321',
    address: 'Av. Paulista, 1000, São Paulo - SP'
  };
  
  const formats = {
    plain: `${data.name}
${data.email}
${data.phone}
${data.address}`,
    
    html: `<div>
  <h3>${data.name}</h3>
  <p>Email: <a href="mailto:${data.email}">${data.email}</a></p>
  <p>Telefone: ${data.phone}</p>
  <p>Endereço: ${data.address}</p>
</div>`,
    
    markdown: `### ${data.name}
- Email: ${data.email}
- Telefone: ${data.phone}
- Endereço: ${data.address}`,
    
    json: JSON.stringify(data, null, 2)
  };
  
  const handleCopy = () => {
    copy(formats[selectedFormat]);
  };
  
  return (
    <div>
      <Typography variant="title2">Cópia de Texto Formatado</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <Typography variant="subtitle2">Selecione o formato:</Typography>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Button 
            variant={selectedFormat === 'plain' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedFormat('plain')}
          >
            Texto Simples
          </Button>
          
          <Button 
            variant={selectedFormat === 'html' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedFormat('html')}
          >
            HTML
          </Button>
          
          <Button 
            variant={selectedFormat === 'markdown' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedFormat('markdown')}
          >
            Markdown
          </Button>
          
          <Button 
            variant={selectedFormat === 'json' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedFormat('json')}
          >
            JSON
          </Button>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '16px',
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '4px',
        fontFamily: selectedFormat === 'json' || selectedFormat === 'html' ? 'monospace' : 'inherit',
        whiteSpace: 'pre-wrap'
      }}>
        {formats[selectedFormat]}
      </div>
      
      <Button 
        onClick={handleCopy}
        style={{ marginTop: '16px' }}
      >
        Copiar como {
          selectedFormat === 'plain' ? 'Texto Simples' :
          selectedFormat === 'html' ? 'HTML' :
          selectedFormat === 'markdown' ? 'Markdown' : 'JSON'
        }
      </Button>
      
      {success && (
        <Typography 
          variant="body2" 
          style={{ color: '#52c41a', marginTop: '8px' }}
        >
          Conteúdo copiado com sucesso no formato {
            selectedFormat === 'plain' ? 'Texto Simples' :
            selectedFormat === 'html' ? 'HTML' :
            selectedFormat === 'markdown' ? 'Markdown' : 'JSON'
          }!
        </Typography>
      )}
      
      {error && (
        <Typography 
          variant="body2" 
          style={{ color: '#f5222d', marginTop: '8px' }}
        >
          Erro ao copiar: {error.message}
        </Typography>
      )}
    </div>
  );
}
```

### Cópia de Múltiplos Itens

```jsx
import React, { useState } from 'react';
import { Button, Typography, Checkbox } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCopyToClipboard } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function MultiItemCopy() {
  const [, copy, { success, error }] = useCopyToClipboard();
  
  const items = [
    { id: 1, name: 'Item 1', description: 'Descrição do item 1' },
    { id: 2, name: 'Item 2', description: 'Descrição do item 2' },
    { id: 3, name: 'Item 3', description: 'Descrição do item 3' },
    { id: 4, name: 'Item 4', description: 'Descrição do item 4' },
    { id: 5, name: 'Item 5', description: 'Descrição do item 5' }
  ];
  
  const [selectedItems, setSelectedItems] = useState({});
  
  const toggleItem = (id) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const selectAll = () => {
    const newSelected = {};
    items.forEach(item => {
      newSelected[item.id] = true;
    });
    setSelectedItems(newSelected);
  };
  
  const deselectAll = () => {
    setSelectedItems({});
  };
  
  const getSelectedItemsText = () => {
    return items
      .filter(item => selectedItems[item.id])
      .map(item => `${item.name}: ${item.description}`)
      .join('\n');
  };
  
  const handleCopy = () => {
    const text = getSelectedItemsText();
    if (text) {
      copy(text);
    }
  };
  
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;
  
  return (
    <div>
      <Typography variant="title2">Cópia de Múltiplos Itens</Typography>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px'
      }}>
        <Typography variant="subtitle2">
          Selecione os itens para copiar ({selectedCount} selecionados)
        </Typography>
        
        <div>
          <Button 
            size="small" 
            variant="secondary"
            onClick={selectAll}
            style={{ marginRight: '8px' }}
          >
            Selecionar Todos
          </Button>
          
          <Button 
            size="small" 
            variant="secondary"
            onClick={deselectAll}
            disabled={selectedCount === 0}
          >
            Limpar
          </Button>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '8px',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        {items.map((item, index) => (
          <div 
            key={item.id}
            style={{ 
              padding: '12px 16px',
              borderBottom: index < items.length - 1 ? '1px solid #d9d9d9' : 'none',
              background: selectedItems[item.id] ? '#e6f7ff' : 'white',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Checkbox
              checked={!!selectedItems[item.id]}
              onChange={() => toggleItem(item.id)}
              style={{ marginRight: '12px' }}
            />
            
            <div>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2" style={{ color: '#666' }}>
                {item.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={handleCopy}
        disabled={selectedCount === 0}
        style={{ marginTop: '16px' }}
      >
        Copiar {selectedCount} {selectedCount === 1 ? 'Item' : 'Itens'} Selecionados
      </Button>
      
      {success && (
        <Typography 
          variant="body2" 
          style={{ color: '#52c41a', marginTop: '8px' }}
        >
          {selectedCount} {selectedCount === 1 ? 'item copiado' : 'itens copiados'} com sucesso!
        </Typography>
      )}
      
      {error && (
        <Typography 
          variant="body2" 
          style={{ color: '#f5222d', marginTop: '8px' }}
        >
          Erro ao copiar: {error.message}
        </Typography>
      )}
    </div>
  );
}
```

### Integração com Componentes de Código

```jsx
import React, { useState } from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useCopyToClipboard } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function CodeSnippet({ code, language }) {
  const [, copy, { success }] = useCopyToClipboard();
  const [showCopied, setShowCopied] = useState(false);
  
  const handleCopy = () => {
    copy(code);
    setShowCopied(true);
    
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };
  
  return (
    <div style={{ 
      position: 'relative',
      marginBottom: '16px'
    }}>
      <div style={{ 
        padding: '8px 12px',
        background: '#f0f0f0',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #d9d9d9'
      }}>
        <Typography variant="caption" style={{ textTransform: 'uppercase' }}>
          {language}
        </Typography>
        
        <Button 
          size="small" 
          variant="secondary"
          onClick={handleCopy}
        >
          {showCopied ? 'Copiado! ✓' : 'Copiar'}
        </Button>
      </div>
      
      <pre style={{ 
        margin: 0,
        padding: '16px',
        background: '#f5f5f5',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        overflow: 'auto',
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: 1.5
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CodeExamples() {
  const examples = {
    javascript: `function sum(a, b) {
  return a + b;
}

console.log(sum(5, 3)); // 8`,
    
    css: `.button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #40a9ff;
}`,
    
    html: `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exemplo</title>
</head>
<body>
  <h1>Olá, Mundo!</h1>
  <p>Este é um exemplo de HTML.</p>
</body>
</html>`
  };
  
  return (
    <div>
      <Typography variant="title2">Exemplos de Código com Cópia</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <Typography variant="subtitle1">JavaScript</Typography>
        <CodeSnippet code={examples.javascript} language="javascript" />
        
        <Typography variant="subtitle1">CSS</Typography>
        <CodeSnippet code={examples.css} language="css" />
        
        <Typography variant="subtitle1">HTML</Typography>
        <CodeSnippet code={examples.html} language="html" />
      </div>
    </div>
  );
}
```

## Considerações de Compatibilidade

- O hook `useCopyToClipboard` utiliza a API Clipboard moderna (`navigator.clipboard.writeText`), que pode não estar disponível em todos os navegadores ou contextos
- Em navegadores mais antigos ou em contextos inseguros (não-HTTPS), o hook tenta usar uma abordagem de fallback com `document.execCommand('copy')`
- Para garantir a melhor compatibilidade, considere:
  - Usar HTTPS para seu site (a API Clipboard moderna requer contexto seguro)
  - Fornecer feedback visual claro sobre o sucesso ou falha da operação
  - Oferecer instruções alternativas (como "Pressione Ctrl+C") quando a cópia automática falhar

## Boas Práticas

- Use `useCopyToClipboard` para melhorar a experiência do usuário ao copiar informações como códigos, links e textos formatados
- Sempre forneça feedback visual claro sobre o sucesso ou falha da operação de cópia
- Considere o contexto de uso - em dispositivos móveis, a experiência de cópia pode ser diferente
- Para textos longos, considere copiar apenas as partes mais relevantes ou oferecer opções para selecionar o que copiar
- Combine com outros hooks como `useTimeout` para gerenciar o feedback visual temporário
- Para cópia de dados sensíveis, considere limpar a área de transferência após um período de tempo usando um timer
