import { HTMLAttributes, ReactNode } from 'react';
import { TypographyProps } from '@porto-ocean/typography';

export interface CardTestimonialProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tema do card
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * Imagem do autor do depoimento
   */
  image?: ReactNode;
  
  /**
   * Nome do autor do depoimento
   */
  name?: ReactNode;
  
  /**
   * Propriedades adicionais para o componente de nome
   */
  nameProps?: TypographyProps;
  
  /**
   * Cargo/posição do autor do depoimento
   */
  position?: ReactNode;
  
  /**
   * Propriedades adicionais para o componente de posição
   */
  positionProps?: TypographyProps;
  
  /**
   * Data do depoimento
   */
  date?: ReactNode;
  
  /**
   * Propriedades adicionais para o componente de data
   */
  dateProps?: TypographyProps;
  
  /**
   * Texto do depoimento
   */
  text?: ReactNode;
  
  /**
   * Propriedades adicionais para o componente de texto
   */
  textProps?: TypographyProps;
  
  /**
   * Exibir separador entre o cabeçalho e o conteúdo
   * @default true
   */
  showSeparator?: boolean;
  
  /**
   * Classe CSS adicional
   * @default ''
   */
  className?: string;
}
