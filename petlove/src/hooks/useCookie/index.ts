import { useState, useCallback } from 'react';

/**
 * Opções para configuração de cookies
 */
interface CookieOptions {
  /**
   * Tempo de expiração do cookie em dias
   * @default 7
   */
  days?: number;
  
  /**
   * Caminho onde o cookie é válido
   * @default '/'
   */
  path?: string;
  
  /**
   * Domínio onde o cookie é válido
   */
  domain?: string;
  
  /**
   * Define se o cookie é seguro (só enviado em conexões HTTPS)
   */
  secure?: boolean;
  
  /**
   * Define a política SameSite do cookie
   */
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Hook para gerenciar cookies, permitindo leitura, escrita e exclusão.
 * 
 * @param key - Nome do cookie
 * @param initialValue - Valor inicial do cookie (usado se o cookie não existir)
 * @returns Um array contendo:
 * - O valor atual do cookie
 * - Uma função para atualizar o cookie
 * - Uma função para remover o cookie
 * 
 * @example
 * // Gerenciar um cookie de preferência de tema
 * function ThemeToggle() {
 *   const [theme, setTheme, removeTheme] = useCookie('theme', 'light');
 *   
 *   const toggleTheme = () => {
 *     setTheme(theme === 'light' ? 'dark' : 'light');
 *   };
 *   
 *   return (
 *     <div>
 *       <p>Tema atual: {theme}</p>
 *       <button onClick={toggleTheme}>Alternar tema</button>
 *       <button onClick={removeTheme}>Remover preferência</button>
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Gerenciar um cookie de sessão com opções avançadas
 * function SessionManager() {
 *   const [sessionId, setSessionId, removeSession] = useCookie('sessionId', '', {
 *     days: 1,
 *     secure: true,
 *     sameSite: 'strict'
 *   });
 *   
 *   const login = (id) => {
 *     setSessionId(id);
 *   };
 *   
 *   const logout = () => {
 *     removeSession();
 *   };
 *   
 *   return (
 *     <div>
 *       {sessionId ? (
 *         <button onClick={logout}>Logout</button>
 *       ) : (
 *         <button onClick={() => login('user-123')}>Login</button>
 *       )}
 *     </div>
 *   );
 * }
 */
export function useCookie<T extends string>(
  key: string,
  initialValue: T,
  options: CookieOptions = {}
): [T, (value: string, options?: CookieOptions) => void, () => void] {
  // Estado para armazenar o valor do cookie
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Verificar se estamos no browser
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      // Tentar obter o cookie
      const item = getCookie(key);
      return item ? (item as T) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler o cookie ${key}:`, error);
      return initialValue;
    }
  });
  
  // Função para definir o cookie
  const setCookie = useCallback((value: string, cookieOptions: CookieOptions = {}) => {
    try {
      // Verificar se estamos no browser
      if (typeof window === 'undefined') {
        return;
      }
      
      // Mesclar opções padrão com as opções fornecidas
      const mergedOptions = { ...options, ...cookieOptions };
      
      // Definir o cookie
      const { days = 7, path = '/', domain, secure, sameSite } = mergedOptions;
      
      // Calcular data de expiração
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
      
      // Construir string de opções
      let cookieString = `${key}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=${path}`;
      
      if (domain) {
        cookieString += `; domain=${domain}`;
      }
      
      if (secure) {
        cookieString += '; secure';
      }
      
      if (sameSite) {
        cookieString += `; samesite=${sameSite}`;
      }
      
      // Definir o cookie
      document.cookie = cookieString;
      
      // Atualizar o estado
      setStoredValue(value as T);
    } catch (error) {
      console.error(`Erro ao definir o cookie ${key}:`, error);
    }
  }, [key, options]);
  
  // Função para remover o cookie
  const removeCookie = useCallback(() => {
    try {
      // Verificar se estamos no browser
      if (typeof window === 'undefined') {
        return;
      }
      
      // Expirar o cookie definindo uma data no passado
      const { path = '/', domain } = options;
      
      let cookieString = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
      
      if (domain) {
        cookieString += `; domain=${domain}`;
      }
      
      document.cookie = cookieString;
      
      // Atualizar o estado
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Erro ao remover o cookie ${key}:`, error);
    }
  }, [key, options, initialValue]);
  
  // Função auxiliar para obter um cookie pelo nome
  function getCookie(name: string): string | undefined {
    if (typeof window === 'undefined') {
      return undefined;
    }
    
    const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
    return match ? decodeURIComponent(match[3]) : undefined;
  }
  
  return [storedValue, setCookie, removeCookie];
}

export default useCookie;
