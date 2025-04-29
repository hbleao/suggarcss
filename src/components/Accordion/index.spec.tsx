import { render, screen } from "@testing-library/react";
import { Accordion } from "./Accordion";

describe("<Accordion />", () => {
	it("deve renderizar o título corretamente", () => {
		render(<Accordion title="Meu Título" />);
		expect(screen.getByText("Meu Título")).toBeInTheDocument();
	});

	it("deve aplicar as classes de variant e border corretamente", () => {
		const { container } = render(
			<Accordion title="Título" variant="negative" border="none" />,
		);

		const rootElement = container.querySelector(".accordion__root");
		expect(rootElement).toHaveClass("--negative");
		expect(rootElement).toHaveClass("--border-none");
	});

	it("deve renderizar o conteúdo (children) corretamente", () => {
		render(
			<Accordion title="Título">
				<p>Conteúdo interno do Accordion</p>
			</Accordion>,
		);

		expect(
			screen.getByText("Conteúdo interno do Accordion"),
		).toBeInTheDocument();
	});

	it("deve renderizar o ícone (SVG) de seta", () => {
		const { container } = render(<Accordion title="Título" />);
		const svgElement = container.querySelector("svg");
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute("viewBox", "0 0 20 20");
	});
});
