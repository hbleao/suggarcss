import { DetailedHTMLProps } from "react"

export type RootProps = DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  filled?: boolean
  variant?: 'outlined' | 'default'
  width?: 'fluid' | 'contain'
  disabled?: boolean
  error?: boolean
}
