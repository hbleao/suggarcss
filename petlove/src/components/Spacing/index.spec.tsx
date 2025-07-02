import { render, screen } from "@testing-library/react";
import { Spacing } from "./index";

jest.mock("./styles.module.scss", () => ({
  spacing: "spacing-class",
  inline: "inline-class",
}));

describe("Spacing", () => {
  it("should apply vertical spacing with `top` and `bottom`", () => {
    render(<Spacing top="1rem" bottom="2rem" data-testid="spacing" />);
    const element = screen.getByTestId("spacing");

    expect(element).toHaveStyle({ marginTop: "1rem", marginBottom: "2rem" });
    expect(element.style.marginLeft).toBe("");
    expect(element.style.marginRight).toBe("");
  });

  it("Should apply horizontal spacing with `left` and `right`", () => {
    render(<Spacing left="1em" right="1.5em" data-testid="spacing" />);
    const element = screen.getByTestId("spacing");

    expect(element).toHaveStyle({ marginLeft: "1em", marginRight: "1.5em" });
    expect(element.style.marginTop).toBe("");
    expect(element.style.marginBottom).toBe("");
  });

  it("Should convert numeric values ​​to rem", () => {
    render(<Spacing top={2} bottom={1} left={0.5} right={1.5} data-testid="spacing" />);
    const element = screen.getByTestId("spacing");

    expect(element.style.marginTop).toBe("2rem");
    expect(element.style.marginBottom).toBe("1rem");
    expect(element.style.marginLeft).toBe("0.5rem");
    expect(element.style.marginRight).toBe("1.5rem");
  });

  it("should apply the inline class when `inline` is true", () => {
    const { rerender } = render(<Spacing data-testid="spacing" />);

    const defaultEl = screen.getByTestId("spacing");
    expect(defaultEl.className).toContain("spacing-class");
    expect(defaultEl.className).not.toContain("inline-class");

    rerender(<Spacing inline data-testid="spacing" />);
    const inlineEl = screen.getByTestId("spacing");
    expect(inlineEl.className).toContain("spacing-class");
    expect(inlineEl.className).toContain("inline-class");
  });

  it("Should apply custom CSS classes", () => {
    render(<Spacing className="custom-class another-class" data-testid="spacing" />);
    const element = screen.getByTestId("spacing");

    expect(element.className).toContain("custom-class");
    expect(element.className).toContain("another-class");
    expect(element.className).toContain("spacing-class");
  });

  it("Should apply additional inline styles and merge with existing styles", () => {
    render(
      <Spacing
        style={{
          backgroundColor: "rgb(255, 0, 0)",
          padding: "10px",
          marginTop: "5px"
        }}
        top="10px"
        data-testid="spacing"
      />
    );

    const element = screen.getByTestId("spacing");

    expect(element).toHaveStyle({
      backgroundColor: "rgb(255, 0, 0)",
      padding: "10px"
    });

    expect(element.style.marginTop).toBe("10px");
  });

  it("renderiza sem margens por padrão", () => {
    render(<Spacing data-testid="spacing" />);
    const element = screen.getByTestId("spacing");

    expect(element.style.marginTop).toBe("");
    expect(element.style.marginBottom).toBe("");
    expect(element.style.marginLeft).toBe("");
    expect(element.style.marginRight).toBe("");

    expect(element).toHaveAttribute("aria-hidden", "true");
    expect(element).toBeEmptyDOMElement();
  });

  it("Should return null when it has children", () => {
    const { container } = render(
      <Spacing data-testid="spacing">
        <div data-testid="child">Conteúdo ignorado</div>
      </Spacing>
    );

    expect(container.firstChild).toBeNull();

    expect(screen.queryByTestId("child")).not.toBeInTheDocument();
    expect(screen.queryByTestId("spacing")).not.toBeInTheDocument();
  });

  it("aplica o data-testid corretamente", () => {
    render(<Spacing data-testid="custom-test-id" />);
    const element = screen.getByTestId("custom-test-id");
    expect(element).toBeInTheDocument();
  });
});
