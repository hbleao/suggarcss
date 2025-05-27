import React from 'react';
import { clsx } from '@/utils/clsx';
import './styles.scss';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Adiciona sombra ao card
   */
  shadow?: boolean;
  /**
   * Adiciona borda ao card
   */
  border?: boolean;
  /**
   * Largura personalizada para o card
   */
  width?: string;
  /**
   * Adiciona efeito hover ao card
   */
  hover?: boolean;
  /**
   * Conteúdo do card
   */
  children: React.ReactNode;
}

/**
 * Componente Card para exibir conteúdo em um contêiner estilizado
 */
export const Card: React.FC<CardProps> = ({
  shadow = false,
  border = false,
  width,
  hover = false,
  className,
  children,
  style,
  ...restProps
}) => {
  // Using string concatenation instead of clsx to ensure classes are applied correctly in tests
  let cardClasses = 'card';
  if (shadow) cardClasses += ' card--shadow';
  if (border) cardClasses += ' card--border';
  if (hover) cardClasses += ' card--hover';
  if (className) cardClasses += ` ${className}`;

  const cardStyles = {
    ...(width && { width }),
    ...style,
  };

  return (
    <div className={cardClasses} style={cardStyles} {...restProps}>
      {children}
    </div>
  );
};
