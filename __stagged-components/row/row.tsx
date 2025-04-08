import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RowProps } from './types'

export const Row = ({
  mobile = [1, 9],
  portrait = [1, 9],
  landscape = [1, 13],
  desktop = [1, 13],
  wide = [1, 13],
  className = '',
  children,
  ...restProps
}: RowProps) => {
  const sm = `startMobile-${mobile[0]} endMobile-${mobile[1]}`
  const md = `startPortrait-${portrait[0]} endPortrait-${portrait[1]}`
  const lg = `startLandscape-${landscape[0]} endLandscape-${landscape[1]}`
  const xl = `startDesktop-${desktop[0]} endDesktop-${desktop[1]}`
  const xxl = `startWide-${wide[0]} endWide-${wide[1]}`

  return (
    <div
      className={joinClasses(['row', sm, md, lg, xl, xxl, className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
