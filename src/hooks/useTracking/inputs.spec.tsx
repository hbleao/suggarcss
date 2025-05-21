import { inputs } from "./inputs";
import { formatGtmText } from "./utils";

// Mock da função formatGtmText
jest.mock("./utils", () => ({
  formatGtmText: jest.fn((text) => `formatted-${text}`),
}));

describe("inputs tracking", () => {
  // Setup do DOM para os testes
  beforeEach(() => {
    // Limpar o DOM antes de cada teste
    document.body.innerHTML = "";
    
    // Resetar os mocks
    jest.clearAllMocks();
  });

  it("deve adicionar atributos data-gtm aos inputs", () => {
    // Configurar o DOM com elementos para teste
    document.body.innerHTML = `
      <div id="gtm-title">Formulário de Cadastro</div>
      <input type="text" name="nome" placeholder="Nome" />
      <input type="email" name="email" placeholder="Email" />
    `;

    // Executar a função de rastreamento
    inputs();

    // Obter todos os inputs
    const inputElements = document.querySelectorAll("input");

    // Verificar se os atributos foram adicionados ao primeiro input
    expect(inputElements[0].getAttribute("data-gtm-name")).toBe("formatted-Formulário de Cadastro");
    expect(inputElements[0].getAttribute("data-gtm-inputtype")).toBe("text");
    expect(inputElements[0].getAttribute("data-gtm-subname")).toBe("formatted-nome");

    // Verificar se os atributos foram adicionados ao segundo input
    expect(inputElements[1].getAttribute("data-gtm-name")).toBe("formatted-Formulário de Cadastro");
    expect(inputElements[1].getAttribute("data-gtm-inputtype")).toBe("email");
    expect(inputElements[1].getAttribute("data-gtm-subname")).toBe("formatted-email");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("Formulário de Cadastro");
    expect(formatGtmText).toHaveBeenCalledWith("nome");
    expect(formatGtmText).toHaveBeenCalledWith("email");
  });

  it("deve usar valores padrão quando elementos não existem", () => {
    // Configurar o DOM sem o elemento de título
    document.body.innerHTML = `
      <input type="text" name="" placeholder="Campo sem nome" />
    `;

    // Executar a função de rastreamento
    inputs();

    // Obter o input
    const inputElement = document.querySelector("input");

    // Verificar se os atributos foram adicionados com valores padrão
    expect(inputElement.getAttribute("data-gtm-name")).toBe("formatted-sem-titulo");
    expect(inputElement.getAttribute("data-gtm-inputtype")).toBe("text");
    expect(inputElement.getAttribute("data-gtm-subname")).toBe("formatted-sem-valor");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("sem-titulo");
    expect(formatGtmText).toHaveBeenCalledWith("sem-valor");
  });
});
