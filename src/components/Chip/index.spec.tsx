import { render, screen } from "@testing-library/react";
import { Chip } from "./index";

jest.mock("./styles.scss", () => ({}));

describe("Chip", () => {
	it("deve renderizar corretamente com valores padrão", () => {
		render(<Chip data-testid="chip">Texto do chip</Chip>);

		const chip = screen.getByTestId("chip");
		expect(chip).toBeInTheDocument();
		expect(chip).toHaveClass("chip");
		expect(chip).toHaveClass("--default");

		const text = screen.getByText("Texto do chip");
		expect(text).toBeInTheDocument();
		expect(text).toHaveClass("chip__text");
	});

	it("deve renderizar com variante selecionada", () => {
		render(
			<Chip variant="selected" data-testid="chip">
				Texto do chip
			</Chip>,
		);

		const chip = screen.getByTestId("chip");
		expect(chip).toHaveClass("--selected");
		expect(chip).not.toHaveClass("--default");
	});

	it("deve renderizar o conteúdo filho corretamente", () => {
		render(
			<Chip data-testid="chip">
				<span data-testid="custom-content">Conteúdo personalizado</span>
			</Chip>,
		);

		const customContent = screen.getByTestId("custom-content");
		expect(customContent).toBeInTheDocument();
		expect(customContent).toHaveTextContent("Conteúdo personalizado");
		expect(customContent.parentElement).toHaveClass("chip__text");
	});

	it("deve renderizar sem conteúdo", () => {
		render(<Chip data-testid="chip" />);

		const chip = screen.getByTestId("chip");
		expect(chip).toBeInTheDocument();

		const textContainer = chip.querySelector(".chip__text");
		expect(textContainer).toBeInTheDocument();
		expect(textContainer).toBeEmptyDOMElement();
	});

	it("deve passar atributos HTML adicionais para o elemento raiz", () => {
		render(
			// biome-ignore lint/a11y/useSemanticElements: <explanation>
			<Chip 
				data-testid="chip" 
				aria-label="Chip de exemplo" 
				title="Título do chip"
				role="status"
			>
				Texto do chip
			</Chip>,
		);

		const chip = screen.getByTestId("chip");
		expect(chip).toHaveAttribute("aria-label", "Chip de exemplo");
		expect(chip).toHaveAttribute("title", "Título do chip");
		expect(chip).toHaveAttribute("role", "status");
	});
});
