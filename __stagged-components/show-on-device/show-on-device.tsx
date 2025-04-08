import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ShowOnDeviceProps } from './types'

export const ShowOnDevice = ({
  lessThan,
  greaterThan,
  media,
  children,
}: ShowOnDeviceProps) => {
  const device = greaterThan ? 'greaterThan' : 'lessThan'

  return (
    <div className={joinClasses(['show-on-device', `${device}`, `${media}`])}>
      {children}
    </div>
  )
}
