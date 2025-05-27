import React, { useState, useEffect, useMemo } from 'react';
import { useDebouncedValue } from '../../../src/hooks';

export default {
  title: 'Hooks/useDebounceValue',
  parameters: {
    layout: 'centered',
  },
};

export const SearchExample = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Simula uma busca na API
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    // Simula um atraso de rede
    const timer = setTimeout(() => {
      // Gera resultados fictícios baseados no termo de busca
      const mockResults = [
        `${debouncedSearchTerm} - resultado 1`,
        `${debouncedSearchTerm} - resultado 2`,
        `${debouncedSearchTerm} - resultado 3`,
      ];
      setResults(mockResults);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedSearchTerm]);

  return (
    <div style={{ width: '400px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h3>Exemplo de Campo de Busca com Debounce</h3>
      <p>Digite algo para ver o debounce em ação (delay: 500ms)</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite para buscar..."
          style={{ 
            width: '100%', 
            padding: '8px', 
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      
      <div>
        <p><strong>Valor atual:</strong> "{searchTerm}"</p>
        <p><strong>Valor com debounce:</strong> "{debouncedSearchTerm}"</p>
        
        {loading && <p>Buscando...</p>}
        
        {results.length > 0 && (
          <div>
            <p><strong>Resultados:</strong></p>
            <ul style={{ paddingLeft: '20px' }}>
              {results.map((result) => (
                <li key={`result-${result}`}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export const FilterExample = () => {
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebouncedValue(filter, 300);
  
  // Lista de itens fictícia
  const items = useMemo(() => [
    { id: 1, name: 'Produto A', category: 'Eletrônicos' },
    { id: 2, name: 'Produto B', category: 'Móveis' },
    { id: 3, name: 'Produto C', category: 'Eletrônicos' },
    { id: 4, name: 'Produto D', category: 'Roupas' },
    { id: 5, name: 'Produto E', category: 'Alimentos' },
    { id: 6, name: 'Produto F', category: 'Móveis' },
    { id: 7, name: 'Produto G', category: 'Roupas' },
    { id: 8, name: 'Produto H', category: 'Alimentos' },
    { id: 9, name: 'Produto I', category: 'Eletrônicos' },
    { id: 10, name: 'Produto J', category: 'Móveis' },
  ], []);
  
  // Filtra os itens com base no valor com debounce
  const filteredItems = useMemo(() => {
    if (!debouncedFilter) return items;
    
    const lowerFilter = debouncedFilter.toLowerCase();
    return items.filter(
      item => 
        item.name.toLowerCase().includes(lowerFilter) || 
        item.category.toLowerCase().includes(lowerFilter)
    );
  }, [items, debouncedFilter]);
  
  return (
    <div style={{ width: '400px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h3>Exemplo de Filtro de Tabela com Debounce</h3>
      <p>Digite para filtrar os produtos (delay: 300ms)</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filtrar produtos ou categorias..."
          style={{ 
            width: '100%', 
            padding: '8px', 
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      
      <div>
        <p><strong>Valor atual:</strong> "{filter}"</p>
        <p><strong>Valor com debounce:</strong> "{debouncedFilter}"</p>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Nome</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.name}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredItems.length === 0 && (
          <p style={{ textAlign: 'center', padding: '20px' }}>Nenhum resultado encontrado</p>
        )}
      </div>
    </div>
  );
};

export const CompareDelays = () => {
  const [value, setValue] = useState('');
  const debouncedValue100 = useDebouncedValue(value, 100);
  const debouncedValue500 = useDebouncedValue(value, 500);
  const debouncedValue1000 = useDebouncedValue(value, 1000);
  
  return (
    <div style={{ width: '400px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h3>Comparação de Diferentes Delays</h3>
      <p>Digite para ver a diferença entre os tempos de debounce</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Digite algo..."
          style={{ 
            width: '100%', 
            padding: '8px', 
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      
      <div>
        <p><strong>Valor atual:</strong> "{value}"</p>
        <p><strong>Debounce (100ms):</strong> "{debouncedValue100}"</p>
        <p><strong>Debounce (500ms):</strong> "{debouncedValue500}"</p>
        <p><strong>Debounce (1000ms):</strong> "{debouncedValue1000}"</p>
      </div>
    </div>
  );
};
