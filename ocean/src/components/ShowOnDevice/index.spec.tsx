import { render, screen } from "@testing-library/react";
import { ShowOnDevice } from "./index";
import type { Media } from "./types";

// Mock dos estilos
jest.mock("./styles.scss", () => ({}));

// Mock do utilitário clsx
const mockClsx = jest.fn((...args: unknown[]) => args.filter(Boolean).join(" "));
jest.mock("@/utils/clsx", () => ({
	clsx: (...args: unknown[]) => mockClsx(...args),
}));

describe("<ShowOnDevice />", () => {
	beforeEach(() => {
		mockClsx.mockClear();
	});

	const renderComponent = (
		orientation: "greaterThan" | "lessThan",
		media: Media,
		content = "Conteúdo",
	) => {
		render(
			<ShowOnDevice
				orientation={orientation}
				media={media}
				data-testid="show-device"
			>
				<p>{content}</p>
			</ShowOnDevice>,
		);
		return screen.getByTestId("show-device");
	};

	it("renderiza com orientação 'greaterThan'", () => {
		const el = renderComponent("greaterThan", "desktop");
		
		// Verificar se o clsx foi chamado com os argumentos corretos
		expect(mockClsx).toHaveBeenCalledWith(
			"show-on-device",
			"greaterThan",
			"desktop"
		);
		
		expect(el).toHaveTextContent("Conteúdo");
	});

	it("renderiza com orientação 'lessThan'", () => {
		const el = renderComponent(
			"lessThan",
			"tabletLandscape",
			"Visível em telas menores que tabletLandscape",
		);
		
		// Verificar se o clsx foi chamado com os argumentos corretos
		expect(mockClsx).toHaveBeenCalledWith(
			"show-on-device",
			"lessThan",
			"tabletLandscape"
		);
		
		expect(el).toHaveTextContent(
			"Visível em telas menores que tabletLandscape",
		);
	});

	it.each([
		"mobile",
		"tabletPortrait",
		"tabletLandscape",
		"desktop",
		"wide",
	] as Media[])("adiciona corretamente a classe de media '%s'", (media) => {
		renderComponent("greaterThan", media);
		
		// Verificar se o clsx foi chamado com os argumentos corretos
		expect(mockClsx).toHaveBeenCalledWith(
			"show-on-device",
			"greaterThan",
			media
		);
	});

	it("renderiza filhos complexos corretamente", () => {
		render(
			<ShowOnDevice
				orientation="greaterThan"
				media="desktop"
				data-testid="show-device"
			>
				<div data-testid="complex-content">
					<h1>Header</h1>
					<p>Texto</p>
					<button type="button">Botão</button>
				</div>
			</ShowOnDevice>,
		);

		// Verificar se o clsx foi chamado com os argumentos corretos
		expect(mockClsx).toHaveBeenCalledWith(
			"show-on-device",
			"greaterThan",
			"desktop"
		);

		expect(screen.getByTestId("complex-content")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Header",
		);
		expect(screen.getByText("Texto")).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveTextContent("Botão");
	});

	// Teste adicional para verificar a propagação de props HTML
	it("propaga corretamente atributos HTML adicionais", () => {
		render(
			<ShowOnDevice
				orientation="greaterThan"
				media="desktop"
				data-testid="show-device"
				aria-label="Conteúdo para desktop"
				title="Conteúdo desktop"
			>
				<p>Conteúdo</p>
			</ShowOnDevice>
		);

		const el = screen.getByTestId("show-device");
		expect(el).toHaveAttribute("aria-label", "Conteúdo para desktop");
		expect(el).toHaveAttribute("title", "Conteúdo desktop");
	});
});
