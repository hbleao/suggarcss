import { Grid } from '@porto-ocean/grid'

/**
 * Componente Container - Wrapper para o conteúdo do Banner Hero
 * 
 * @component
 * @example
 * ```tsx
 * <Container>
 *   <Title>Título</Title>
 *   <Content>Conteúdo</Content>
 * </Container>
 * ```
 * 
 * @param {ReactNode} children - Conteúdo do container
 * @param {any} props - Propriedades do Grid
 * 
 * @returns {JSX.Element} Componente Grid com o conteúdo
 */
export const Container = (props: any) => {
  return <Grid {...props}>{props.children}</Grid>
}
