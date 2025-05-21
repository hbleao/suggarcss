import { selects } from "./select";
import { formatGtmText } from "./utils";

// Mock da função formatGtmText
jest.mock("./utils", () => ({
  formatGtmText: jest.fn((text) => `formatted-${text}`),
}));

describe("selects tracking", () => {
  // Setup do DOM para os testes
  beforeEach(() => {
    // Limpar o DOM antes de cada teste
    document.body.innerHTML = "";
    
    // Resetar os mocks
    jest.clearAllMocks();
  });

  it("deve adicionar atributos data-gtm aos selects", () => {
    // Configurar o DOM com elementos para teste
    document.body.innerHTML = `
      <div id="gtm-title">Formulário de Filtro</div>
      <div class="dropdown">
        <label>Estado</label>
        <select>
          <option value="SP">São Paulo</option>
          <option value="RJ">Rio de Janeiro</option>
        </select>
      </div>
      <div class="dropdown">
        <label>Cidade</label>
        <select>
          <option value="1">São Paulo</option>
          <option value="2">Rio de Janeiro</option>
        </select>
      </div>
    `;

    // Executar a função de rastreamento
    selects();

    // Obter todos os dropdowns
    const dropdownElements = document.querySelectorAll(".dropdown");

    // Verificar se os atributos foram adicionados ao primeiro dropdown
    expect(dropdownElements[0].getAttribute("data-gtm-name")).toBe("formatted-Estado");
    expect(dropdownElements[0].getAttribute("data-gtm-clicktype")).toBe("select");

    // Verificar se os atributos foram adicionados ao segundo dropdown
    expect(dropdownElements[1].getAttribute("data-gtm-name")).toBe("formatted-Cidade");
    expect(dropdownElements[1].getAttribute("data-gtm-clicktype")).toBe("select");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("Estado");
    expect(formatGtmText).toHaveBeenCalledWith("Cidade");
  });

  it("deve usar valores padrão quando elementos não existem", () => {
    // Configurar o DOM sem labels
    document.body.innerHTML = `
      <div class="dropdown">
        <select>
          <option value="1">Opção 1</option>
        </select>
      </div>
    `;

    // Executar a função de rastreamento
    selects();

    // Obter o dropdown
    const dropdownElement = document.querySelector(".dropdown");

    // Verificar se os atributos foram adicionados com valores padrão
    expect(dropdownElement.getAttribute("data-gtm-name")).toBe("formatted-sem-valor");
    expect(dropdownElement.getAttribute("data-gtm-clicktype")).toBe("select");

    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("sem-valor");
  });
});
