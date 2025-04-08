import { HTMLAttributes } from 'react'

export type RootProps = HTMLAttributes<HTMLDivElement> & {
  theme?: 'light' | 'dark'
}
