import { selects } from "./select";
import { formatGtmText } from "./utils";

// Mock da função formatGtmText
jest.mock("./utils", () => ({
  formatGtmText: jest.fn((text) => `formatted-${text}`),
}));

// Configurar os timers falsos do Jest
jest.useFakeTimers();

describe("selects tracking", () => {
  // Setup do DOM e mocks para os testes
  beforeEach(() => {
    // Limpar o DOM antes de cada teste
    document.body.innerHTML = "";
    
    // Resetar os mocks
    jest.clearAllMocks();
    
    // Mock para window.dataLayer
    global.window.dataLayer = [];
    jest.spyOn(global.window.dataLayer, 'push');
  });

  it("deve adicionar event listeners aos dropdown items", () => {
    // Configurar o DOM com elementos para teste
    document.body.innerHTML = `
      <div id="gtm-title">Formulário de Filtro</div>
      <div class="dropdown__root">
        <div class="dropdown__label">Estado</div>
        <div class="dropdown__item">São Paulo</div>
        <div class="dropdown__item">Rio de Janeiro</div>
      </div>
    `;

    // Executar a função de rastreamento
    selects();

    // Simular o clique no dropdown
    const dropdown = document.querySelector(".dropdown__root");
    if (!dropdown) {
      fail("Dropdown não encontrado");
      return;
    }
    dropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    
    // Aguardar o setTimeout
    jest.runAllTimers();
    
    // Simular o clique em um item do dropdown
    const dropdownItem = document.querySelector(".dropdown__item");
    if (!dropdownItem) {
      fail("Dropdown item não encontrado");
      return;
    }
    dropdownItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    
    // Verificar se dataLayer.push foi chamado com os parâmetros corretos
    expect(window.dataLayer.push).toHaveBeenCalledWith({
      event: 'auto.event',
      ev_action: 'selecionou:formatted-Formulário de Filtro',
      ev_label: 'formatted-Estado:formatted-São Paulo',
    });
    
    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("Formulário de Filtro");
    expect(formatGtmText).toHaveBeenCalledWith("Estado");
    expect(formatGtmText).toHaveBeenCalledWith("São Paulo");
  });

  it("deve usar valores padrão quando elementos não existem", () => {
    // Configurar o DOM sem o elemento de título e sem label
    document.body.innerHTML = `
      <div class="dropdown__root">
        <div class="dropdown__item"></div>
      </div>
    `;

    // Executar a função de rastreamento
    selects();

    // Simular o clique no dropdown
    const dropdown = document.querySelector(".dropdown__root");
    if (!dropdown) {
      fail("Dropdown não encontrado");
      return;
    }
    dropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    
    // Aguardar o setTimeout
    jest.runAllTimers();
    
    // Simular o clique em um item do dropdown
    const dropdownItem = document.querySelector(".dropdown__item");
    if (!dropdownItem) {
      fail("Dropdown item não encontrado");
      return;
    }
    dropdownItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    
    // Verificar se dataLayer.push foi chamado com os parâmetros corretos
    expect(window.dataLayer.push).toHaveBeenCalledWith({
      event: 'auto.event',
      ev_action: 'selecionou:formatted-sem-titulo',
      ev_label: 'formatted-sem-valor:formatted-sem-texto',
    });
    
    // Verificar se a função formatGtmText foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledWith("sem-titulo");
    expect(formatGtmText).toHaveBeenCalledWith("sem-valor");
    expect(formatGtmText).toHaveBeenCalledWith("sem-texto");
  });
  
  it("deve lidar com o caso em que window.dataLayer não existe", () => {
    // Remover window.dataLayer
    // @ts-ignore - Ignorando erro de TypeScript para fins de teste
    global.window.dataLayer = null;
    
    // Configurar o DOM para o teste
    document.body.innerHTML = `
      <div id="gtm-title">Formulário de Filtro</div>
      <div class="dropdown__root">
        <div class="dropdown__label">Estado</div>
        <div class="dropdown__item">São Paulo</div>
      </div>
    `;

    // Executar a função de rastreamento
    selects();

    // Simular o clique no dropdown
    const dropdown = document.querySelector(".dropdown__root");
    if (!dropdown) {
      fail("Dropdown não encontrado");
      return;
    }
    dropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    
    // Aguardar o setTimeout
    jest.runAllTimers();
    
    // Simular o clique em um item do dropdown
    const dropdownItem = document.querySelector(".dropdown__item");
    if (!dropdownItem) {
      fail("Dropdown item não encontrado");
      return;
    }
    dropdownItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    
    // Verificar se window.dataLayer foi inicializado
    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);
    expect(window.dataLayer.length).toBe(1);
  });
});
