import { link } from "./link";
import { formatGtmText } from "./utils";

// Mock da função formatGtmText
jest.mock("./utils", () => ({
  formatGtmText: jest.fn((text) => `formatted-${text}`),
}));

describe("link tracking", () => {
  // Setup do DOM para os testes
  beforeEach(() => {
    // Limpar o DOM antes de cada teste
    document.body.innerHTML = "";
    
    // Resetar os mocks
    jest.clearAllMocks();
  });

  it("deve adicionar atributos data-gtm aos links", () => {
    // Configurar o DOM com elementos para teste
    document.body.innerHTML = `
      <div id="gtm-title">Página Principal</div>
      <a href="/contato">Entre em contato</a>
      <a href="/sobre">Sobre nós</a>
    `;

    // Executar a função de rastreamento
    link();

    // Obter todos os links
    const linkElements = document.querySelectorAll("a");

    // Verificar se os atributos foram adicionados ao primeiro link
    expect(linkElements[0].getAttribute("data-gtm-name")).toBe("formatted-Página Principal");
    expect(linkElements[0].getAttribute("data-gtm-clicktype")).toBe("link");
    expect(linkElements[0].getAttribute("data-gtm-subname")).toBe("formatted-Entre em contato");

    // Verificar se os atributos foram adicionados ao segundo link
    expect(linkElements[1].getAttribute("data-gtm-name")).toBe("formatted-Página Principal");
    expect(linkElements[1].getAttribute("data-gtm-clicktype")).toBe("link");
    expect(linkElements[1].getAttribute("data-gtm-subname")).toBe("formatted-Sobre nós");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("Página Principal");
    expect(formatGtmText).toHaveBeenCalledWith("Entre em contato");
    expect(formatGtmText).toHaveBeenCalledWith("Sobre nós");
  });

  it("deve usar valores padrão quando elementos não existem", () => {
    // Configurar o DOM sem o elemento de título
    document.body.innerHTML = `
      <a href="/home"></a>
    `;

    // Executar a função de rastreamento
    link();

    // Obter o link
    const linkElement = document.querySelector("a");

    // Verificar se os atributos foram adicionados com valores padrão
    expect(linkElement.getAttribute("data-gtm-name")).toBe("formatted-sem-titulo");
    expect(linkElement.getAttribute("data-gtm-clicktype")).toBe("link");
    expect(linkElement.getAttribute("data-gtm-subname")).toBe("formatted-sem-texto");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("sem-titulo");
    expect(formatGtmText).toHaveBeenCalledWith("sem-texto");
  });
});
