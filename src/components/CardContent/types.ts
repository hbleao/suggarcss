import type { HTMLAttributes, ReactNode } from 'react';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Define o tema do card
	 * @default 'light'
	 */
	theme?: 'light' | 'dark';

	/**
	 * Título do card
	 */
	title?: ReactNode;

	/**
	 * Descrição do card
	 */
	description?: ReactNode;

	/**
	 * Imagem do card
	 */
	image?: ReactNode;

	/**
	 * Botões do card
	 */
	links?: {
		label: string;
		href: string;
	}[];

	/**
	 * Classe CSS adicional
	 * @default ''
	 */
	className?: string;
}

export interface CardContentButton {
	/**
	 * Texto do botão
	 */
	label: ReactNode;
}
