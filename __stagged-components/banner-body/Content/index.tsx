import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ContentProps } from './types'

/**
 * Componente Content - Área de conteúdo principal do Banner Body
 * 
 * @component
 * @example
 * ```tsx
 * <Content className="custom-class">
 *   <h1>Título</h1>
 *   <p>Descrição do conteúdo</p>
 * </Content>
 * ```
 * 
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Conteúdo a ser renderizado dentro do componente
 * @param {HTMLAttributes} restProps - Demais propriedades HTML
 * 
 * @returns {JSX.Element} Componente de conteúdo do Banner Body
 */
export const Content = ({
  className = '',
  children,
  ...restProps
}: ContentProps) => {
  return (
    <div
      className={joinClasses(['banner-body__content', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
