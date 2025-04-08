import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type ButtonsProps = HTMLAttributes<HTMLDivElement>

/**
 * Componente Buttons - Container para agrupar botões no Banner Hero
 * 
 * @component
 * @example
 * ```tsx
 * <Buttons className="custom-class">
 *   <Button>Botão 1</Button>
 *   <Button>Botão 2</Button>
 * </Buttons>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Botões filhos
 * @param {HTMLAttributes} restProps - Demais propriedades HTML
 * 
 * @returns {JSX.Element} Div contendo os botões
 */
export const Buttons = ({
  className = '',
  children,
  ...restProps
}: ButtonsProps) => {
  return (
    <div
      className={joinClasses(['banner-hero__buttons', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
