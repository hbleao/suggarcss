import { joinClasses } from '@porto-ocean/utils'
import { Row } from '@porto-ocean/row'

import './styles.scss'

import { ColumnProps } from './types'

export const Column = ({
  className = '',
  mobile = [1, 9],
  portrait = [1, 9],
  landscape = [1, 13],
  desktop = [1, 13],
  wide = [1, 13],
  children,
  ...restProps
}: ColumnProps) => {
  return (
    <Row
      mobile={mobile}
      portrait={portrait}
      landscape={landscape}
      desktop={desktop}
      wide={wide}
      className={joinClasses(['footer__column', className])}
      {...restProps}
    >
      {children}
    </Row>
  )
}
