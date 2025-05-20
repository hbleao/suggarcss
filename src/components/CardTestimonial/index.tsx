import { Typography } from '../Typography';
import './styles.scss';

import type { CardTestimonialProps } from './types';

/**
 * Componente CardTestimonial - Card para exibição de depoimentos
 *
 * @component
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
