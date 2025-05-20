import { HTMLAttributes, ReactNode } from 'react';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo que será exibido no tooltip
   */
  content: ReactNode;
  
  /**
   * Elemento que acionará o tooltip
   */
  children: ReactNode;
  
  /**
   * Posição do tooltip em relação ao elemento trigger
   * @default 'top'
   */
  position?: 'top' | 'right' | 'bottom' | 'left';
  
  /**
   * Define se o tooltip está visível
   * @default false
   */
  isOpen?: boolean;
  
  /**
   * Callback chamado quando o tooltip é aberto
   */
  onOpen?: () => void;
  
  /**
   * Callback chamado quando o tooltip é fechado
   */
  onClose?: () => void;
  
  /**
   * Classe CSS adicional para o componente raiz
   * @default ''
   */
  className?: string;
  
  /**
   * Classe CSS adicional para o conteúdo do tooltip
   * @default ''
   */
  contentClassName?: string;
  
  /**
   * Classe CSS adicional para o trigger do tooltip
   * @default ''
   */
  triggerClassName?: string;
}
