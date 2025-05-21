import { render, screen } from "@testing-library/react";

import { CardTestimonial } from "./index";

describe("<CardTestimonial />", () => {
	it("deve renderizar corretamente", () => {
		const { container } = render(<CardTestimonial />);
		const rootElement = container.querySelector(".card-testimonial");
		expect(rootElement).toBeInTheDocument();
	});

	it("deve renderizar a imagem corretamente", () => {
		render(
			<CardTestimonial
				image={
					<img data-testid="avatar-image" alt="Avatar" src="/avatar.jpg" />
				}
			/>,
		);
		expect(screen.getByTestId("avatar-image")).toBeInTheDocument();
	});

	it("deve renderizar o nome corretamente", () => {
		render(<CardTestimonial name="João Silva" />);
		expect(screen.getByText("João Silva")).toBeInTheDocument();
		expect(screen.getByText("João Silva")).toHaveClass(
			"card-testimonial__name",
		);
	});

	it("deve renderizar a posição corretamente", () => {
		render(<CardTestimonial position="Diretor de Marketing" />);
		expect(screen.getByText("Diretor de Marketing")).toBeInTheDocument();
		expect(screen.getByText("Diretor de Marketing")).toHaveClass(
			"card-testimonial__position",
		);
	});

	it("deve renderizar a data corretamente", () => {
		render(<CardTestimonial date="Janeiro 2025" />);
		expect(screen.getByText("Janeiro 2025")).toBeInTheDocument();
		expect(screen.getByText("Janeiro 2025")).toHaveClass(
			"card-testimonial__date",
		);
	});

	it("deve renderizar o texto do depoimento corretamente", () => {
		render(<CardTestimonial text="Este é um depoimento incrível" />);
		expect(
			screen.getByText("Este é um depoimento incrível"),
		).toBeInTheDocument();
		expect(screen.getByText("Este é um depoimento incrível")).toHaveClass(
			"card-testimonial__text",
		);
	});

	it("deve renderizar o separador por padrão", () => {
		const { container } = render(<CardTestimonial name="Nome" text="Texto" />);
		const separatorElement = container.querySelector(
			".card-testimonial__separator",
		);
		expect(separatorElement).toBeInTheDocument();
	});

	it("não deve renderizar o separador quando showSeparator é false", () => {
		const { container } = render(
			<CardTestimonial name="Nome" text="Texto" showSeparator={false} />,
		);
		const separatorElement = container.querySelector(
			".card-testimonial__separator",
		);
		expect(separatorElement).not.toBeInTheDocument();
	});

	it("deve renderizar todos os elementos juntos corretamente", () => {
		render(
			<CardTestimonial
				image={
					<img data-testid="avatar-image" alt="Avatar" src="/avatar.jpg" />
				}
				name="João Silva"
				position="Diretor de Marketing"
				date="Janeiro 2025"
				text="Este é um depoimento incrível"
			/>,
		);

		expect(screen.getByTestId("avatar-image")).toBeInTheDocument();
		expect(screen.getByText("João Silva")).toBeInTheDocument();
		expect(screen.getByText("Diretor de Marketing")).toBeInTheDocument();
		expect(screen.getByText("Janeiro 2025")).toBeInTheDocument();
		expect(
			screen.getByText("Este é um depoimento incrível"),
		).toBeInTheDocument();
	});

	it("deve renderizar o componente com classe personalizada", () => {
		render(
			<CardTestimonial
				className="custom-class"
				data-testid="testimonial-card"
			/>,
		);
		expect(screen.getByTestId("testimonial-card")).toBeInTheDocument();
	});
});
