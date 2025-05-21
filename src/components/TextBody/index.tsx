import "./styles.scss";

import { Typography } from "@/components";

import { Button } from "../Button";

import type { TextBodyProps } from "./types";

/**
 * `TextBody` — Componente de bloco textual com título, subtítulo, descrição e botões.
 *
 * Usado para exibir conteúdos textuais centralizados ou destacados com estrutura semântica clara,
 * ideal para seções informativas, mensagens promocionais, chamadas para ação ou introduções.
 *
 * @component
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} [props.title="title"] - Título principal do bloco
 * @param {string} [props.subtitle] - Subtítulo ou destaque complementar
 * @param {string} [props.text] - Texto descritivo principal (aceita HTML via `dangerouslySetInnerHTML`)
 * @param {Array<{ label: string } & React.ComponentProps<typeof Button>>} props.buttons - Lista de botões renderizados abaixo do texto
 * @param {string} [props.className=""] - Classe CSS adicional para personalização externa
 * @param {React.HTMLAttributes<HTMLDivElement>} props.restProps - Atributos HTML adicionais para o container principal
 *
 * @example
 * <TextBody
 *   title="Plano Completo"
 *   subtitle="Cobertura ideal para sua família"
 *   text="<p>Desfrute dos melhores benefícios com o plano que mais combina com você.</p>"
 *   buttons={[
 *     { label: "Saiba mais", variant: "insurance", styles: "secondary" },
 *     { label: "Contratar", variant: "insurance", styles: "primary" },
 *   ]}
 * />
 *
 * @returns {JSX.Element} Bloco visual com textos e botões renderizado
 */

export const TextBody = ({
	title = "title",
	subtitle = "",
	text = "",
	buttons,
	className = "",
	...restProps
}: TextBodyProps) => {
	return (
		<div className="text-body__root" {...restProps}>
			<Typography
				variant="title4"
				weight="medium"
				as="h3"
				className="text-body__title"
			>
				{title}
			</Typography>

			{!!subtitle && (
				<Typography
					variant="body1"
					weight="bold"
					as="p"
					color="neutral-700"
					className="text-body__subtitle"
				>
					{subtitle}
				</Typography>
			)}

			{text && (
				<Typography
					variant="body2"
					weight="regular"
					as="p"
					className="text-body__text"
				>
					{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
					<span dangerouslySetInnerHTML={{ __html: text }} />
				</Typography>
			)}
			{buttons.length > 0 && (
				<div className="text-body__buttons" {...restProps}>
					{buttons.map((button) => (
						<Button key={button.label} {...button}>
							{button.label}
						</Button>
					))}
				</div>
			)}
		</div>
	);
};
