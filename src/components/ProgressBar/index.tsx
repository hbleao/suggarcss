"use client";
import { useEffect, useState } from "react";
import s from "./styles.module.scss";

/**
 * Componente ProgressBar para exibir o progresso de uma operação.
 *
 * O componente ProgressBar fornece uma representação visual do progresso de uma operação,
 * como carregamento de página, upload de arquivo ou conclusão de etapas em um processo.
 * Suporta animação suave entre valores e personalização de cor.
 *
 * @component
 * @example
 * ```tsx
 * // Barra de progresso básica com valor fixo
 * <ProgressBar value={75} />
 * 
 * // Barra de progresso com cor personalizada
 * <ProgressBar 
 *   value={50} 
 *   color="#FF5500"
 * />
 * 
 * // Barra de progresso com valor inicial e valor final diferentes
 * <ProgressBar 
 *   initialValue={10}
 *   value={90}
 *   color="var(--portoSaude100)"
 * />
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {number} [props.initialValue=0] - Valor inicial da barra de progresso (0-100)
 *   Este valor é usado para iniciar a animação a partir de um determinado ponto
 * @param {number} props.value - Valor atual da barra de progresso (0-100)
 *   Determina o quanto da barra estará preenchido
 * @param {string} [props.color] - Cor de preenchimento da barra de progresso
 *   Pode ser qualquer valor de cor CSS válido (nome, hexadecimal, rgb, hsl, variável CSS)
 *   Se não for fornecido, usa a cor padrão #0046c0
 *
 * @returns {JSX.Element} O componente ProgressBar renderizado
 */

export type ProgressBarProps = {
	initialValue?: number;
	value: number;
	color?: string;
};

export const ProgressBar = ({
	initialValue = 0,
	value,
	color,
}: ProgressBarProps) => {
	const [barWidth, setBarWidth] = useState(initialValue);

	useEffect(() => {
		const timmer = setTimeout(() => {
			setBarWidth(value);
		}, 0);

		return () => {
			clearInterval(timmer);
		};
	}, [value]);

	return (
		<div className={s.progressBar}>
			<div
				className={s.progressBarFill}
				style={{
					width: `${barWidth}%`,
					backgroundColor: color || "#0046c0",
				}}
			/>
		</div>
	);
};
