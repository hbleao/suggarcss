import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

export type StoresProps = HTMLAttributes<HTMLDivElement>

export const Stores = ({
  className = '',
  children,
  ...restProps
}: StoresProps) => {
  return (
    <div
      className={joinClasses(['banner-hero__stores', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
