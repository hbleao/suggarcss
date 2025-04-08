import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type BenefitProps = HTMLAttributes<HTMLParagraphElement>

/**
 * Componente Benefit - Item de benefício do Banner Body
 * 
 * @component
 * @example
 * ```tsx
 * <Benefit className="custom-class">
 *   Descrição do benefício
 * </Benefit>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Conteúdo do benefício
 * @param {HTMLAttributes} restProps - Demais propriedades HTML
 * 
 * @returns {JSX.Element} Item de benefício do Banner Body
 */
export const Benefit = ({
  className = '',
  children,
  ...restProps
}: BenefitProps) => {
  return (
    <p
      className={joinClasses(['banner-body__benefit', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
