import { checkbox } from "./checkbox";
import { formatGtmText } from "./utils";

// Mock da função formatGtmText
jest.mock("./utils", () => ({
  formatGtmText: jest.fn((text) => `formatted-${text}`),
}));

describe("checkbox tracking", () => {
  // Setup do DOM para os testes
  beforeEach(() => {
    // Limpar o DOM antes de cada teste
    document.body.innerHTML = "";
    
    // Resetar os mocks
    jest.clearAllMocks();
  });

  it("deve adicionar atributos data-gtm aos checkboxes", () => {
    // Configurar o DOM com elementos para teste
    document.body.innerHTML = `
      <div id="gtm-title">Página de Formulário</div>
      <div class="checkbox" data-testid="checkbox1">
        <input type="checkbox" id="check1" />
        <label for="check1">Aceitar termos</label>
      </div>
      <div class="checkbox" data-testid="checkbox2">
        <input type="checkbox" id="check2" />
        <label for="check2">Receber newsletter</label>
      </div>
    `;

    // Executar a função de rastreamento
    checkbox();

    // Obter todos os checkboxes
    const checkboxElements = document.querySelectorAll(".checkbox");

    // Verificar se os atributos foram adicionados ao primeiro checkbox
    expect(checkboxElements[0].getAttribute("data-gtm-name")).toBe("formatted-Página de Formulário");
    expect(checkboxElements[0].getAttribute("data-gtm-clicktype")).toBe("checkbox");

    // Verificar se os atributos foram adicionados ao segundo checkbox
    expect(checkboxElements[1].getAttribute("data-gtm-name")).toBe("formatted-Página de Formulário");
    expect(checkboxElements[1].getAttribute("data-gtm-clicktype")).toBe("checkbox");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("Página de Formulário");
    expect(formatGtmText).toHaveBeenCalledTimes(2);
  });

  it("deve usar valores padrão quando elementos não existem", () => {
    // Configurar o DOM sem o elemento de título
    document.body.innerHTML = `
      <div class="checkbox" data-testid="checkbox1">
        <input type="checkbox" id="check1" />
        <label for="check1">Aceitar termos</label>
      </div>
    `;

    // Executar a função de rastreamento
    checkbox();

    // Obter o checkbox
    const checkboxElement = document.querySelector(".checkbox");

    // Verificar se os atributos foram adicionados com valores padrão
    expect(checkboxElement.getAttribute("data-gtm-name")).toBe("formatted-sem-titulo");
    expect(checkboxElement.getAttribute("data-gtm-clicktype")).toBe("checkbox");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("sem-titulo");
    expect(formatGtmText).toHaveBeenCalledTimes(1);
  });
});
