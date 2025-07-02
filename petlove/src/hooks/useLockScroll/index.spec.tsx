import { render } from "@testing-library/react";
import useLockScroll from "./index";

describe("useLockScroll", () => {
  let originalOverflow: string;
  let originalPaddingRight: string;

  beforeEach(() => {
    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;
    Object.defineProperty(document.documentElement, "clientWidth", {
      get: () => 1000,
      configurable: true
    });
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1020,
    });
    window.scrollTo = jest.fn();
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 123
    });
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  });

  interface TestComponentProps {
    isLocked: boolean;
    options?: {
      reserveScrollBarWidth?: boolean;
      targetElement?: HTMLElement | null;
    };
  }

  const TestComponent = ({ isLocked, options = {} }: TestComponentProps) => {
    useLockScroll(isLocked, options);
    return <div>Test</div>;
  };

  it("bloqueia o scroll quando isLocked é true", () => {
    render(<TestComponent isLocked={true} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restaura o overflow ao desbloquear o scroll", () => {
    const { rerender } = render(<TestComponent isLocked={true} />);
    expect(document.body.style.overflow).toBe("hidden");

    rerender(<TestComponent isLocked={false} />);
    expect(document.body.style.overflow).toBe(originalOverflow);
  });

  it("adiciona padding-right quando reserveScrollBarWidth é true", () => {
    render(
      <TestComponent
        isLocked={true}
        options={{ reserveScrollBarWidth: true }}
      />,
    );
    expect(document.body.style.paddingRight).toBe("20px");
  });

  it("adiciona padding-right apenas quando há barra de rolagem", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 1020,
      configurable: true,
      writable: true
    });

    document.body.style.paddingRight = "";

    const { rerender } = render(
      <TestComponent
        isLocked={true}
        options={{ reserveScrollBarWidth: true }}
      />,
    );

    expect(document.body.style.paddingRight).toBe("20px");

    rerender(
      <TestComponent
        isLocked={false}
        options={{ reserveScrollBarWidth: true }}
      />,
    );

    Object.defineProperty(window, "innerWidth", {
      value: 1000,
      configurable: true,
      writable: true
    });

    rerender(
      <TestComponent
        isLocked={true}
        options={{ reserveScrollBarWidth: true }}
      />,
    );

    expect(document.body.style.paddingRight).toBe("20px");
  });

  it("usa um elemento alvo personalizado se fornecido", () => {
    const customElement = document.createElement("div");
    document.body.appendChild(customElement);

    render(
      <TestComponent
        isLocked={true}
        options={{ targetElement: customElement }}
      />,
    );

    expect(customElement.style.overflow).toBe("hidden");
    document.body.removeChild(customElement);
  });
});
