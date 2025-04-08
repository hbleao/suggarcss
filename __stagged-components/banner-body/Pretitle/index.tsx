import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

type PretitleProps = HTMLAttributes<HTMLSpanElement>

/**
 * Componente Pretitle - Exibe o texto pré-título do Banner Body
 * 
 * @component
 * @example
 * ```tsx
 * <Pretitle className="custom-class">
 *   Texto do pré-título
 * </Pretitle>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Texto do pré-título
 * @param {HTMLAttributes} restProps - Demais propriedades HTML
 * 
 * @returns {JSX.Element} Elemento span contendo o pré-título
 */
export const Pretitle = ({
  className = '',
  children,
  ...restProps
}: PretitleProps) => {
  return (
    <span
      className={joinClasses(['banner-body__pretitle', className])}
      {...restProps}
    >
      {children}
    </span>
  )
}
