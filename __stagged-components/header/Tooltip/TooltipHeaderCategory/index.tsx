import { ButtonHTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipHeaderCategoryProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isSelected?: boolean
  }

export const TooltipHeaderCategory = ({
  className = '',
  isSelected = false,
  children,
  ...restProps
}: TooltipHeaderCategoryProps) => {
  const selectClass = isSelected ? `isSelected` : ''

  return (
    <button
      className={joinClasses([
        'tooltip__header-category',
        selectClass,
        className,
      ])}
      {...restProps}
    >
      {children}
    </button>
  )
}
