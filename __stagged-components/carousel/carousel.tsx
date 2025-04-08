import SlickSlider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './styles.scss'

import { CarouselProps } from './types'

export const Carousel = ({ settings, children, ...restProps }: CarouselProps) => {
  return (
    <div className="carousel" {...restProps}>
      <SlickSlider {...settings}>{children}</SlickSlider>
    </div>
  )
}
