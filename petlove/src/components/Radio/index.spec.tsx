import { render, screen, fireEvent } from "@testing-library/react";

import { Radio } from "./index";

jest.mock("./styles.scss", () => ({}));

jest.mock("@/utils/clsx", () => {
	const mockClsx = jest.fn((...args: unknown[]) => {
		return args
			.map((arg) => {
				if (typeof arg === "string") return arg;
				if (typeof arg === "object" && arg !== null) {
					return Object.entries(arg)
						.filter(([_, value]) => Boolean(value))
						.map(([key]) => key)
						.join(" ");
				}
				return "";
			})
			.filter(Boolean)
			.join(" ");
	});

	return {
		clsx: mockClsx,
	};
});

describe("Radio", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("deve renderizar corretamente com valores padrão", () => {
		const { container } = render(<Radio data-testid="radio" />);

		const radio = screen.getByTestId("radio");
		expect(radio).toBeInTheDocument();
		expect(radio.className).toContain("radio__root");
		expect(radio.className).toContain("--default");

		const svg = container.querySelector(".radio__svg");
		expect(svg).toBeInTheDocument();
		expect(svg?.tagName.toLowerCase()).toBe("svg");

		const label = container.querySelector(".radio__label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent("");
	});

	it("deve renderizar com descrição", () => {
		const { container } = render(
			<Radio description="Opção 1" data-testid="radio" />,
		);

		const radio = screen.getByTestId("radio");
		expect(radio).toBeInTheDocument();

		const label = container.querySelector(".radio__label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent("Opção 1");
	});

	it("deve renderizar com variante checked", () => {
		render(<Radio variant="checked" data-testid="radio" />);

		const radio = screen.getByTestId("radio");
		expect(radio.className).toContain("--checked");
		expect(radio.className).not.toContain("--default");
	});

	it("deve renderizar com variante disabled", () => {
		render(<Radio variant="disabled" data-testid="radio" />);

		const radio = screen.getByTestId("radio");
		expect(radio.className).toContain("--disabled");
		expect(radio.className).not.toContain("--default");
	});

	it("deve aplicar classes CSS adicionais", () => {
		render(<Radio className="custom-class" data-testid="radio" />);

		const radio = screen.getByTestId("radio");
		expect(radio.className).toContain("custom-class");
		expect(radio.className).toContain("radio__root");
	});

	it("deve passar atributos HTML adicionais para o elemento raiz", () => {
		render(
			<Radio
				data-testid="radio"
				aria-label="Opção de rádio"
				title="Selecione esta opção"
				role="radio"
			/>,
		);

		const radio = screen.getByTestId("radio");
		expect(radio).toHaveAttribute("aria-label", "Opção de rádio");
		expect(radio).toHaveAttribute("title", "Selecione esta opção");
		expect(radio).toHaveAttribute("role", "radio");
	});

	it("deve renderizar com descrição longa", () => {
		const longDescription =
			"Esta é uma descrição muito longa para testar como o componente lida com textos extensos que podem quebrar em múltiplas linhas";
		const { container } = render(
			<Radio description={longDescription} data-testid="radio" />,
		);

		const radio = screen.getByTestId("radio");
		expect(radio).toBeInTheDocument();

		const label = container.querySelector(".radio__label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent(longDescription);
	});

	it("deve renderizar o SVG com os atributos corretos", () => {
		const { container } = render(<Radio data-testid="radio" />);

		const svg = container.querySelector(".radio__svg");

		expect(svg).toBeInTheDocument();
		expect(svg?.tagName.toLowerCase()).toBe("svg");
		expect(svg?.getAttribute("width")).toBe("21");
		expect(svg?.getAttribute("height")).toBe("20");
		expect(svg?.getAttribute("viewBox")).toBe("0 0 21 20");
		expect(svg?.getAttribute("fill")).toBe("none");
		expect(svg?.getAttribute("xmlns")).toBe("http://www.w3.org/2000/svg");

		const path = svg?.querySelector("path");
		expect(path).toBeInTheDocument();
		expect(path?.getAttribute("stroke")).toBe("white");
		expect(path?.getAttribute("stroke-width")).toBe("3");
		expect(path?.getAttribute("stroke-linecap")).toBe("round");
		expect(path?.getAttribute("stroke-linejoin")).toBe("round");
	});

	it("deve ser clicável quando não está desabilitado", () => {
		const handleClick = jest.fn();
		render(<Radio data-testid="radio" onClick={handleClick} />);

		const radio = screen.getByTestId("radio");
		fireEvent.click(radio);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("não deve chamar o evento de clique quando está desabilitado", () => {
		const handleClick = jest.fn();
		render(
			<Radio data-testid="radio" variant="disabled" onClick={handleClick} />,
		);

		const radio = screen.getByTestId("radio");
		fireEvent.click(radio);

		expect(handleClick).not.toHaveBeenCalled();
	});
});
