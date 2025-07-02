import { useEffect, useState } from 'react';

/**
 * Interface para as dimensões da janela
 */
interface WindowSize {
  /**
   * Largura da janela em pixels
   */
  width: number;

  /**
   * Altura da janela em pixels
   */
  height: number;
}

/**
 * Hook para obter e monitorar as dimensões atuais da janela do navegador.
 * Útil para implementar layouts responsivos, ajustar elementos baseados no tamanho da tela,
 * e adaptar a interface de usuário para diferentes dispositivos.
 * 
 * @returns Um objeto contendo a largura e altura atuais da janela
 * 
 * @example
 * // Layout responsivo básico
 * function ResponsiveLayout() {
 *   const { width, height } = useWindowSize();
 *   
 *   return (
 *     <div>
 *       <p>Dimensões da janela: {width} x {height}</p>
 *       {width < 768 ? (
 *         <MobileLayout />
 *       ) : (
 *         <DesktopLayout />
 *       )}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Ajustar número de colunas em um grid
 * function ResponsiveGrid({ items }) {
 *   const { width } = useWindowSize();
 *   
 *   // Determinar número de colunas baseado na largura da tela
 *   const getColumns = () => {
 *     if (width < 600) return 1;
 *     if (width < 960) return 2;
 *     if (width < 1280) return 3;
 *     return 4;
 *   };
 *   
 *   const columns = getColumns();
 *   
 *   return (
 *     <div className={`grid-cols-${columns}`}>
 *       {items.map(item => (
 *         <div key={item.id} className="grid-item">
 *           {item.content}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Ajustar tamanho de um canvas
 * function ResponsiveCanvas() {
 *   const { width, height } = useWindowSize();
 *   const canvasRef = useRef(null);
 *   
 *   useEffect(() => {
 *     const canvas = canvasRef.current;
 *     if (canvas) {
 *       // Ajustar canvas para preencher 80% da largura e 60% da altura
 *       canvas.width = width * 0.8;
 *       canvas.height = height * 0.6;
 *       
 *       // Redesenhar o conteúdo do canvas
 *       const ctx = canvas.getContext('2d');
 *       // ... código para desenhar no canvas
 *     }
 *   }, [width, height]);
 *   
 *   return <canvas ref={canvasRef} />;
 * }
 */
export function useWindowSize(): WindowSize {
  // Estado para armazenar as dimensões da janela
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    // Função para atualizar as dimensões da janela no estado
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Verificar se estamos no ambiente do navegador
    if (typeof window !== 'undefined') {
      // Definir dimensões iniciais
      handleResize();

      // Adicionar event listener para redimensionamento
      window.addEventListener('resize', handleResize);

      // Limpar event listener ao desmontar o componente
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Retornar uma função de limpeza vazia para o caso de SSR
    return () => { };
  }, []);

  return windowSize;
}

export default useWindowSize;
