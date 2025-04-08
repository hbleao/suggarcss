import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type ImageProps = HTMLAttributes<HTMLDivElement>

/**
 * Componente Image - Container para imagem do Banner Body
 * 
 * @component
 * @example
 * ```tsx
 * <Image className="custom-class">
 *   <img src="image.jpg" alt="Descrição" />
 * </Image>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Elemento img ou conteúdo da imagem
 * @param {HTMLAttributes} restProps - Demais propriedades HTML
 * 
 * @returns {JSX.Element} Container para imagem do Banner Body
 */
export const Image = ({
  className = '',
  children,
  ...restProps
}: ImageProps) => {
  return (
    <div
      className={joinClasses(['banner-body__image', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
