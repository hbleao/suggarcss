import { HTMLAttributes } from 'react'

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  isOpen: boolean
}
