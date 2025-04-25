import { HTMLAttributes } from 'react'
import { Settings } from 'react-slick'

export type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  settings: Settings
}
