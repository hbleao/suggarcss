/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react";

// Mock dos módulos
jest.mock("./buttons", () => ({ buttons: jest.fn() }));
jest.mock("./inputs", () => ({ inputs: jest.fn() }));
jest.mock("./checkbox", () => ({ checkbox: jest.fn() }));
jest.mock("./select", () => ({ selects: jest.fn() }));
jest.mock("./link", () => ({ link: jest.fn() }));
jest.mock("./modals", () => ({ modals: jest.fn() }));

// Importar o hook após os mocks
import { useTracking } from "./index";

// Mock do MutationObserver
let mutationCallback: MutationCallback;
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

class MockMutationObserver {
  observe = mockObserve;
  disconnect = mockDisconnect;
  takeRecords = jest.fn();

  constructor(callback: MutationCallback) {
    mutationCallback = callback;
  }
}

describe("useTracking", () => {
  // Referências para os mocks
  const buttonsMock = require("./buttons").buttons;
  const inputsMock = require("./inputs").inputs;
  const checkboxMock = require("./checkbox").checkbox;
  const selectsMock = require("./select").selects;
  const linkMock = require("./link").link;
  const modalsMock = require("./modals").modals;
  
  // Salvar o MutationObserver original
  const originalMutationObserver = global.MutationObserver;

  beforeEach(() => {
    // Configurar o mock do dataLayer
    window.dataLayer = [];

    // Mock do MutationObserver
    global.MutationObserver = MockMutationObserver as unknown as typeof MutationObserver;

    // Resetar os mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restaurar o MutationObserver original
    global.MutationObserver = originalMutationObserver;
  });

  it("deve inicializar o dataLayer e chamar as funções de rastreamento", () => {
    renderHook(() => useTracking());
    
    // Verificar se o dataLayer foi inicializado
    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);

    // Verificar se as funções de rastreamento foram chamadas
    expect(buttonsMock).toHaveBeenCalled();
    expect(inputsMock).toHaveBeenCalled();
    expect(checkboxMock).toHaveBeenCalled();
    expect(selectsMock).toHaveBeenCalled();
    expect(linkMock).toHaveBeenCalled();
    expect(modalsMock).toHaveBeenCalled();

    // Verificar se o MutationObserver foi configurado corretamente
    expect(mockObserve).toHaveBeenCalledWith(
      document.body,
      expect.objectContaining({
        childList: true,
        subtree: true,
      })
    );
  });
  
  it("deve usar o dataLayer existente se já estiver definido", () => {
    // Configurar um dataLayer existente
    const existingDataLayer = [{ event: "test" }];
    window.dataLayer = existingDataLayer;
    
    renderHook(() => useTracking());
    
    // Verificar se o dataLayer existente foi mantido
    expect(window.dataLayer).toBe(existingDataLayer);
  });
  
  it("deve criar um novo dataLayer se window.dataLayer for null", () => {
    // Configurar window.dataLayer como null
    // @ts-ignore
    window.dataLayer = null;
    
    renderHook(() => useTracking());
    
    // Verificar se um novo dataLayer foi criado
    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });
  
  it("deve criar um novo dataLayer se window.dataLayer não for um array", () => {
    // Configurar window.dataLayer como um objeto não-array
    // @ts-ignore
    window.dataLayer = { evento: "teste" };
    
    renderHook(() => useTracking());
    
    // Verificar se um novo dataLayer vazio foi criado
    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);
    expect(window.dataLayer).toHaveLength(0);
  });
  
  it("deve criar um novo dataLayer se window.dataLayer for undefined", () => {
    // Configurar window.dataLayer como undefined
    // @ts-ignore
    window.dataLayer = undefined;
    
    renderHook(() => useTracking());
    
    // Verificar se um novo dataLayer foi criado
    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });
  
  it("deve lidar com o caso em que window é um objeto vazio", () => {
    // Salvar a referência original de window
    const originalWindow = global.window;
    
    // Criar um objeto window vazio (sem a propriedade dataLayer)
    // @ts-ignore
    global.window = {};
    
    renderHook(() => useTracking());
    
    // Verificar se um novo dataLayer foi criado
    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);
    
    // Restaurar window
    global.window = originalWindow;
  });

  it("deve desconectar o observer quando o componente é desmontado", () => {
    const { unmount } = renderHook(() => useTracking());
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("deve retornar undefined se window não estiver definido", () => {
    // Salvar a referência original de window
    const originalWindow = global.window;

    // Simular um ambiente sem window (SSR)
    // @ts-ignore
    global.window = undefined;

    // Limpar os mocks antes de renderizar o hook
    jest.clearAllMocks();
    
    // Renderizar o hook e verificar o resultado
    const { result } = renderHook(() => useTracking());
    expect(result.current).toBeUndefined();

    // Restaurar window
    global.window = originalWindow;
  });

  it("deve chamar as funções de rastreamento quando ocorrem mutações no DOM", () => {
    renderHook(() => useTracking());

    // Limpar os mocks para verificar apenas as chamadas após a mutação
    jest.clearAllMocks();

    // Simular uma mutação
    const mockMutations = [{ type: "childList" }] as unknown as MutationRecord[];
    mutationCallback(mockMutations, {} as MutationObserver);

    // Verificar se as funções de rastreamento foram chamadas novamente
    expect(buttonsMock).toHaveBeenCalled();
    expect(inputsMock).toHaveBeenCalled();
    expect(checkboxMock).toHaveBeenCalled();
    expect(linkMock).toHaveBeenCalled();
    expect(modalsMock).toHaveBeenCalled();
  });
});
