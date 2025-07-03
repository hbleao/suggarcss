import { inputs } from "./inputs";
import { formatGtmText } from "./utils";

// Mock of the formatGtmText function
jest.mock("./utils", () => ({
  formatGtmText: jest.fn((text) => `formatted-${text}`),
}));

describe("inputs tracking", () => {
  // DOM setup for tests
  beforeEach(() => {
    // Clear the DOM before each test
    document.body.innerHTML = "";
    
    // Reset mocks
    jest.clearAllMocks();
  });

  it("should add data-gtm attributes to inputs", () => {
    // Configure the DOM with elements for testing
    document.body.innerHTML = `
      <div id="gtm-title">Formulário de Cadastro</div>
      <input class="input__field" type="text" name="nome" placeholder="Nome" />
      <input class="input__field" type="email" name="email" placeholder="Email" />
    `;

    // Execute the tracking function
    inputs();

    // Get all inputs
    const inputElements = document.querySelectorAll(".input__field");

    // Verify if attributes were added to the first input
    expect(inputElements[0].getAttribute("data-gtm-name")).toBe("formatted-Formulário de Cadastro");
    expect(inputElements[0].getAttribute("data-gtm-inputtype")).toBe("text");
    expect(inputElements[0].getAttribute("data-gtm-subname")).toBe("formatted-nome");

    // Verify if attributes were added to the second input
    expect(inputElements[1].getAttribute("data-gtm-name")).toBe("formatted-Formulário de Cadastro");
    expect(inputElements[1].getAttribute("data-gtm-inputtype")).toBe("email");
    expect(inputElements[1].getAttribute("data-gtm-subname")).toBe("formatted-email");

    // Verify if the formatGtmText function was called correctly
    expect(formatGtmText).toHaveBeenCalledWith("Formulário de Cadastro");
    expect(formatGtmText).toHaveBeenCalledWith("nome");
    expect(formatGtmText).toHaveBeenCalledWith("email");
  });

  it("should use default values when elements don't exist", () => {
    // Configure the DOM without the title element
    document.body.innerHTML = `
      <input class="input__field" type="text" name="" placeholder="Campo sem nome" />
    `;

    // Execute the tracking function
    inputs();

    // Get the input
    const inputElement = document.querySelector(".input__field");
    
    // Verify if the input was found
    if (!inputElement) {
      fail("Input not found");
      return;
    }

    // Verify if attributes were added with default values
    expect(inputElement.getAttribute("data-gtm-name")).toBe("formatted-sem-titulo");
    expect(inputElement.getAttribute("data-gtm-inputtype")).toBe("text");
    expect(inputElement.getAttribute("data-gtm-subname")).toBe("formatted-sem-valor");

    // Verify if the formatGtmText function was called correctly
    expect(formatGtmText).toHaveBeenCalledWith("sem-titulo");
    expect(formatGtmText).toHaveBeenCalledWith("sem-valor");
  });
});
