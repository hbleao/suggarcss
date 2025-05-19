import { useEffect, useRef } from 'react';

/**
 * Hook para bloquear o scroll da página.
 * Útil para modais, drawers, e outros componentes de overlay onde o scroll da página
 * deve ser bloqueado enquanto o componente está aberto.
 * 
 * @param isLocked - Estado booleano que determina se o scroll deve estar bloqueado
 * @param options - Opções adicionais para personalizar o comportamento do bloqueio
 * @returns void
 * 
 * @example
 * // Bloquear o scroll quando um modal está aberto
 * const ModalComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   
 *   // Bloquear o scroll quando o modal está aberto
 *   useLockScroll(isOpen);
 *   
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
 *       {isOpen && (
 *         <div className="modal">
 *           <div className="modal-content">
 *             <h2>Modal Title</h2>
 *             <p>Modal content goes here...</p>
 *             <button onClick={() => setIsOpen(false)}>Fechar</button>
 *           </div>
 *         </div>
 *       )}
 *     </>
 *   );
 * };
 * 
 * // Com opções personalizadas
 * const DrawerComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   
 *   // Bloquear o scroll com reserva de largura para evitar saltos de layout
 *   useLockScroll(isOpen, { reserveScrollBarWidth: true });
 *   
 *   return (
 *     // ...componente drawer
 *   );
 * };
 */

interface UseLockScrollOptions {
  /**
   * Quando true, adiciona padding-right ao body para compensar a largura
   * da barra de rolagem e evitar saltos de layout quando o scroll é bloqueado
   */
  reserveScrollBarWidth?: boolean;
  
  /**
   * Elemento alvo para bloquear o scroll. Por padrão é o document.body
   */
  targetElement?: HTMLElement | null;
}

export function useLockScroll(
  isLocked: boolean,
  options: UseLockScrollOptions = {}
): void {
  const {
    reserveScrollBarWidth = false,
    targetElement = typeof document !== 'undefined' ? document.body : null
  } = options;
  
  // Armazenar o estado original do scroll
  const originalStylesRef = useRef<{
    overflow: string;
    paddingRight: string;
    scrollY: number;
  }>({
    overflow: '',
    paddingRight: '',
    scrollY: 0
  });
  
  useEffect(() => {
    if (!targetElement) return;
    
    // Função para calcular a largura da barra de rolagem
    const getScrollbarWidth = (): number => {
      return window.innerWidth - document.documentElement.clientWidth;
    };
    
    if (isLocked) {
      // Salvar a posição atual do scroll e os estilos originais
      originalStylesRef.current = {
        overflow: targetElement.style.overflow,
        paddingRight: targetElement.style.paddingRight,
        scrollY: window.scrollY
      };
      
      // Aplicar estilos para bloquear o scroll
      targetElement.style.overflow = 'hidden';
      
      // Se a opção reserveScrollBarWidth estiver ativada, adicionar padding-right
      if (reserveScrollBarWidth) {
        const scrollbarWidth = getScrollbarWidth();
        if (scrollbarWidth > 0) {
          targetElement.style.paddingRight = `${scrollbarWidth}px`;
        }
      }
      
      // Fixar a posição do scroll para evitar que a página "salte" quando o scroll for bloqueado
      window.scrollTo(0, originalStylesRef.current.scrollY);
    } else {
      // Restaurar os estilos originais
      targetElement.style.overflow = originalStylesRef.current.overflow;
      targetElement.style.paddingRight = originalStylesRef.current.paddingRight;
    }
    
    // Cleanup: restaurar os estilos originais quando o componente for desmontado
    return () => {
      if (targetElement && isLocked) {
        targetElement.style.overflow = originalStylesRef.current.overflow;
        targetElement.style.paddingRight = originalStylesRef.current.paddingRight;
      }
    };
  }, [isLocked, reserveScrollBarWidth, targetElement]);
}

export default useLockScroll;
