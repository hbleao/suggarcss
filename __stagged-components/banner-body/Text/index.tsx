import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type TextProps = HTMLAttributes<HTMLLIElement>

/**
 * Componente Text - Exibe um item de texto no Banner Body
 * 
 * @component
 * @example
 * ```tsx
 * <Text className="custom-class">
 *   Texto do item
 * </Text>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Conteúdo do texto
 * @param {HTMLAttributes} restProps - Demais propriedades HTML
 * 
 * @returns {JSX.Element} Elemento li contendo o texto
 */
export const Text = ({ className = '', children, ...restProps }: TextProps) => {
  return (
    <li
      className={joinClasses(['banner-body__text', className])}
      {...restProps}
    >
      {children}
    </li>
  )
}
