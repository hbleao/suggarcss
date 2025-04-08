import { HTMLAttributes } from 'react'

export type RootProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'negative'
  border?: 'top' | 'base' | 'none'
}
