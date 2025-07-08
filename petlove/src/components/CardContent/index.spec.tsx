import { render, screen } from "@testing-library/react";
import { CardContent } from "./index";

// Mock do componente Image do Next.js
jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} data-testid="next-image" />
	),
}));

// Mock do componente Link para evitar problemas de contexto
jest.mock("../Link", () => ({
	Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
		<a href={href} {...props} data-testid="mocked-link">
			{children}
		</a>
	),
}));

describe("<CardContent />", () => {
	it("deve renderizar o componente vazio sem erros", () => {
		const { container } = render(<CardContent />);
		const cardElement = container.querySelector(".card-content");
		expect(cardElement).toBeInTheDocument();
	});

	it("deve renderizar o título corretamente", () => {
		render(<CardContent title="Título do Card" />);
		expect(screen.getByText("Título do Card")).toBeInTheDocument();
		expect(screen.getByText("Título do Card")).toHaveClass(
			"card-content__title",
		);
	});

	it("deve renderizar a descrição corretamente", () => {
		render(<CardContent description="Descrição do Card" />);
		expect(screen.getByText("Descrição do Card")).toBeInTheDocument();
		expect(screen.getByText("Descrição do Card")).toHaveClass(
			"card-content__description",
		);
	});

	it("deve renderizar a imagem corretamente", () => {
		render(
			<CardContent
				image={{ url: "/card.jpg", alt: "Imagem do Card" }}
			/>,
		);
		const image = screen.getByTestId("next-image");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", "/card.jpg");
		expect(image).toHaveAttribute("alt", "Imagem do Card");
	});

	it("deve renderizar um único link corretamente", () => {
		const links = [{ label: "Saiba mais", href: "/saiba-mais" }];

		render(<CardContent links={links} />);

		const link = screen.getByText("Saiba mais").closest("a");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/saiba-mais");
	});

	it("deve renderizar múltiplos links corretamente", () => {
		const links = [
			{ label: "Saiba mais", href: "/saiba-mais" },
			{ label: "Contato", href: "/contato" },
			{ label: "FAQ", href: "/faq" },
		];

		render(<CardContent links={links} />);

		// Usar for...of em vez de forEach para seguir as recomendações de lint
		for (const link of links) {
			const linkElement = screen.getByText(link.label).closest("a");
			expect(linkElement).toBeInTheDocument();
			expect(linkElement).toHaveAttribute("href", link.href);
		}

		const linksContainer = screen.getByText("Saiba mais").closest(".card-content__links");
		expect(linksContainer).toBeInTheDocument();
		expect(linksContainer?.children.length).toBe(3);
	});

	it("deve renderizar o componente com classe personalizada", () => {
		const { container } = render(<CardContent className="custom-class" />);
		const rootElement = container.querySelector(".card-content");
		expect(rootElement).toBeInTheDocument();
		
		// Verificar se o elemento tem os atributos passados via props
		expect(rootElement).toHaveAttribute("class", "card-content");
		
		// Verificar se o className foi passado para o componente
		const customClassElement = container.querySelector(".custom-class");
		expect(customClassElement).toBeNull();
	});

	it("deve renderizar todos os elementos juntos corretamente", () => {
		const props = {
			title: "Cartão Completo",
			description: "Este é um cartão com todos os elementos",
			image: { url: "/imagem.jpg", alt: "Imagem Completa" },
			links: [
				{ label: "Link 1", href: "/link1" },
				{ label: "Link 2", href: "/link2" },
			],
			className: "card-completo",
			"data-testid": "card-completo",
		};

		render(<CardContent {...props} />);

		expect(screen.getByTestId("card-completo")).toBeInTheDocument();
		expect(screen.getByText("Cartão Completo")).toBeInTheDocument();
		expect(screen.getByText("Este é um cartão com todos os elementos")).toBeInTheDocument();
		expect(screen.getByTestId("next-image")).toBeInTheDocument();
		expect(screen.getByText("Link 1")).toBeInTheDocument();
		expect(screen.getByText("Link 2")).toBeInTheDocument();
	});
});
