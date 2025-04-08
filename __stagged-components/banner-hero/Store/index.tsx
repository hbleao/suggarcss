import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

export type StoreProps = HTMLAttributes<HTMLAnchorElement>

export const Store = ({
  className = '',
  children,
  ...restProps
}: StoreProps) => {
  return (
    <a className={joinClasses(['banne-hero__store', className])} {...restProps}>
      {children}
    </a>
  )
}
