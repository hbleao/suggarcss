import { IconProps as ComponentProps } from '@porto-ocean/icon'

export type IconProps = Omit<ComponentProps, 'iconName'> & {
  iconName?: string
  rotate?: boolean
}
