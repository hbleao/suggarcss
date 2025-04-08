import { Loader } from '@porto-ocean/loader'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ButtonProps } from './types'

export const Button = ({
  variant = 'insurance',
  styles = 'primary',
  size = 'large',
  width = 'contain',
  isLoading = false,
  className = '',
  children,
  ...restProps
}: ButtonProps) => {
  const custom_className = `btn --${variant}-${styles} --${width} --${size}`

  return (
    <button
      className={joinClasses([className, custom_className])}
      {...restProps}
    >
      {isLoading ? <Loader /> : children}
    </button>
  )
}

Button.displayName = 'Button'
