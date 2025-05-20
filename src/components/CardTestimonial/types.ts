import type { HTMLAttributes, ReactNode } from 'react';

export interface CardTestimonialProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Imagem do autor do depoimento
	 */
	image?: ReactNode;

	/**
	 * Nome do autor do depoimento
	 */
	name?: ReactNode;

	/**
	 * Cargo/posição do autor do depoimento
	 */
	position?: ReactNode;

	/**
	 * Data do depoimento
	 */
	date?: ReactNode;

	/**
	 * Texto do depoimento
	 */
	text?: ReactNode;

	/**
	 * Exibir separador entre o cabeçalho e o conteúdo
	 * @default true
	 */
	showSeparator?: boolean;
}
