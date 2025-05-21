import React from "react";
import { render, screen } from "@testing-library/react";
import { Checkbox } from "./index";

jest.mock("./styles.scss", () => ({}));

describe("<Checkbox />", () => {
	it("renderiza corretamente com valores padrão", () => {
		render(<Checkbox data-testid="checkbox" />);

		const checkbox = screen.getByTestId("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveClass("checkbox__root");
		expect(checkbox).toHaveClass("--default");

		const svg = checkbox.querySelector("svg.checkbox__svg");
		expect(svg).toBeInTheDocument();

		const label = checkbox.querySelector(".checkbox__label");
		expect(label).toBeInTheDocument();
		expect(label).toBeEmptyDOMElement();
	});

	it("exibe o texto do rótulo corretamente", () => {
		render(<Checkbox label="Aceito os termos" data-testid="checkbox" />);

		const label = screen.getByText("Aceito os termos");
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass("checkbox__label");
	});

	it("aplica a variante 'checked'", () => {
		render(<Checkbox variant="checked" data-testid="checkbox" />);
		expect(screen.getByTestId("checkbox")).toHaveClass("--checked");
	});

	it("aplica a variante 'disabled'", () => {
		render(<Checkbox variant="disabled" data-testid="checkbox" />);
		expect(screen.getByTestId("checkbox")).toHaveClass("--disabled");
	});

	it("aplica classes CSS adicionais", () => {
		render(<Checkbox className="custom-class" data-testid="checkbox" />);
		expect(screen.getByTestId("checkbox")).toHaveClass("custom-class");
	});

	it("repassa atributos HTML para o elemento raiz", () => {
		render(
			<Checkbox
				data-testid="checkbox"
				aria-label="Caixa de seleção"
				role="checkbox"
				aria-checked="false"
			/>,
		);

		const checkbox = screen.getByTestId("checkbox");
		expect(checkbox).toHaveAttribute("aria-label", "Caixa de seleção");
		expect(checkbox).toHaveAttribute("role", "checkbox");
		expect(checkbox).toHaveAttribute("aria-checked", "false");
	});

	it("aplica o título corretamente no input visual", () => {
		render(<Checkbox title="Título" data-testid="checkbox" />);
		const inputDiv = screen.getByTitle("Título");
		expect(inputDiv).toHaveClass("checkbox__input");
	});

	it("renderiza HTML no label usando dangerouslySetInnerHTML", () => {
		render(
			<Checkbox
				label="Aceito os <strong>termos</strong>"
				data-testid="checkbox"
			/>,
		);
		const label = screen
			.getByTestId("checkbox")
			.querySelector(".checkbox__label");
		expect(label?.innerHTML).toContain("<strong>termos</strong>");
	});

	it("renderiza o SVG com atributos corretos", () => {
		render(<Checkbox data-testid="checkbox" />);
		const svg = screen
			.getByTestId("checkbox")
			.querySelector("svg.checkbox__svg");

		expect(svg).toHaveAttribute("width", "21");
		expect(svg).toHaveAttribute("height", "20");
		expect(svg).toHaveAttribute("viewBox", "0 0 21 20");
		expect(svg).toHaveAttribute("fill", "none");

		const path = svg?.querySelector("path");
		expect(path).toHaveAttribute("stroke", "white");
		expect(path).toHaveAttribute("stroke-width", "3");
		expect(path).toHaveAttribute("stroke-linecap", "round");
		expect(path).toHaveAttribute("stroke-linejoin", "round");
	});
});
