import { HTMLAttributes } from 'react'

export type RootProps = HTMLAttributes<HTMLDivElement> & {
  filled?: boolean
  variant?: 'outlined' | 'default'
  width?: 'fluid' | 'contain'
  disabled?: boolean
  error?: boolean
}
