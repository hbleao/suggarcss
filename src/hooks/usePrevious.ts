import { useRef, useEffect } from 'react';

/**
 * Hook para armazenar e acessar o valor anterior de uma variável de estado ou prop.
 * Útil para comparar valores anteriores e atuais, detectar mudanças e implementar
 * efeitos baseados em alterações de valores.
 * 
 * @template T - Tipo do valor a ser rastreado
 * @param value - O valor atual cujo valor anterior deseja-se rastrear
 * @returns O valor anterior (undefined no primeiro render)
 * 
 * @example
 * // Detectar mudanças em uma prop
 * function Counter({ count }) {
 *   const previousCount = usePrevious(count);
 *   
 *   // Comparar valores atual e anterior
 *   useEffect(() => {
 *     if (previousCount !== undefined && count !== previousCount) {
 *       console.log(`Contador mudou de ${previousCount} para ${count}`);
 *     }
 *   }, [count, previousCount]);
 *   
 *   return (
 *     <div>
 *       <p>Valor atual: {count}</p>
 *       <p>Valor anterior: {previousCount ?? 'N/A'}</p>
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Implementar animações baseadas em mudanças de estado
 * function AnimatedValue({ value }) {
 *   const [animationClass, setAnimationClass] = useState('');
 *   const previousValue = usePrevious(value);
 *   
 *   useEffect(() => {
 *     if (previousValue !== undefined && value !== previousValue) {
 *       // Determinar direção da animação
 *       const direction = value > previousValue ? 'increase' : 'decrease';
 *       setAnimationClass(`animate-${direction}`);
 *       
 *       // Limpar classe de animação após a transição
 *       const timer = setTimeout(() => {
 *         setAnimationClass('');
 *       }, 500);
 *       
 *       return () => clearTimeout(timer);
 *     }
 *   }, [value, previousValue]);
 *   
 *   return (
 *     <div className={`value ${animationClass}`}>
 *       {value}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Rastrear mudanças em objetos complexos
 * function UserProfile({ user }) {
 *   const previousUser = usePrevious(user);
 *   
 *   useEffect(() => {
 *     if (previousUser && user.email !== previousUser.email) {
 *       // Executar ação quando o email mudar
 *       sendEmailVerification(user.email);
 *     }
 *   }, [user, previousUser]);
 *   
 *   return <div>...</div>;
 * }
 */
export function usePrevious<T>(value: T): T | undefined {
  // Referência para armazenar o valor anterior
  const ref = useRef<T>();
  
  // Atualizar a referência após cada renderização
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  // Retornar o valor armazenado na renderização anterior
  return ref.current;
}

export default usePrevious;
