import { HTMLAttributes } from "react"

type Size = 'small'  | 'large'
type Styles = 'primary' | 'secondary' | 'ghost'
type Variant =
  | 'insurance'
  | 'banking'
  | 'health'
  | 'danger'
  | 'negative'
  | 'disabled'

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  size?: Size
  styles?: Styles
  width?: 'contain' | 'fluid'
  variant?: Variant
  isLoading?: boolean
}
