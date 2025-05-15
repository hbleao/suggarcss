import { HTMLAttributes, ReactNode } from 'react';
import { IconProps } from '@porto-ocean/icon';

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Controla se o diálogo está aberto ou fechado
   */
  isOpen: boolean;
  
  /**
   * Callback chamado quando o diálogo é fechado
   */
  onClose?: () => void;
  
  /**
   * Tamanho do diálogo
   * @default 'small'
   */
  variant?: 'small' | 'medium' | 'large';
  
  /**
   * Tema do diálogo
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * Título do diálogo
   */
  title?: ReactNode;
  
  /**
   * Subtítulo do diálogo
   */
  subtitle?: ReactNode;
  
  /**
   * Descrição do diálogo
   */
  description?: ReactNode;
  
  /**
   * Ícone exibido no cabeçalho do diálogo
   */
  icon?: IconProps;
  
  /**
   * Conteúdo principal do diálogo
   */
  children?: ReactNode;
  
  /**
   * Conteúdo do rodapé do diálogo
   */
  footer?: ReactNode;
  
  /**
   * Orientação dos botões no rodapé
   * @default 'row'
   */
  footerVariant?: 'column' | 'row';
  
  /**
   * Classe CSS adicional
   * @default ''
   */
  className?: string;
}
