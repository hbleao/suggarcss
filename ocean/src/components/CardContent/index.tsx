import Image from "next/image";

import "./styles.scss";

import { Link } from "../Link";
import { Typography } from "../Typography";

import type { CardContentProps } from "./types";

/**
 * Componente `CardContent` para exibição estruturada de conteúdo em formato de cartão.
 *
 * Ideal para apresentar informações como produtos, serviços, planos ou artigos com suporte para imagem,
 * título, descrição e links de ação. Permite personalização visual por meio de temas e estilos adicionais.
 *
 * @component
 *
 * @example
 * ```tsx
 * <CardContent
 *   theme="light"
 *   title="Seguro Auto"
 *   description="Proteção completa para seu veículo com as melhores coberturas."
 * />
 *
 * <CardContent
 *   theme="dark"
 *   title="Investimentos"
 *   description="As melhores opções de investimento para seu perfil."
 *   image={<img src="/img/investimentos.jpg" alt="Investimentos" />}
 *   links={[{ label: "Saiba mais", href: "/investimentos" }]}
 * />
 * ```
 *
 * @param {Object} props - Propriedades do componente.
 * @param {'light' | 'dark'} [props.theme='light'] - Tema visual do cartão.
 * @param {React.ReactNode} [props.title] - Título principal exibido no cartão.
 * @param {TypographyProps} [props.titleProps] - Propriedades extras para o título (usado com o componente Typography).
 * @param {React.ReactNode} [props.description] - Texto descritivo ou corpo do cartão.
 * @param {TypographyProps} [props.descriptionProps] - Propriedades extras para a descrição.
 * @param {React.ReactNode} [props.image] - Elemento de imagem opcional exibido no topo do cartão.
 * @param {{ label: string; href: string }[]} [props.links=[]] - Lista de links de ação com `label` e `href`.
 * @param {string} [props.className=''] - Classe CSS adicional para customização do estilo externo.
 * @param {React.HTMLAttributes<HTMLDivElement>} props.restProps - Atributos HTML padrão aplicáveis à `<div>` raiz.
 *
 * @returns {JSX.Element} Elemento JSX renderizado do cartão.
 */
export const CardContent = ({
	title,
	description,
	image,
	links = [],
	className = "",
	...restProps
}: CardContentProps) => {
	return (
		<div className="card-content" {...restProps}>
			{image && (
				<div className="card-content__image">
					<Image src={image.url} alt={image.alt} width={500} height={500} />
				</div>
			)}

			<div className="card-content__content">
				{title && (
					<Typography
						as="h3"
						variant="title5"
						weight="bold"
						className="card-content__title"
					>
						{title}
					</Typography>
				)}

				{description && (
					<Typography
						as="p"
						variant="body2"
						className="card-content__description"
					>
						{description}
					</Typography>
				)}

				{links.length > 0 && (
					<div className="card-content__links">
						{links.map((link) => (
							<Link key={link.label} href={link.href}>
								{link.label}
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
