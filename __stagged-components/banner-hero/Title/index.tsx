import { Typography, TypographyProps } from '@porto-ocean/typography'
import { joinClasses } from '@porto-ocean/utils'

export type TitleProps = TypographyProps

/**
 * Componente Title - Título principal do Banner Hero
 * 
 * @component
 * @example
 * ```tsx
 * <Title className="custom-class">
 *   Título do Banner
 * </Title>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Texto do título
 * @param {TypographyProps} restProps - Propriedades do Typography
 * 
 * @returns {JSX.Element} Componente Typography configurado como título
 */
export const Title = ({
  className = '',
  children,
  ...restProps
}: TitleProps) => {
  return (
    <Typography
      className={joinClasses(['banner-hero__title', className])}
      {...restProps}
      as="h2"
      variant="title2"
      weight="bold"
      style={{ marginBottom: '12px' }}
    >
      {children}
    </Typography>
  )
}
