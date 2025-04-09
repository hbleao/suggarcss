import { HTMLAttributes } from 'react'

export type RowProps = HTMLAttributes<HTMLDivElement> & {
  mobile?: number[]
  portrait?: number[]
  landscape?: number[]
  desktop?: number[]
  wide?: number[]
}
