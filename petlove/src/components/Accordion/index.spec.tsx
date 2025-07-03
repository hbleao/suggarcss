import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './index';

jest.mock('./styles.scss', () => ({}));

describe('Accordion', () => {
	it('should render correctly with default values', () => {
		render(
			<Accordion title="Título do Accordion">
				<p>Conteúdo do accordion</p>
			</Accordion>,
		);

		const title = screen.getByText('Título do Accordion');
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('accordion__title');

		const icon = screen.getByTitle('arrow');
		expect(icon).toBeInTheDocument();
		expect(icon.parentElement).toHaveClass('accordion__icon');

		const content = screen.queryByText('Conteúdo do accordion');
		expect(content).not.toBeInTheDocument();

		const accordion = title.closest('.accordion__root');
		expect(accordion).toHaveClass('--default');
		expect(accordion).toHaveClass('--border-base');
		expect(accordion).toHaveClass('--fluid');
	});

	it('should expand and collapse when clicking on the trigger', () => {
		render(
			<Accordion title="Título do Accordion">
				<p>Conteúdo do accordion</p>
			</Accordion>,
		);

		let content = screen.queryByText('Conteúdo do accordion');
		expect(content).not.toBeInTheDocument();

		const titleElement = screen.getByText('Título do Accordion');
		const trigger = titleElement.closest('.accordion__trigger');
		expect(trigger).not.toBeNull();
		if (trigger) fireEvent.click(trigger);

		content = screen.getByText('Conteúdo do accordion');
		expect(content).toBeInTheDocument();
		expect(content.parentElement).toHaveClass('accordion__content');

		const icon = screen.getByTitle('arrow');
		expect(icon).toHaveClass('--up');
		expect(icon).not.toHaveClass('--down');

		if (trigger) fireEvent.click(trigger);

		content = screen.queryByText('Conteúdo do accordion');
		expect(content).not.toBeInTheDocument();

		const updatedIcon = screen.getByTitle('arrow');
		expect(updatedIcon).toHaveClass('--down');
		expect(updatedIcon).not.toHaveClass('--up');
	});

	it('should expand and collapse when pressing a key on the trigger', () => {
		render(
			<Accordion title="Título do Accordion">
				<p>Conteúdo do accordion</p>
			</Accordion>,
		);

		let content = screen.queryByText('Conteúdo do accordion');
		expect(content).not.toBeInTheDocument();

		const titleElement = screen.getByText('Título do Accordion');
		const trigger = titleElement.closest('.accordion__trigger');
		expect(trigger).not.toBeNull();
		if (trigger) fireEvent.keyDown(trigger);

		content = screen.getByText('Conteúdo do accordion');
		expect(content).toBeInTheDocument();

		if (trigger) fireEvent.keyDown(trigger);

		content = screen.queryByText('Conteúdo do accordion');
		expect(content).not.toBeInTheDocument();
	});

	it('should render with negative variant', () => {
		render(
			<Accordion title="Título do Accordion" variant="negative">
				<p>Conteúdo do accordion</p>
			</Accordion>,
		);

		const accordion = screen
			.getByText('Título do Accordion')
			.closest('.accordion__root');
		expect(accordion).toHaveClass('--negative');
		expect(accordion).not.toHaveClass('--default');
	});

	it('should render with top border', () => {
		render(
			<Accordion title="Título do Accordion" border="top">
				<p>Conteúdo do accordion</p>
			</Accordion>,
		);

		const accordion = screen
			.getByText('Título do Accordion')
			.closest('.accordion__root');
		expect(accordion).toHaveClass('--border-top');
		expect(accordion).not.toHaveClass('--border-base');
	});

	it('should render with no border', () => {
		render(
			<Accordion title="Título do Accordion" border="none">
				<p>Conteúdo do accordion</p>
			</Accordion>,
		);

		const accordion = screen
			.getByText('Título do Accordion')
			.closest('.accordion__root');
		expect(accordion).toHaveClass('--border-none');
		expect(accordion).not.toHaveClass('--border-base');
	});

	it('should render with contain width', () => {
		render(
			<Accordion title="Título do Accordion" width="contain">
				<p>Conteúdo do accordion</p>
			</Accordion>,
		);

		const accordion = screen
			.getByText('Título do Accordion')
			.closest('.accordion__root');
		expect(accordion).toHaveClass('--contain');
		expect(accordion).not.toHaveClass('--fluid');
	});

	it('should render with complex content', () => {
		render(
			<Accordion title="Título do Accordion">
				<div>
					<h3>Subtítulo</h3>
					<p>Parágrafo 1</p>
					<p>Parágrafo 2</p>
					<button type="button">Botão de ação</button>
				</div>
			</Accordion>,
		);

		const trigger = screen
			.getByText('Título do Accordion')
			.closest('.accordion__trigger');
		expect(trigger).not.toBeNull();
		if (trigger) fireEvent.click(trigger);

		expect(screen.getByText('Subtítulo')).toBeInTheDocument();
		expect(screen.getByText('Subtítulo')).toBeInTheDocument();
		expect(screen.getByText('Parágrafo 1')).toBeInTheDocument();
		expect(screen.getByText('Parágrafo 2')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Botão de ação' }),
		).toBeInTheDocument();
	});

	it('should render with a long title', () => {
		const longTitle =
			'Este é um título muito longo para o accordion que pode quebrar em múltiplas linhas dependendo do tamanho do container';

		render(
			<Accordion title={longTitle}>
				<p>Conteúdo do accordion</p>
			</Accordion>,
		);

		const title = screen.getByText(longTitle);
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('accordion__title');
	});

	it('should render with multiple custom properties', () => {
		render(
			<Accordion
				title="Título do Accordion"
				variant="negative"
				border="none"
				width="contain"
			>
				<p>Conteúdo do accordion</p>
			</Accordion>,
		);

		const accordion = screen
			.getByText('Título do Accordion')
			.closest('.accordion__root');
		expect(accordion).toHaveClass('--negative');
		expect(accordion).toHaveClass('--border-none');
		expect(accordion).toHaveClass('--contain');
	});
});
