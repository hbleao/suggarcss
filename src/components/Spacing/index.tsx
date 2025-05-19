import React from 'react';
import styles from './styles.module.scss';
import type { SpacingProps, SpacingSize } from './types';

// Função auxiliar para combinar classes CSS (substitui a dependência clsx)
function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Componente Spacing para adicionar espaçamentos dinâmicos na interface.
 *
 * O componente Spacing permite adicionar margens em diferentes direções
 * (vertical, horizontal, ou em lados específicos) usando valores dinâmicos.
 * Útil para criar layouts com espaçamentos consistentes sem precisar adicionar
 * estilos CSS manualmente.
 *
 * @component
 * @example
 * ```tsx
 * // Espaçamento vertical usando rem
 * <Spacing y="1rem">
 *   <p>Conteúdo com espaçamento vertical</p>
 * </Spacing>
 * 
 * // Espaçamento horizontal usando em
 * <Spacing x="1.5em">
 *   <p>Conteúdo com espaçamento horizontal</p>
 * </Spacing>
 * 
 * // Espaçamento em todos os lados usando variáveis CSS
 * <Spacing all="var(--spacing-md)">
 *   <p>Conteúdo com espaçamento em todos os lados</p>
 * </Spacing>
 * 
 * // Espaçamento personalizado em lados específicos
 * <Spacing top="2rem" bottom="0.5rem" left="1rem">
 *   <p>Conteúdo com espaçamentos diferentes em cada lado</p>
 * </Spacing>
 * 
 * // Espaçamento com valor numérico (em pixels)
 * <Spacing top={32} bottom={16}>
 *   <p>Conteúdo com espaçamento em pixels</p>
 * </Spacing>
 * 
 * // Espaçamento usando porcentagem
 * <Spacing x="5%">
 *   <p>Conteúdo com espaçamento horizontal em porcentagem</p>
 * </Spacing>
 * 
 * // Espaçamento vazio (para criar separação entre elementos)
 * <div>Primeiro elemento</div>
 * <Spacing y="1.5rem" />
 * <div>Segundo elemento</div>
 * ```
 */
export const Spacing: React.FC<SpacingProps> = ({
  children,
  className,
  style = {},
  as: Tag = 'div',
  y,
  x,
  top,
  bottom,
  left,
  right,
  all,
  inline = false,
}) => {
  // Função para converter o tamanho de espaçamento em valor CSS
  const getSpacingValue = (size: SpacingSize | undefined): string | number | undefined => {
    if (size === undefined) return undefined;
    
    // Se for número, converter para pixels
    if (typeof size === 'number') {
      return `${size}px`;
    }
    
    // Se for string, retornar diretamente (pode ser qualquer unidade CSS válida)
    return size;
  };
  
  // Calcular os valores de margem
  const marginTop = getSpacingValue(top ?? y ?? all);
  const marginBottom = getSpacingValue(bottom ?? y ?? all);
  const marginLeft = getSpacingValue(left ?? x ?? all);
  const marginRight = getSpacingValue(right ?? x ?? all);
  
  // Combinar os estilos
  const combinedStyle = {
    ...style,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  };
  
  // Se não houver filhos, renderizar como um espaçador vazio
  if (!children) {
    return (
      <Tag 
        className={classNames(styles.spacing, inline && styles.inline, className)}
        style={combinedStyle}
        aria-hidden="true"
      />
    );
  }
  
  // Renderizar com filhos
  return (
    <Tag 
      className={classNames(styles.spacing, inline && styles.inline, className)}
      style={combinedStyle}
    >
      {children}
    </Tag>
  );
};

export default Spacing;
