import { Grid } from '@porto-ocean/grid'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RootProps } from './types'

export const Root = ({ className = '', children, ...restProps }: RootProps) => {
  return (
    <footer className={joinClasses(['footer__root', className])} {...restProps}>
      <Grid>{children}</Grid>
    </footer>
  )
}
