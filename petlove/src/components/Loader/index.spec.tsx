import { render } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { Loader } from "./index";

// Mock do módulo de estilos
jest.mock("./styles.scss", () => ({}));

// Mock da função clsx
jest.mock("@/utils/clsx", () => ({
  clsx: (...args: unknown[]) => args.filter(Boolean).join(" "),
}));

// Definição de tipo para as propriedades do componente Loader
type LoaderProps = HTMLAttributes<HTMLSpanElement> & {
  color?: string;
  size?: number;
  className?: string;
};

describe("<Loader />", () => {
  it("deve renderizar corretamente com valores padrão", () => {
    const { container } = render(<Loader />);
    const loader = container.firstChild as HTMLElement;

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("loader");
    expect(loader).toHaveClass("--border-neutral-900");
  });

  it("deve renderizar com cor personalizada", () => {
    const { container } = render(<Loader color="primary-500" />);
    const loader = container.firstChild as HTMLElement;

    expect(loader).toHaveClass("--border-primary-500");
    expect(loader).not.toHaveClass("--border-neutral-900");
  });

  it("deve renderizar com tamanho personalizado", () => {
    const { container } = render(<Loader size={48} />);
    const loader = container.firstChild as HTMLElement;

    expect(loader).toHaveAttribute("style");

    const styleString = loader.getAttribute("style") || "";
    expect(styleString).toContain("width: 48px");
    expect(styleString).toContain("height: 47px");
  });

  it("deve aplicar classes CSS adicionais", () => {
    const { container } = render(<Loader className="custom-class" />);
    const loader = container.firstChild as HTMLElement;

    expect(loader).toHaveClass("custom-class");
    expect(loader).toHaveClass("loader");
  });

  it("deve combinar múltiplas propriedades personalizadas", () => {
    const { container } = render(
      <Loader color="secondary-700" size={36} className="custom-class" />,
    );
    const loader = container.firstChild as HTMLElement;

    expect(loader).toHaveClass("--border-secondary-700");
    expect(loader).toHaveClass("custom-class");

    // Verificamos o estilo inline
    const styleString = loader.getAttribute("style") || "";
    expect(styleString).toContain("width: 36px");
    expect(styleString).toContain("height: 35px");
    expect(styleString).toContain("border-bottom-color: transparent");
  });

  it("deve renderizar como um elemento span", () => {
    const { container } = render(<Loader />);
    const loader = container.firstChild as HTMLElement;

    expect(loader.tagName.toLowerCase()).toBe("span");
  });

  it("deve aceitar e propagar atributos HTML adicionais", () => {
    const { container } = render(
      <Loader
        aria-label="Carregando conteúdo"
        id="main-loader"
        role="status"
      />,
    );
    const loader = container.firstChild as HTMLElement;

    expect(loader).toHaveAttribute("aria-label", "Carregando conteúdo");
    expect(loader).toHaveAttribute("id", "main-loader");
    expect(loader).toHaveAttribute("role", "status");
  });

  it("deve renderizar com múltiplas classes adicionais", () => {
    const { container } = render(<Loader className="class1 class2 class3" />);
    const loader = container.firstChild as HTMLElement;

    expect(loader).toHaveClass("class1");
    expect(loader).toHaveClass("class2");
    expect(loader).toHaveClass("class3");
    expect(loader).toHaveClass("loader");
  });
});
