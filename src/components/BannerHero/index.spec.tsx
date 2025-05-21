import type React from "react";
import { render, screen } from "@testing-library/react";
import { BannerHero } from "./index";

jest.mock("../Loader", () => ({
	Loader: () => <div data-testid="loader">Loading...</div>,
}));

type ComponentProps = {
	children?: React.ReactNode;
	className?: string;
	href?: string;
	onClick?: () => void;
	variant?: string;
	size?: string | number;
	[key: string]: React.ReactNode | string | number | (() => void) | undefined;
};

jest.mock("@/components", () => ({
	Button: ({ children, ...props }: ComponentProps) => (
		<button {...props}>{children}</button>
	),
	Flex: ({ children, ...props }: ComponentProps) => (
		<div {...props}>{children}</div>
	),
	Link: ({ children, ...props }: ComponentProps) => (
		<a {...props}>{children}</a>
	),
	Grid: ({ children, ...props }: ComponentProps) => (
		<div data-testid="grid" {...props}>
			{children}
		</div>
	),
	Column: ({ children, ...props }: ComponentProps) => (
		<div data-testid="column" {...props}>
			{children}
		</div>
	),
	Typography: ({ children, ...props }: ComponentProps) => (
		<div {...props}>{children}</div>
	),
}));

describe("<BannerHero />", () => {
	it("deve renderizar com a cor de fundo especificada", () => {
		const { container } = render(<BannerHero bgColor="portoSegurosPrimary" />);
		const rootElement = container.querySelector(".banner-hero__root");
		expect(rootElement).toHaveClass("--bg-portoSegurosPrimary");
	});

	it("deve renderizar o título corretamente", () => {
		render(<BannerHero title="Título do Banner" />);
		expect(screen.getByText("Título do Banner")).toBeInTheDocument();
	});

	it("deve renderizar o subtítulo corretamente", () => {
		render(<BannerHero subtitle="Subtítulo do Banner" />);

		const subtitles = screen.getAllByText("Subtítulo do Banner");
		expect(subtitles).toHaveLength(2);

		expect(subtitles[0]).toHaveClass("mobile");
		expect(subtitles[1]).toHaveClass("desktop");
	});

	it("deve renderizar o texto corretamente", () => {
		render(<BannerHero text="Texto descritivo do banner" />);
		expect(screen.getByText("Texto descritivo do banner")).toBeInTheDocument();
	});

	it("deve renderizar o logo corretamente", () => {
		render(
			<BannerHero
				logo={<img data-testid="logo" alt="Logo" src="/logo.png" />}
			/>,
		);
		expect(screen.getByTestId("logo")).toBeInTheDocument();
	});

	it("deve renderizar a imagem corretamente", () => {
		render(
			<BannerHero
				image={
					<img data-testid="banner-image" alt="Banner" src="/banner.jpg" />
				}
			/>,
		);
		expect(screen.getByTestId("banner-image")).toBeInTheDocument();
	});

	it("deve renderizar os botões corretamente", () => {
		// @ts-ignore
		const buttons = [
			{
				label: "Botão Primário",
				variant: "insurance",
				styles: "primary",
				size: "large",
				onClick: () => {},
			},
			{
				label: "Botão Secundário",
				variant: "insurance",
				styles: "secondary",
				size: "large",
				onClick: () => {},
			},
		];

		render(<BannerHero buttons={buttons} />);

		expect(screen.getByText("Botão Primário")).toBeInTheDocument();
		expect(screen.getByText("Botão Secundário")).toBeInTheDocument();
	});

	it("deve renderizar as lojas corretamente", () => {
		const stores = [
			{
				name: "App Store",
				icon: (
					<img
						data-testid="app-store-icon"
						alt="App Store"
						src="/app-store.png"
					/>
				),
				href: "https://apps.apple.com",
			},
			{
				name: "Google Play",
				icon: (
					<img
						data-testid="play-store-icon"
						alt="Google Play"
						src="/play-store.png"
					/>
				),
				href: "https://play.google.com",
			},
		];

		render(<BannerHero stores={stores} />);

		expect(screen.getByText("App Store")).toBeInTheDocument();
		expect(screen.getByText("Google Play")).toBeInTheDocument();
		expect(screen.getByTestId("app-store-icon")).toBeInTheDocument();
		expect(screen.getByTestId("play-store-icon")).toBeInTheDocument();
	});
});
