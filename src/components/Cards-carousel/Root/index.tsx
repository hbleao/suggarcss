import { Carousel, CarouselProps } from '@porto-ocean/carousel'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type RootProps = CarouselProps

export const Root = ({
  settings,
  className = '',
  children,
  ...restProps
}: RootProps) => {
  return (
    <div
      className={joinClasses(['cards-carousel__root', className])}
      {...restProps}
    >
      <Carousel settings={settings}>{children}</Carousel>
    </div>
  )
}
