import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Hook para detectar cliques fora de um elemento específico.
 * Útil para fechar dropdowns, modais, menus, etc. quando o usuário clica fora deles.
 * 
 * @param callback - Função a ser executada quando ocorrer um clique fora do elemento
 * @param initialValue - Valor inicial para o ref (opcional)
 * @returns RefObject - Referência que deve ser anexada ao elemento que você deseja monitorar
 * 
 * @example
 * // Fechar um dropdown quando o usuário clica fora dele
 * const DropdownComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   
 *   const handleClickOutside = () => {
 *     if (isOpen) setIsOpen(false);
 *   };
 *   
 *   const dropdownRef = useOutsideClick(handleClickOutside);
 *   
 *   return (
 *     <div ref={dropdownRef} className="dropdown">
 *       <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
 *       {isOpen && (
 *         <ul className="dropdown-menu">
 *           <li>Item 1</li>
 *           <li>Item 2</li>
 *         </ul>
 *       )}
 *     </div>
 *   );
 * };
 */
/**
 * Hook para detectar cliques fora de um elemento específico.
 * @internal
 */
type OutsideClickRef<T> = RefObject<T> & { current: T | null };

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  initialValue: T | null = null
): OutsideClickRef<T> {
  // Criar uma referência para o elemento
  const ref = useRef<T | null>(initialValue) as OutsideClickRef<T>;
  
  useEffect(() => {
    // Função para verificar se o clique foi fora do elemento
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Se o ref não estiver definido ou se o clique foi dentro do elemento, não fazer nada
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      
      // Se o clique foi fora do elemento, executar o callback
      callback();
    };
    
    // Adicionar event listeners para cliques e toques
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    // Cleanup: remover os event listeners quando o componente for desmontado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback]); // O ref é estavel e não precisa ser adicionado como dependência
  
  return ref;
}

// Alternativa de implementação com MutableRefObject para casos onde a tipagem estrita é necessária
export function useOutsideClickAlt<T extends HTMLElement = HTMLElement>(
  callback: () => void
) {
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback();
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback]); // O ref é estavel e não precisa ser adicionado como dependência
  
  return ref;
}

export default useOutsideClick;
