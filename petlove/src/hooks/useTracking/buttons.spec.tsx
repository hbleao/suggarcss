import { buttons } from "./buttons";
import { formatGtmText } from "./utils";

// Mock of the formatGtmText function
jest.mock("./utils", () => ({
  formatGtmText: jest.fn((text) => `formatted-${text}`),
}));

describe("buttons tracking", () => {
  // DOM setup for tests
  beforeEach(() => {
    // Clear the DOM before each test
    document.body.innerHTML = "";
    
    // Reset mocks
    jest.clearAllMocks();
  });

  it("should add data-gtm attributes to buttons", () => {
    // Configure the DOM with elements for testing
    document.body.innerHTML = `
      <div id="gtm-title">Página de Teste</div>
      <button title="Botão de Teste">Clique Aqui</button>
      <button title="Outro Botão">Enviar</button>
    `;

    // Execute the tracking function
    buttons();

    // Get all buttons
    const buttonElements = document.querySelectorAll("button");

    // Verify if attributes were added to the first button
    // Note that data-gtm-name is defined twice in the implementation, so the last value prevails
    expect(buttonElements[0].getAttribute("data-gtm-name")).toBe("formatted-Página de Teste");
    expect(buttonElements[0].getAttribute("data-gtm-clicktype")).toBe("button");
    expect(buttonElements[0].getAttribute("data-gtm-subname")).toBe("formatted-Botão de Teste");

    // Verify if attributes were added to the second button
    // Note that data-gtm-name is defined twice in the implementation, so the last value prevails
    expect(buttonElements[1].getAttribute("data-gtm-name")).toBe("formatted-Página de Teste");
    expect(buttonElements[1].getAttribute("data-gtm-clicktype")).toBe("button");
    expect(buttonElements[1].getAttribute("data-gtm-subname")).toBe("formatted-Outro Botão");

    // Verify if the formatGtmText function was called correctly
    expect(formatGtmText).toHaveBeenCalledWith("Página de Teste");
    expect(formatGtmText).toHaveBeenCalledWith("Botão de Teste");
    expect(formatGtmText).toHaveBeenCalledWith("Outro Botão");
  });

  it("should use default values when elements don't exist", () => {
    // Configure the DOM without the title element
    document.body.innerHTML = `
      <button title="">Botão Sem Título</button>
    `;

    // Execute the tracking function
    buttons();

    // Get the button
    const buttonElement = document.querySelector("button");
    
    if (!buttonElement) {
      fail("Button not found");
      return;
    }

    // Verify if attributes were added with default values
    // Note that data-gtm-name is defined twice in the implementation, so the last value prevails
    expect(buttonElement.getAttribute("data-gtm-name")).toBe("formatted-sem-titulo");
    expect(buttonElement.getAttribute("data-gtm-clicktype")).toBe("button");
    expect(buttonElement.getAttribute("data-gtm-subname")).toBe("formatted-sem-label");

    // Verify if the formatGtmText function was called correctly
    expect(formatGtmText).toHaveBeenCalledWith("sem-titulo");
    expect(formatGtmText).toHaveBeenCalledWith("sem-label");
  });

  it("should handle buttons without defined titles", () => {
    // Configure the DOM with button without title attribute
    document.body.innerHTML = `
      <div id="gtm-title">Página de Teste</div>
      <button>Botão Sem Atributo Title</button>
    `;

    // Execute the tracking function
    buttons();

    // Get the button
    const buttonElement = document.querySelector("button");
    
    if (!buttonElement) {
      fail("Button not found");
      return;
    }

    // Verify if attributes were added with default value for the title
    // Note that data-gtm-name is defined twice in the implementation, so the last value prevails
    expect(buttonElement.getAttribute("data-gtm-name")).toBe("formatted-Página de Teste");
    expect(buttonElement.getAttribute("data-gtm-clicktype")).toBe("button");
    expect(buttonElement.getAttribute("data-gtm-subname")).toBe("formatted-sem-label");

    // Verify if the formatGtmText function was called correctly
    expect(formatGtmText).toHaveBeenCalledWith("Página de Teste");
    expect(formatGtmText).toHaveBeenCalledWith("sem-label");
  });

  it("should handle the case where there are no buttons on the page", () => {
    // Configure the DOM without buttons
    document.body.innerHTML = `
      <div id="gtm-title">Página de Teste</div>
    `;

    // Execute the tracking function
    buttons();

    // Verify that formatGtmText was not called
    expect(formatGtmText).not.toHaveBeenCalled();
  });
});
