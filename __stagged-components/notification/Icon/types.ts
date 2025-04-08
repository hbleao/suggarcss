import { HTMLAttributes } from 'react'

export type IconProps = HTMLAttributes<HTMLDivElement> & {
  iconName: string
  iconSide?: 'left' | 'right'
}
