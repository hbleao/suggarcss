import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type ButtonsProps = HTMLAttributes<HTMLElement>

/**
 * Container para agrupar botões no BannerBody
 * 
 * @example
 * <BannerBody.Buttons>
 *   <Button>Primary Action</Button>
 *   <Button variant="secondary">Secondary Action</Button>
 * </BannerBody.Buttons>
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Conteúdo dos botões
 */
export const Buttons = ({
  className = '',
  children,
  ...restProps
}: ButtonsProps) => {
  return (
    <div
      className={joinClasses(['banner-body__buttons', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
