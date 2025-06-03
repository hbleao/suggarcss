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
      <div class="checkbox__input" data-testid="checkbox1" title="Aceitar termos">
        <input type="checkbox" id="check1" />
        <label for="check1">Aceitar termos</label>
      </div>
      <div class="checkbox__input" data-testid="checkbox2" title="Receber newsletter">
        <input type="checkbox" id="check2" />
        <label for="check2">Receber newsletter</label>
      </div>
    `;

    // Executar a função de rastreamento
    checkbox();

    // Obter todos os checkboxes
    const checkboxElements = document.querySelectorAll(".checkbox__input");

    // Verificar se os checkboxes foram encontrados
    expect(checkboxElements.length).toBe(2);

    // Verificar se os atributos foram adicionados ao primeiro checkbox
    expect(checkboxElements[0].getAttribute("data-gtm-name")).toBe("formatted-Página de Formulário");
    expect(checkboxElements[0].getAttribute("data-gtm-clicktype")).toBe("checkbox");
    expect(checkboxElements[0].getAttribute("data-gtm-subname")).toBe("formatted-Aceitar termos");

    // Verificar se os atributos foram adicionados ao segundo checkbox
    expect(checkboxElements[1].getAttribute("data-gtm-name")).toBe("formatted-Página de Formulário");
    expect(checkboxElements[1].getAttribute("data-gtm-clicktype")).toBe("checkbox");
    expect(checkboxElements[1].getAttribute("data-gtm-subname")).toBe("formatted-Receber newsletter");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("Página de Formulário");
    expect(formatGtmText).toHaveBeenCalledWith("Aceitar termos");
    expect(formatGtmText).toHaveBeenCalledWith("Receber newsletter");
    expect(formatGtmText).toHaveBeenCalledTimes(4);
  });

  it("deve usar valores padrão quando elementos não existem", () => {
    // Configurar o DOM sem o elemento de título
    document.body.innerHTML = `
      <div class="checkbox__input" data-testid="checkbox1">
        <input type="checkbox" id="check1" />
        <label for="check1">Aceitar termos</label>
      </div>
    `;

    // Executar a função de rastreamento
    checkbox();

    // Obter o checkbox
    const checkboxElement = document.querySelector(".checkbox__input");
    
    // Verificar se o checkbox foi encontrado
    if (!checkboxElement) {
      fail("Checkbox não encontrado");
      return;
    }

    // Verificar se os atributos foram adicionados com valores padrão
    expect(checkboxElement.getAttribute("data-gtm-name")).toBe("formatted-sem-titulo");
    expect(checkboxElement.getAttribute("data-gtm-clicktype")).toBe("checkbox");
    expect(checkboxElement.getAttribute("data-gtm-subname")).toBe("formatted-sem-label");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("sem-titulo");
    expect(formatGtmText).toHaveBeenCalledWith("sem-label");
    expect(formatGtmText).toHaveBeenCalledTimes(2);
  });
});
