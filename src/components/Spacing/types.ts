import type { CSSProperties, ReactNode } from "react";

// Permitindo qualquer string ou número como tamanho de espaçamento
export type SpacingSize = string | number;

export type SpacingProps = {
  /**
   * Conteúdo a ser renderizado dentro do componente de espaçamento
   */
  children?: ReactNode;
  
  /**
   * Classes CSS adicionais
   */
  className?: string;
  
  /**
   * Estilos inline adicionais
   */
  style?: CSSProperties;
  
  /**
   * Elemento HTML a ser renderizado
   * @default 'div'
   */
  as?: keyof React.JSX.IntrinsicElements;
  
  /**
   * Espaçamento vertical (margin-top e margin-bottom)
   * Aceita valores string (ex: '1rem', '10px', 'var(--spacing)') ou números (convertidos para pixels)
   */
  y?: SpacingSize;
  
  /**
   * Espaçamento horizontal (margin-left e margin-right)
   * Aceita valores string (ex: '1rem', '10px', 'var(--spacing)') ou números (convertidos para pixels)
   */
  x?: SpacingSize;
  
  /**
   * Espaçamento superior (margin-top)
   * Aceita valores string (ex: '1rem', '10px', 'var(--spacing)') ou números (convertidos para pixels)
   */
  top?: SpacingSize;
  
  /**
   * Espaçamento inferior (margin-bottom)
   * Aceita valores string (ex: '1rem', '10px', 'var(--spacing)') ou números (convertidos para pixels)
   */
  bottom?: SpacingSize;
  
  /**
   * Espaçamento à esquerda (margin-left)
   * Aceita valores string (ex: '1rem', '10px', 'var(--spacing)') ou números (convertidos para pixels)
   */
  left?: SpacingSize;
  
  /**
   * Espaçamento à direita (margin-right)
   * Aceita valores string (ex: '1rem', '10px', 'var(--spacing)') ou números (convertidos para pixels)
   */
  right?: SpacingSize;
  
  /**
   * Espaçamento em todos os lados (margin)
   * Aceita valores string (ex: '1rem', '10px', 'var(--spacing)') ou números (convertidos para pixels)
   */
  all?: SpacingSize;
  
  /**
   * Define se o componente deve ser renderizado como um elemento inline
   * @default false
   */
  inline?: boolean;
};
