import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type TextNoteProps = HTMLAttributes<HTMLParagraphElement>

/**
 * Componente TextNote - Exibe uma nota de texto no Banner Body
 * 
 * @component
 * @example
 * ```tsx
 * <TextNote className="custom-class">
 *   Texto da nota
 * </TextNote>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Conteúdo da nota
 * @param {HTMLAttributes} restProps - Demais propriedades HTML
 * 
 * @returns {JSX.Element} Elemento p contendo a nota de texto
 */
export const TextNote = ({
  className = '',
  children,
  ...restProps
}: TextNoteProps) => {
  return (
    <p
      className={joinClasses(['banner-body__text-note', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
