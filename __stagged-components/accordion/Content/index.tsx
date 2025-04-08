import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ContentProps } from './types'

/**
 * Accordion Content Component
 * 
 * @component
 * @example
 * <Accordion.Content>
 *   Content goes here
 * </Accordion.Content>
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS class
 * @param {React.ReactNode} props.children - Content to be displayed
 * @returns {JSX.Element} Accordion content container
 */

export const Content = ({
  className = '',
  children,
  ...restProps
}: ContentProps) => {
  return (
    <div
      className={joinClasses(['accordion__content', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
