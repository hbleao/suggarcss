/**
 * Componente Button - Botão reutilizável para o Banner Hero
 *
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Clique aqui
 * </Button>
 * ```
 *
 * @param {ReactNode} children - Conteúdo do botão
 * @param {ButtonProps} restProps - Propriedades do botão base
 *
 * @returns {JSX.Element} Componente ButtonBase com as propriedades passadas
 */
export const Button = ({ children, ...restProps }: any) => {
	return <button {...restProps}>{children}</button>;
};
