import { Row, RowProps } from '@porto-ocean/row'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type ContentProps = RowProps

/**
 * Componente Content - Área de conteúdo principal do Banner Hero
 * 
 * @component
 * @example
 * ```tsx
 * <Content className="custom-class">
 *   <Title>Título</Title>
 *   <Subtitle>Subtítulo</Subtitle>
 * </Content>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Conteúdo principal
 * @param {RowProps} restProps - Propriedades do Row
 * 
 * @returns {JSX.Element} Componente Row com o conteúdo
 */
export const Content = ({
  className = '',
  children,
  ...restProps
}: ContentProps) => {
  return (
    <Row
      className={joinClasses(['banner-hero__content', className])}
      {...restProps}
    >
      {children}
    </Row>
  )
}
