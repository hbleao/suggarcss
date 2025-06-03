import { Typography } from "../Typography";
import "./styles.scss";

import type { CardTestimonialProps } from "./types";

/**
 * Componente `CardTestimonial` — Card para exibição de depoimentos ou avaliações.
 *
 * Exibe imagem do autor, nome, cargo, data e o texto do depoimento. Ideal para seções de feedback,
 * cases de sucesso, provas sociais ou páginas institucionais.
 *
 * @component
 *
 * @example
 * ```tsx
 * <CardTestimonial
 *   theme="light"
 *   image={<img src="/avatar.jpg" alt="João Silva" />}
 *   name="João Silva"
 *   position="Diretor de Marketing"
 *   date="Janeiro 2025"
 *   text="Este produto superou todas as minhas expectativas. Recomendo fortemente para todos que buscam qualidade e eficiência."
 * />
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} [props.image] - Elemento de imagem, geralmente um avatar do autor do depoimento
 * @param {string} [props.name] - Nome da pessoa que fez o depoimento
 * @param {string} [props.position] - Cargo ou função da pessoa
 * @param {string} [props.date] - Data do depoimento ou avaliação
 * @param {string} [props.text] - Conteúdo principal do depoimento
 * @param {boolean} [props.showSeparator=true] - Define se uma linha separadora será exibida entre o cabeçalho e o conteúdo
 * @param {React.HTMLAttributes<HTMLDivElement>} props.restProps - Propriedades HTML adicionais aplicadas ao contêiner principal
 *
 * @returns {JSX.Element} Elemento JSX representando o card de depoimento
 */

export const CardTestimonial = ({
	image,
	name,
	position,
	date,
	text,
	showSeparator = true,
	...restProps
}: CardTestimonialProps) => {
	return (
		<div className="card-testimonial" {...restProps}>
			<div className="card-testimonial__header">
				{image && <div className="card-testimonial__image">{image}</div>}

				<div className="card-testimonial__info">
					{name && (
						<Typography
							as="h3"
							variant="body1"
							weight="bold"
							className="card-testimonial__name"
						>
							{name}
						</Typography>
					)}

					{position && (
						<Typography
							as="p"
							variant="body2"
							className="card-testimonial__position"
						>
							{position}
						</Typography>
					)}

					{date && (
						<Typography
							as="span"
							variant="caption"
							className="card-testimonial__date"
						>
							{date}
						</Typography>
					)}
				</div>
			</div>

			{showSeparator && <hr className="card-testimonial__separator" />}

			<div className="card-testimonial__content">
				{text && (
					<Typography as="p" variant="body1" className="card-testimonial__text">
						{text}
					</Typography>
				)}
			</div>
		</div>
	);
};
