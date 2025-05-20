import './styles.scss';

import type { RootProps } from './types';

/**
 * O componente Breadcrumb é utilizado para auxiliar o usuário a navegar no sistema.
 *
 * @param breadcrumbList - Tipo da propriedade [{ label: 'Home', link: '#' }]
 *
 * @returns Um componente react do tipo React.JSX
 *
 * @example
 *
 * <Breadcurmb breadcrumbList={[{ label: 'Home', link: '#' }]} />
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
