import { useMediaQuery, useWindowSize } from '@/hooks';
import { render, screen } from '@testing-library/react';
import { Column } from './index';

// Mock dos hooks
jest.mock('@/hooks', () => ({
	useMediaQuery: jest.fn(),
	useWindowSize: jest.fn(),
}));

describe('Column', () => {
	beforeEach(() => {
		// Configuração padrão para os mocks
		(useMediaQuery as jest.Mock).mockReturnValue(false);
		(useWindowSize as jest.Mock).mockReturnValue({ width: 375, height: 667 });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('deve renderizar corretamente com valores padrão', () => {
		render(
			<Column data-testid="column">
				<div>Conteúdo da coluna</div>
			</Column>,
		);

		const column = screen.getByTestId('column');
		expect(column).toBeInTheDocument();
		expect(column).toHaveStyle({
			gridColumnStart: 1,
			gridColumnEnd: 13,
		});

		// Verificar se o conteúdo foi renderizado
		expect(column).toHaveTextContent('Conteúdo da coluna');
	});

	it('deve aplicar configurações mobile quando a tela for pequena', () => {
		// Configurar o mock para simular tela mobile
		(useMediaQuery as jest.Mock).mockImplementation((query) => {
			return query === '(min-width: 600px)';
		});
		(useWindowSize as jest.Mock).mockReturnValue({ width: 600, height: 800 });

		render(
			<Column mobile={[2, 8]} data-testid="column">
				<div>Conteúdo da coluna</div>
			</Column>,
		);

		const column = screen.getByTestId('column');
		expect(column).toHaveStyle({
			gridColumnStart: 2,
			gridColumnEnd: 8,
		});
	});

	it('deve aplicar configurações tablet portrait quando a tela for média', () => {
		// Configurar o mock para simular tela tablet portrait
		(useMediaQuery as jest.Mock).mockImplementation((query) => {
			if (query === '(min-width: 600px)') return true;
			if (query === '(min-width: 1024px)') return true;
			return false;
		});
		(useWindowSize as jest.Mock).mockReturnValue({ width: 1024, height: 768 });

		render(
			<Column tabletPortrait={[3, 10]} data-testid="column">
				<div>Conteúdo da coluna</div>
			</Column>,
		);

		const column = screen.getByTestId('column');
		expect(column).toHaveStyle({
			gridColumnStart: 3,
			gridColumnEnd: 10,
		});
	});

	it('deve aplicar configurações tablet landscape quando a tela for grande', () => {
		// Configurar o mock para simular tela tablet landscape
		(useMediaQuery as jest.Mock).mockImplementation((query) => {
			if (query === '(min-width: 600px)') return true;
			if (query === '(min-width: 1024px)') return true;
			if (query === '(min-width: 1240px)') return true;
			return false;
		});
		(useWindowSize as jest.Mock).mockReturnValue({ width: 1240, height: 900 });

		render(
			<Column tabletLandscape={[2, 12]} data-testid="column">
				<div>Conteúdo da coluna</div>
			</Column>,
		);

		const column = screen.getByTestId('column');
		expect(column).toHaveStyle({
			gridColumnStart: 2,
			gridColumnEnd: 12,
		});
	});

	it('deve aplicar configurações desktop quando a tela for grande', () => {
		// Configurar o mock para simular tela desktop
		(useMediaQuery as jest.Mock).mockImplementation((query) => {
			if (query === '(min-width: 600px)') return true;
			if (query === '(min-width: 1024px)') return true;
			if (query === '(min-width: 1240px)') return true;
			if (query === '(min-width: 1440px)') return true;
			return false;
		});
		(useWindowSize as jest.Mock).mockReturnValue({ width: 1440, height: 900 });

		render(
			<Column desktop={[3, 11]} data-testid="column">
				<div>Conteúdo da coluna</div>
			</Column>,
		);

		const column = screen.getByTestId('column');
		expect(column).toHaveStyle({
			gridColumnStart: 3,
			gridColumnEnd: 11,
		});
	});

	it('deve aplicar configurações wide quando a tela for muito grande', () => {
		// Configurar o mock para simular tela wide
		(useMediaQuery as jest.Mock).mockImplementation(() => true);
		(useWindowSize as jest.Mock).mockReturnValue({ width: 1920, height: 1080 });

		render(
			<Column wide={[4, 10]} data-testid="column">
				<div>Conteúdo da coluna</div>
			</Column>,
		);

		const column = screen.getByTestId('column');
		expect(column).toHaveStyle({
			gridColumnStart: 4,
			gridColumnEnd: 10,
		});
	});

	it('deve passar atributos adicionais para o elemento div', () => {
		render(
			<Column
				data-testid="column"
				className="custom-class"
				aria-label="Coluna de conteúdo"
			>
				<div>Conteúdo da coluna</div>
			</Column>,
		);

		const column = screen.getByTestId('column');
		expect(column).toHaveClass('custom-class');
		expect(column).toHaveAttribute('aria-label', 'Coluna de conteúdo');
	});

	it('deve atualizar o layout quando a largura da janela muda', () => {
		// Configuração inicial
		(useMediaQuery as jest.Mock).mockImplementation((query) => {
			return query === '(min-width: 600px)';
		});
		(useWindowSize as jest.Mock).mockReturnValue({ width: 600, height: 800 });

		const { rerender } = render(
			<Column mobile={[2, 8]} tabletPortrait={[3, 9]} data-testid="column">
				<div>Conteúdo da coluna</div>
			</Column>,
		);

		// Verificar estilo inicial
		const column = screen.getByTestId('column');
		expect(column).toHaveStyle({
			gridColumnStart: 2,
			gridColumnEnd: 8,
		});

		// Simular mudança para tablet portrait
		(useMediaQuery as jest.Mock).mockImplementation((query) => {
			if (query === '(min-width: 600px)') return true;
			if (query === '(min-width: 1024px)') return true;
			return false;
		});
		(useWindowSize as jest.Mock).mockReturnValue({ width: 1024, height: 768 });

		// Re-renderizar o componente
		rerender(
			<Column mobile={[2, 8]} tabletPortrait={[3, 9]} data-testid="column">
				<div>Conteúdo da coluna</div>
			</Column>,
		);

		// Verificar se o estilo foi atualizado
		expect(column).toHaveStyle({
			gridColumnStart: 3,
			gridColumnEnd: 9,
		});
	});
});
