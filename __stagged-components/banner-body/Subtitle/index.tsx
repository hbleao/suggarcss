import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type SubtitleProps = HTMLAttributes<HTMLParagraphElement>

/**
 * Componente Subtitle - Exibe o subtítulo do Banner Body
 * 
 * @component
 * @example
 * ```tsx
 * <Subtitle className="custom-class">
 *   Texto do subtítulo
 * </Subtitle>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Texto do subtítulo
 * @param {HTMLAttributes} restProps - Demais propriedades HTML
 * 
 * @returns {JSX.Element} Elemento p contendo o subtítulo
 */
export const Subtitle = ({
  className = '',
  children,
  ...restProps
}: SubtitleProps) => {
  return (
    <p
      className={joinClasses(['banner-body__subtitle', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
