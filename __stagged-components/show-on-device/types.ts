import { ReactNode } from 'react'

export type Media =
  | 'mobile'
  | 'tabletPortrait'
  | 'tabletLandscape'
  | 'desktop'
  | 'wide'

export type ShowOnDeviceProps = {
  lessThan?: boolean
  greaterThan?: boolean
  media: Media
  children: ReactNode
}
