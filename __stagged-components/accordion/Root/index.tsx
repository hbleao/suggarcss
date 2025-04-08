import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RootProps } from './types'

/**
 * Accordion Root Component
 * 
 * @component
 * @example
 * <Accordion.Root variant="default" border="base">
 *   <Accordion.Item>
 *     <Accordion.Trigger>
 *       <Accordion.Title>Title</Accordion.Title>
 *       <Accordion.Icon />
 *     </Accordion.Trigger>
 *     <Accordion.Content>Content</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS class
 * @param {'default' | 'negative'} [props.variant='default'] - Visual variant
 * @param {'top' | 'base' | 'none'} [props.border='base'] - Border style
 * @param {React.ReactNode} props.children - Accordion items
 * @returns {JSX.Element} Accordion root container
 */

export const Root = ({
  className = '',
  variant = 'default',
  border = 'base',
  children,
  ...restProps
}: RootProps) => {
  return (
    <div
      className={joinClasses([
        'accordion__root',
        `--${variant}`,
        `--border-${border}`,
        className,
      ])}
      {...restProps}
    >
      {children}
    </div>
  )
}
