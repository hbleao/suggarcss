import { useState, useEffect } from 'react';

/**
 * Hook para gerenciar estado com persistência no localStorage.
 * Permite armazenar e recuperar valores do localStorage de forma integrada com o estado do React.
 * 
 * @template T - Tipo do valor armazenado
 * @param key - Chave para armazenar o valor no localStorage
 * @param initialValue - Valor inicial caso não exista valor no localStorage
 * @returns Um array contendo o valor atual e uma função para atualizá-lo, similar ao useState
 * 
 * @example
 * // Armazenar preferências do usuário
 * function UserPreferences() {
 *   const [theme, setTheme] = useLocalStorage('theme', 'light');
 *   
 *   return (
 *     <div>
 *       <p>Tema atual: {theme}</p>
 *       <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
 *         Alternar tema
 *       </button>
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Armazenar um objeto complexo
 * function ShoppingCart() {
 *   const [cart, setCart] = useLocalStorage('shopping-cart', []);
 *   
 *   const addItem = (item) => {
 *     setCart([...cart, item]);
 *   };
 *   
 *   const clearCart = () => {
 *     setCart([]);
 *   };
 *   
 *   return (
 *     <div>
 *       <h2>Carrinho ({cart.length} itens)</h2>
 *       <ul>
 *         {cart.map((item, index) => (
 *           <li key={index}>{item.name} - R${item.price}</li>
 *         ))}
 *       </ul>
 *       <button onClick={clearCart}>Limpar carrinho</button>
 *     </div>
 *   );
 * }
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Obter do localStorage pelo key
      const item = window.localStorage.getItem(key);
      // Analisar o item armazenado ou retornar initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se ocorrer erro, retornar initialValue
      console.error(`Erro ao recuperar valor do localStorage para a chave "${key}":`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor no localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que o valor seja uma função (como no setState)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Salvar estado
      setStoredValue(valueToStore);
      
      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erro ao armazenar valor no localStorage para a chave "${key}":`, error);
    }
  };

  // Atualizar o valor armazenado se a chave mudar
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error(`Erro ao sincronizar com localStorage para a chave "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
