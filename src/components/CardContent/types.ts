import { HTMLAttributes, ReactNode } from 'react';
import { ButtonProps } from '@porto-ocean/button';
import { TypographyProps } from '@porto-ocean/typography';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Define o tema do card
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * Título do card
   */
  title?: ReactNode;
  
  /**
   * Propriedades adicionais para o componente de título
   */
  titleProps?: TypographyProps;
  
  /**
   * Descrição do card
   */
  description?: ReactNode;
  
  /**
   * Propriedades adicionais para o componente de descrição
   */
  descriptionProps?: TypographyProps;
  
  /**
   * Imagem do card
   */
  image?: ReactNode;
  
  /**
   * Botões do card
   */
  buttons?: CardContentButton[];
  
  /**
   * Classe CSS adicional
   * @default ''
   */
  className?: string;
}

export interface CardContentButton extends ButtonProps {
  /**
   * Texto do botão
   */
  label: ReactNode;
}
