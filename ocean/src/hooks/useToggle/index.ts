import { useState, useCallback } from 'react';

/**
 * Hook para alternar entre valores booleanos ou entre dois valores específicos.
 * Útil para controlar estados de visibilidade, ativação/desativação, etc.
 * 
 * @template T - Tipo do valor alternado (padrão: boolean)
 * @param initialValue - Valor inicial (padrão: false)
 * @param toggleValue - Valor alternativo para alternar (usado apenas quando T não é boolean)
 * @returns Um array contendo:
 * - O valor atual
 * - Uma função para alternar o valor
 * - Uma função para definir o valor diretamente
 * 
 * @example
 * // Alternar entre true e false (caso mais comum)
 * function ToggleButton() {
 *   const [isOn, toggle] = useToggle();
 *   
 *   return (
 *     <button onClick={toggle}>
 *       {isOn ? 'Ligado' : 'Desligado'}
 *     </button>
 *   );
 * }
 * 
 * @example
 * // Alternar entre dois valores específicos
 * function ThemeToggle() {
 *   const [theme, toggleTheme, setTheme] = useToggle('light', 'dark');
 *   
 *   return (
 *     <div>
 *       <p>Tema atual: {theme}</p>
 *       <button onClick={toggleTheme}>Alternar tema</button>
 *       <button onClick={() => setTheme('light')}>Tema claro</button>
 *       <button onClick={() => setTheme('dark')}>Tema escuro</button>
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Controlar visibilidade de um modal
 * function Modal() {
 *   const [isOpen, toggle, setIsOpen] = useToggle(false);
 *   
 *   return (
 *     <>
 *       <button onClick={toggle}>
 *         {isOpen ? 'Fechar' : 'Abrir'} Modal
 *       </button>
 *       
 *       {isOpen && (
 *         <div className="modal">
 *           <h2>Modal de exemplo</h2>
 *           <p>Conteúdo do modal...</p>
 *           <button onClick={() => setIsOpen(false)}>Fechar</button>
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 */
export function useToggle<T = boolean>(
  initialValue: T = false as unknown as T,
  toggleValue?: T
): [T, () => void, (value: T) => void] {
  // Estado para armazenar o valor atual
  const [value, setValue] = useState<T>(initialValue);
  
  // Função para alternar o valor
  const toggle = useCallback(() => {
    setValue((currentValue) => {
      // Se T é boolean, simplesmente inverte o valor
      if (typeof currentValue === 'boolean') {
        return !currentValue as unknown as T;
      }
      
      // Se toggleValue foi fornecido, alterna entre initialValue e toggleValue
      if (toggleValue !== undefined) {
        return currentValue === initialValue ? toggleValue : initialValue;
      }
      
      // Caso contrário, mantém o valor atual (não deve ocorrer se usado corretamente)
      return currentValue;
    });
  }, [initialValue, toggleValue]);
  
  return [value, toggle, setValue];
}

export default useToggle;
