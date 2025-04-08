import { joinClasses } from '@porto-ocean/utils'
import { useState } from 'react'

import './styles.scss'

import { RootProps } from './types'

export const Root = ({
  className = '',
  variant = 'default',
  width = 'contain',
  filled = false,
  disabled = false,
  error = false,
  children,
  ...restProps
}: RootProps) => {
  const [focused, setFocused] = useState('');
  const disabledClass = disabled ? '--disabled' : '';
  const errorClass = error ? '--error' : '';
  const filledClass = filled ? '--filled' : '';

  const handleFocus = (isFocus: boolean) => {
    if (disabled || error) return
    isFocus ? setFocused('--focused') : setFocused('')
  }

  return (
    <div
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
      className={joinClasses([
        'input__root',
        `--${variant}`,
        `--${width}`,
        `${filledClass}`,
        `${focused}`,
        `${disabledClass}`,
        `${errorClass}`,
        className,
      ])}
      {...restProps}
    >
      {children}
    </div>
  )
}
