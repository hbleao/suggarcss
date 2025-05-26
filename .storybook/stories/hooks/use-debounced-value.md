# useDebouncedValue

O hook `useDebouncedValue` cria uma versão "debounced" de um valor, atualizando-o apenas após um período de inatividade especificado, o que melhora a performance em operações que não precisam responder a cada mudança de estado.

## Importação

```jsx
import { useDebouncedValue } from '@porto/js-library-corp-hubv-porto-ocean/hooks';
```

## Uso Básico

```jsx
import React, { useState } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useDebouncedValue } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function SearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
  
  return (
    <div>
      <Typography variant="title2">Pesquisa com Debounce</Typography>
      
      <div style={{ marginTop: '16px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite para pesquisar..."
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px',
            border: '1px solid #d9d9d9'
          }}
        />
        
        <div style={{ marginTop: '16px' }}>
          <Typography variant="body2">
            Termo digitado: <strong>{searchTerm}</strong>
          </Typography>
          <Typography variant="body2">
            Termo com debounce (500ms): <strong>{debouncedSearchTerm}</strong>
          </Typography>
          <Typography variant="caption" style={{ color: '#8c8c8c', marginTop: '8px', display: 'block' }}>
            O valor com debounce é atualizado apenas 500ms após a última digitação.
          </Typography>
        </div>
      </div>
    </div>
  );
}
```

## Parâmetros

O hook `useDebouncedValue` aceita os seguintes parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `value` | `T` | Sim | O valor original que será debounced |
| `delay` | `number` | Não | Tempo de espera em milissegundos (padrão: 500ms) |
| `options` | `object` | Não | Opções adicionais para configurar o comportamento do debounce |

### Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `leading` | `boolean` | `false` | Se `true`, invoca a atualização imediatamente no início |
| `trailing` | `boolean` | `true` | Se `true`, invoca a atualização após o período de espera |
| `maxWait` | `number` | `undefined` | Tempo máximo de espera em milissegundos |

## Retorno

O hook `useDebouncedValue` retorna o valor debounced, que é atualizado apenas após o período de espera especificado.

## Exemplos

### Campo de Pesquisa com Feedback Visual

```jsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useDebouncedValue } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function EnhancedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 800);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  
  // Simula uma pesquisa quando o termo com debounce muda
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      
      // Simulando uma API de pesquisa
      setTimeout(() => {
        // Gera resultados fictícios baseados no termo de pesquisa
        const mockResults = Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          title: `Resultado ${i + 1} para "${debouncedSearchTerm}"`,
          description: `Descrição do resultado ${i + 1} contendo o termo "${debouncedSearchTerm}"`
        }));
        
        setResults(mockResults);
        setIsSearching(false);
      }, 1000);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <div>
      <Typography variant="title2">Pesquisa Aprimorada</Typography>
      
      <div style={{ marginTop: '16px', position: 'relative' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite para pesquisar..."
          style={{ 
            width: '100%', 
            padding: '8px 32px 8px 8px', 
            borderRadius: '4px',
            border: '1px solid #d9d9d9'
          }}
        />
        
        {searchTerm && searchTerm !== debouncedSearchTerm && (
          <div style={{ 
            position: 'absolute', 
            right: '8px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: '2px solid #1890ff',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite'
          }} />
        )}
      </div>
      
      <div style={{ marginTop: '8px' }}>
        {searchTerm && searchTerm !== debouncedSearchTerm && (
          <Typography variant="caption" style={{ color: '#8c8c8c' }}>
            Aguardando você parar de digitar...
          </Typography>
        )}
      </div>
      
      <div style={{ marginTop: '16px' }}>
        {isSearching ? (
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <Typography variant="body1">Pesquisando...</Typography>
          </div>
        ) : (
          <>
            {debouncedSearchTerm && (
              <Typography variant="subtitle2">
                Resultados para: "{debouncedSearchTerm}"
              </Typography>
            )}
            
            {results.length > 0 ? (
              <div style={{ marginTop: '8px' }}>
                {results.map(result => (
                  <div 
                    key={result.id}
                    style={{ 
                      padding: '12px', 
                      marginBottom: '8px',
                      background: '#f5f5f5',
                      borderRadius: '4px'
                    }}
                  >
                    <Typography variant="subtitle2">{result.title}</Typography>
                    <Typography variant="body2">{result.description}</Typography>
                  </div>
                ))}
              </div>
            ) : (
              debouncedSearchTerm && (
                <Typography variant="body2" style={{ marginTop: '16px' }}>
                  Nenhum resultado encontrado.
                </Typography>
              )
            )}
          </>
        )}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
```

### Filtro de Tabela com Debounce

```jsx
import React, { useState, useMemo } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useDebouncedValue } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function TableFilter() {
  // Dados de exemplo
  const data = useMemo(() => [
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com', role: 'Desenvolvedor' },
    { id: 2, name: 'Maria Souza', email: 'maria@exemplo.com', role: 'Designer' },
    { id: 3, name: 'Pedro Santos', email: 'pedro@exemplo.com', role: 'Gerente' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@exemplo.com', role: 'Desenvolvedor' },
    { id: 5, name: 'Carlos Pereira', email: 'carlos@exemplo.com', role: 'Analista' },
    { id: 6, name: 'Juliana Costa', email: 'juliana@exemplo.com', role: 'Designer' },
    { id: 7, name: 'Roberto Almeida', email: 'roberto@exemplo.com', role: 'Desenvolvedor' },
    { id: 8, name: 'Fernanda Lima', email: 'fernanda@exemplo.com', role: 'Gerente' }
  ], []);
  
  const [filterText, setFilterText] = useState('');
  const debouncedFilterText = useDebouncedValue(filterText, 300);
  
  // Filtra os dados com base no texto debounced
  const filteredData = useMemo(() => {
    if (!debouncedFilterText) return data;
    
    const lowerCaseFilter = debouncedFilterText.toLowerCase();
    return data.filter(item => 
      item.name.toLowerCase().includes(lowerCaseFilter) ||
      item.email.toLowerCase().includes(lowerCaseFilter) ||
      item.role.toLowerCase().includes(lowerCaseFilter)
    );
  }, [data, debouncedFilterText]);
  
  return (
    <div>
      <Typography variant="title2">Tabela com Filtro Debounced</Typography>
      
      <div style={{ marginTop: '16px', position: 'relative' }}>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filtrar por nome, email ou função..."
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px',
            border: '1px solid #d9d9d9',
            marginBottom: '16px'
          }}
        />
        
        {filterText !== debouncedFilterText && (
          <Typography variant="caption" style={{ color: '#8c8c8c', position: 'absolute', right: '8px', top: '8px' }}>
            Filtrando...
          </Typography>
        )}
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '12px 8px', textAlign: 'left', borderBottom: '1px solid #d9d9d9' }}>
                <Typography variant="subtitle2">Nome</Typography>
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'left', borderBottom: '1px solid #d9d9d9' }}>
                <Typography variant="subtitle2">Email</Typography>
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'left', borderBottom: '1px solid #d9d9d9' }}>
                <Typography variant="subtitle2">Função</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(item => (
                <tr key={item.id}>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid #f0f0f0' }}>
                    <Typography variant="body2">{item.name}</Typography>
                  </td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid #f0f0f0' }}>
                    <Typography variant="body2">{item.email}</Typography>
                  </td>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid #f0f0f0' }}>
                    <Typography variant="body2">{item.role}</Typography>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ padding: '24px 8px', textAlign: 'center' }}>
                  <Typography variant="body2">Nenhum resultado encontrado.</Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div style={{ marginTop: '16px' }}>
        <Typography variant="caption">
          Mostrando {filteredData.length} de {data.length} registros
        </Typography>
      </div>
    </div>
  );
}
```

### Redimensionamento de Janela com Debounce

```jsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import { useDebouncedValue } from '@porto/js-library-corp-hubv-porto-ocean/hooks';

function WindowResizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Versão debounced das dimensões da janela
  const debouncedSize = useDebouncedValue(windowSize, 500);
  
  // Atualiza as dimensões da janela em tempo real
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      <Typography variant="title2">Monitor de Redimensionamento</Typography>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginTop: '16px'
      }}>
        <div style={{ 
          padding: '16px',
          background: '#f9f9f9',
          borderRadius: '8px',
          border: '1px solid #d9d9d9'
        }}>
          <Typography variant="subtitle1">Tempo Real</Typography>
          <div style={{ marginTop: '8px' }}>
            <Typography variant="body2">
              Largura: {windowSize.width}px
            </Typography>
            <Typography variant="body2">
              Altura: {windowSize.height}px
            </Typography>
          </div>
        </div>
        
        <div style={{ 
          padding: '16px',
          background: '#f0f5ff',
          borderRadius: '8px',
          border: '1px solid #d9d9d9'
        }}>
          <Typography variant="subtitle1">Com Debounce (500ms)</Typography>
          <div style={{ marginTop: '8px' }}>
            <Typography variant="body2">
              Largura: {debouncedSize.width}px
            </Typography>
            <Typography variant="body2">
              Altura: {debouncedSize.height}px
            </Typography>
          </div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '24px',
        padding: '16px',
        background: '#f6ffed',
        borderRadius: '8px'
      }}>
        <Typography variant="subtitle2">Como funciona:</Typography>
        <Typography variant="body2" style={{ marginTop: '8px' }}>
          Redimensione a janela do navegador para ver a diferença entre os valores em tempo real e os valores com debounce.
          O valor com debounce só é atualizado 500ms após você parar de redimensionar a janela.
        </Typography>
        
        <Typography variant="subtitle2" style={{ marginTop: '16px' }}>
          Benefícios do Debounce:
        </Typography>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>
            <Typography variant="body2">
              Reduz o número de atualizações de estado durante operações contínuas
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Melhora a performance ao evitar cálculos ou renderizações desnecessárias
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Ideal para operações custosas como chamadas de API ou recálculos de layout
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  );
}
```

## Considerações de Performance

- O hook `useDebouncedValue` é especialmente útil para melhorar a performance em situações onde:
  - O valor muda frequentemente em um curto período (como digitação em um campo de pesquisa)
  - Operações custosas são desencadeadas por mudanças no valor (como chamadas de API ou recálculos complexos)
  - Atualizações visuais frequentes podem causar problemas de performance ou "flickering"
- O delay ideal depende do caso de uso:
  - Para campos de pesquisa, 300-500ms geralmente oferece um bom equilíbrio
  - Para redimensionamento de janela, 200-300ms pode ser apropriado
  - Para validação de formulários, 500-800ms pode proporcionar uma melhor experiência

## Boas Práticas

- Use `useDebouncedValue` para otimizar operações que não precisam responder a cada mudança de estado
- Combine com `useEffect` para executar efeitos colaterais apenas quando o valor debounced mudar
- Para interfaces de usuário, forneça feedback visual enquanto o debounce está em andamento
- Considere usar a opção `leading: true` quando precisar de uma resposta imediata seguida pelo comportamento de debounce
- Para casos onde você precisa garantir que uma atualização aconteça após um tempo máximo, use a opção `maxWait`
- Em formulários complexos, aplique debounce em campos individuais em vez de todo o estado do formulário
