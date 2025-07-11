import { buttons } from "./buttons";
import { formatGtmText } from "./utils";

// Mock da função formatGtmText
jest.mock("./utils", () => ({
  formatGtmText: jest.fn((text) => `formatted-${text}`),
}));

describe("buttons tracking", () => {
  // Setup do DOM para os testes
  beforeEach(() => {
    // Limpar o DOM antes de cada teste
    document.body.innerHTML = "";
    
    // Resetar os mocks
    jest.clearAllMocks();
  });

  it("deve adicionar atributos data-gtm aos botões", () => {
    // Configurar o DOM com elementos para teste
    document.body.innerHTML = `
      <div id="gtm-title">Página de Teste</div>
      <button title="Botão de Teste">Clique Aqui</button>
      <button title="Outro Botão">Enviar</button>
    `;

    // Executar a função de rastreamento
    buttons();

    // Obter todos os botões
    const buttonElements = document.querySelectorAll("button");

    // Verificar se os atributos foram adicionados ao primeiro botão
    // Note que data-gtm-name é definido duas vezes na implementação, então o último valor prevalece
    expect(buttonElements[0].getAttribute("data-gtm-name")).toBe("formatted-Página de Teste");
    expect(buttonElements[0].getAttribute("data-gtm-clicktype")).toBe("button");
    expect(buttonElements[0].getAttribute("data-gtm-subname")).toBe("formatted-Botão de Teste");

    // Verificar se os atributos foram adicionados ao segundo botão
    // Note que data-gtm-name é definido duas vezes na implementação, então o último valor prevalece
    expect(buttonElements[1].getAttribute("data-gtm-name")).toBe("formatted-Página de Teste");
    expect(buttonElements[1].getAttribute("data-gtm-clicktype")).toBe("button");
    expect(buttonElements[1].getAttribute("data-gtm-subname")).toBe("formatted-Outro Botão");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("Página de Teste");
    expect(formatGtmText).toHaveBeenCalledWith("Botão de Teste");
    expect(formatGtmText).toHaveBeenCalledWith("Outro Botão");
  });

  it("deve usar valores padrão quando elementos não existem", () => {
    // Configurar o DOM sem o elemento de título
    document.body.innerHTML = `
      <button title="">Botão Sem Título</button>
    `;

    // Executar a função de rastreamento
    buttons();

    // Obter o botão
    const buttonElement = document.querySelector("button");
    
    if (!buttonElement) {
      fail("Botão não encontrado");
      return;
    }

    // Verificar se os atributos foram adicionados com valores padrão
    // Note que data-gtm-name é definido duas vezes na implementação, então o último valor prevalece
    expect(buttonElement.getAttribute("data-gtm-name")).toBe("formatted-sem-titulo");
    expect(buttonElement.getAttribute("data-gtm-clicktype")).toBe("button");
    expect(buttonElement.getAttribute("data-gtm-subname")).toBe("formatted-sem-label");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("sem-titulo");
    expect(formatGtmText).toHaveBeenCalledWith("sem-label");
  });

  it("deve lidar com botões sem título definido", () => {
    // Configurar o DOM com botão sem atributo title
    document.body.innerHTML = `
      <div id="gtm-title">Página de Teste</div>
      <button>Botão Sem Atributo Title</button>
    `;

    // Executar a função de rastreamento
    buttons();

    // Obter o botão
    const buttonElement = document.querySelector("button");
    
    if (!buttonElement) {
      fail("Botão não encontrado");
      return;
    }

    // Verificar se os atributos foram adicionados com valor padrão para o título
    // Note que data-gtm-name é definido duas vezes na implementação, então o último valor prevalece
    expect(buttonElement.getAttribute("data-gtm-name")).toBe("formatted-Página de Teste");
    expect(buttonElement.getAttribute("data-gtm-clicktype")).toBe("button");
    expect(buttonElement.getAttribute("data-gtm-subname")).toBe("formatted-sem-label");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("Página de Teste");
    expect(formatGtmText).toHaveBeenCalledWith("sem-label");
  });

  it("deve lidar com o caso onde não há botões na página", () => {
    // Configurar o DOM sem botões
    document.body.innerHTML = `
      <div id="gtm-title">Página de Teste</div>
    `;

    // Executar a função de rastreamento
    buttons();

    // Verificar que formatGtmText não foi chamado
    expect(formatGtmText).not.toHaveBeenCalled();
  });
});
