import "./styles.scss";

import type { RootProps } from "./types";

/**
 * Componente Breadcrumb utilizado para auxiliar o usuário a navegar no sistema,
 * exibindo uma trilha de navegação com links para páginas anteriores.
 *
 * @component
 * @param {Object} props - As propriedades do componente Breadcrumb
 * @param {Array<{label: string, link: string}>} props.breadcrumbList - Lista de itens do breadcrumb, cada um com label e link
 *
 * @example
 * // Breadcrumb básico com um único item
 * <Breadcrumb breadcrumbList={[{ label: 'Home', link: '/' }]} />
 *
 * @example
 * // Breadcrumb com múltiplos níveis de navegação
 * <Breadcrumb 
 *   breadcrumbList={[
 *     { label: 'Home', link: '/' },
 *     { label: 'Produtos', link: '/produtos' },
 *     { label: 'Detalhes', link: '/produtos/detalhes' }
 *   ]} 
 * />
 *
 * @returns {JSX.Element} Componente Breadcrumb renderizado
 */

export const Breadcrumb = ({ breadcrumbList, ...restProps }: RootProps) => {
	return (
		<div className="breadcrumb" {...restProps}>
			<ul className="breadcrumb__list">
				{breadcrumbList.length > 0 &&
					breadcrumbList.map((breadcrumb) => (
						<li key={breadcrumb.label} className="breadcrumb__list-item">
							<a href={breadcrumb.link}>{breadcrumb.label}</a>
						</li>
					))}
			</ul>
		</div>
	);
};
