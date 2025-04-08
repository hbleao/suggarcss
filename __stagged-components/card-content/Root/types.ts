import { HTMLAttributes, ReactNode } from 'react'

export type RootProps = HTMLAttributes<HTMLDivElement> & {
  theme?: 'light' | 'dark'
  title?: string
  description?: string
  imageSrc?: string
  buttonText?: string
  onClick?: () => void
  children?: ReactNode
}
