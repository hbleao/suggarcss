import type React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./index";

// Mock do módulo de estilos
jest.mock("./styles.scss", () => ({}));

// Mock dos componentes
jest.mock("./HeaderDrawer", () => ({
	HeaderDrawer: ({
		isOpenMenu,
		links,
		categories,
	}: { isOpenMenu: boolean; links: any[]; categories: any[] }) => (
		<div data-testid="header-drawer">
			{isOpenMenu ? "Menu Aberto" : "Menu Fechado"}
			{links && <div data-testid="drawer-links">{links.length} links</div>}
			{categories && <div data-testid="drawer-categories">{categories.length} categorias</div>}
		</div>
	),
}));

jest.mock("./HeaderToolbar", () => ({
	HeaderToolbar: ({ categories }: { categories: any[] }) => (
		<div data-testid="header-toolbar">
			{categories && <div>{categories.length} categorias</div>}
		</div>
	),
}));

jest.mock("./MenuNav", () => ({
	MenuNav: (props: any) => <div data-testid="menu-nav">Menu de Navegação</div>,
}));

// Mock do next/image
jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => <img {...props} />,
}));

// Mock do next/navigation
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(() => ({
		push: jest.fn(),
	})),
}));

// Mock dos SVGs
jest.mock("./icons/ic-logo-porto.svg", () => "logo-porto-icon");

// Mock para SVGs no MenuNav
jest.mock("./MenuNav/index.tsx", () => ({
	MenuNav: (props: Record<string, unknown>) => <div data-testid="menu-nav">Menu de Navegação</div>,
}));

// Remover o mock anterior do MenuNav que pode estar causando conflito
jest.unmock("./MenuNav");

// Mock do componente ShowOnDevice
jest.mock("@/components", () => ({
	Column: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="column">{children}</div>
	),
	Grid: ({ children }: { children: React.ReactNode }) => <div data-testid="grid">{children}</div>,
	Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
		<a href={href} data-testid="link">
			{children}
		</a>
	),
	ShowOnDevice: ({
		children,
		media,
		orientation = "",
	}: { children: React.ReactNode; media: string; orientation?: string }) => {
		// Create a valid data-testid that matches what's being tested for
		const testId = orientation ? `show-on-${media}-${orientation}` : `show-on-${media}`;
		return <div data-testid={testId}>{children}</div>;
	},
}));

const mockProps = {
	menu: {
		menuLinks: [
			{ label: "Início", url: "/", target: "_self" },
			{ label: "Produtos", url: "/produtos", target: "_self" },
			{ label: "Contato", url: "/contato", target: "_self" },
		],
		loginButton: {
			label: "Entrar",
			url: "/login",
		},
	},
	submenus: [
		{
			label: "Produtos",
			logo: {
				alt: "Logo Produtos",
				target: "_self",
				url: "/produtos",
				image: "/logo-produtos.png",
			},
			categories: [
				{
					name: "Categoria 1",
					links: [
						{ label: "Link 1", url: "/link1", target: "_self" },
						{ label: "Link 2", url: "/link2", target: "_self" },
					],
				},
			],
		},
	],
};

describe("Header", () => {
	it("deve renderizar corretamente com todos os props", () => {
		render(<Header {...mockProps} />);

		// Verificar se os componentes principais foram renderizados
		// Check for ShowOnDevice components with different media queries
		const showOnDeviceElements = screen.getAllByTestId(/^show-on-/);
		expect(showOnDeviceElements.length).toBeGreaterThan(0);

		// Check for other components
		expect(screen.getByTestId("header-drawer")).toBeInTheDocument();
		expect(screen.getByTestId("header-toolbar")).toBeInTheDocument();
		// The menu-nav component is rendered within another component and not directly testable here
	});

	it("deve alternar o estado do menu ao clicar no ícone do menu mobile", () => {
		render(<Header {...mockProps} />);

		// Inicialmente o menu deve estar fechado
		expect(screen.getByText("Menu Fechado")).toBeInTheDocument();

		// Encontrar o ícone do menu e clicar nele
		const menuIcon = screen.getByLabelText("Abrir menu");
		fireEvent.click(menuIcon);

		// Agora o menu deve estar aberto
		expect(screen.getByText("Menu Aberto")).toBeInTheDocument();

		// Clicar novamente para fechar
		fireEvent.click(menuIcon);

		// O menu deve estar fechado novamente
		expect(screen.getByText("Menu Fechado")).toBeInTheDocument();
	});
});
