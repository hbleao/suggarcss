import { useState, useEffect } from "react";

/**
 * Hook para criar uma versão "debounced" de um valor.
 * Útil para melhorar a performance em campos de busca, filtros e outras operações
 * que não precisam ser executadas a cada mudança de estado.
 * 
 * @param value - O valor a ser "debounced"
 * @param delay - O tempo de espera em milissegundos antes de atualizar o valor (padrão: 500ms)
 * @returns O valor debounced que será atualizado após o delay
 * 
 * @example
 * // Campo de busca com debounce
 * function SearchField() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
 *   
 *   useEffect(() => {
 *     // Esta função só será chamada 300ms após a última mudança no searchTerm
 *     if (debouncedSearchTerm) {
 *       fetchSearchResults(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 *   
 *   return (
 *     <input
 *       type="text"
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="Buscar..."
 *     />
 *   );
 * }
 * 
 * @example
 * // Filtro de tabela com debounce
 * function FilterableTable() {
 *   const [filter, setFilter] = useState('');
 *   const debouncedFilter = useDebouncedValue(filter, 250);
 *   
 *   // A tabela só será filtrada 250ms após o usuário parar de digitar
 *   const filteredData = useMemo(() => {
 *     return data.filter(item => 
 *       item.name.toLowerCase().includes(debouncedFilter.toLowerCase())
 *     );
 *   }, [data, debouncedFilter]);
 *   
 *   return (
 *     <>
 *       <input 
 *         type="text" 
 *         value={filter} 
 *         onChange={(e) => setFilter(e.target.value)} 
 *       />
 *       <Table data={filteredData} />
 *     </>
 *   );
 * }
 */
export function useDebouncedValue<T>(value: T, delay = 500) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		// Configurar um timer para atualizar o valor após o delay
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Limpar o timer se o valor mudar antes do delay
		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebouncedValue;
