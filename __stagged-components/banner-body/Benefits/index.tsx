import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type BenefitsProps = HTMLAttributes<HTMLUListElement>

/**
 * Componente Benefits - Lista de benefícios do Banner Body
 * 
 * @component
 * @example
 * ```tsx
 * <Benefits className="custom-class">
 *   <Benefit>Benefício 1</Benefit>
 *   <Benefit>Benefício 2</Benefit>
 * </Benefits>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Componentes Benefit a serem renderizados
 * @param {HTMLAttributes} restProps - Demais propriedades HTML
 * 
 * @returns {JSX.Element} Lista de benefícios do Banner Body
 */
export const Benefits = ({
  className = '',
  children,
  ...restProps
}: BenefitsProps) => {
  return (
    <ul
      className={joinClasses(['banner-body__benefits', className])}
      {...restProps}
    >
      {children}
    </ul>
  )
}
