import { Button } from '@porto-ocean/button'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export const MenuButton = ({
  className = '',
  children,
  ...restProps
}: any) => {
  return (
    <Button
      variant="insurance"
      styles="secondary"
      className={joinClasses(['menu__button', className])}
      {...restProps}
    >
      {children}
    </Button>
  )
}
