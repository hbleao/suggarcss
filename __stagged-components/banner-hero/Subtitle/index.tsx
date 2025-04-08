import { Typography, TypographyProps } from '@porto-ocean/typography'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type SubtitleProps = TypographyProps

/**
 * Componente Subtitle - Subtítulo do Banner Hero
 * 
 * @component
 * @example
 * ```tsx
 * <Subtitle className="custom-class">
 *   Subtítulo do Banner
 * </Subtitle>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Texto do subtítulo
 * @param {TypographyProps} restProps - Propriedades do Typography
 * 
 * @returns {JSX.Element} Componente Typography configurado como subtítulo
 */
export const Subtitle = ({
  className = '',
  children,
  ...restProps
}: SubtitleProps) => {
  return (
    <Typography
      className={joinClasses(['banner-hero__subtitle', className])}
      {...restProps}
      as="p"
      variant="overline"
      weight="bold"
    >
      {children}
    </Typography>
  )
}
