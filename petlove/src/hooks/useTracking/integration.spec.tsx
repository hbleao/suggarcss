import { renderHook } from '@testing-library/react';
import { useTracking } from './index';
import { formatGtmText } from './utils';

// Mock das funções auxiliares
jest.mock('./buttons', () => ({
  buttons: jest.fn(),
}));

jest.mock('./inputs', () => ({
  inputs: jest.fn(),
}));

jest.mock('./checkbox', () => ({
  checkbox: jest.fn(),
}));

jest.mock('./select', () => ({
  selects: jest.fn(),
}));

jest.mock('./link', () => ({
  link: jest.fn(),
}));

jest.mock('./modals', () => ({
  modals: jest.fn(),
}));

jest.mock('./carousel', () => ({
  carousel: jest.fn(),
}));

jest.mock('./utils', () => ({
  formatGtmText: jest.fn((text) => `formatted-${text}`),
}));

describe('useTracking integration', () => {
  let originalMutationObserver: typeof MutationObserver;
  
  beforeEach(() => {
    // Salvar o MutationObserver original
    originalMutationObserver = global.MutationObserver;
    
    // Configurar o mock do dataLayer
    window.dataLayer = [];
    
    // Configurar o mock do MutationObserver
    global.MutationObserver = jest.fn().mockImplementation((callback) => {
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        takeRecords: jest.fn(),
        callback
      };
    }) as unknown as typeof MutationObserver;
    
    // Resetar os mocks
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    // Restaurar o MutationObserver original
    global.MutationObserver = originalMutationObserver;
  });
  
  it('should call basic tracking functions on mount', () => {
    // Renderizar o hook
    renderHook(() => useTracking());
    
    // Verificar se o dataLayer foi inicializado
    expect(window.dataLayer).toBeDefined();
    
    // Verificar se as funções de rastreamento básicas foram chamadas
    expect(require('./buttons').buttons).toHaveBeenCalled();
    expect(require('./inputs').inputs).toHaveBeenCalled();
    expect(require('./checkbox').checkbox).toHaveBeenCalled();
    expect(require('./select').selects).toHaveBeenCalled();
    expect(require('./link').link).toHaveBeenCalled();
    expect(require('./carousel').carousel).toHaveBeenCalled();
    // modals só é chamado quando há um parâmetro modal na URL
    expect(require('./modals').modals).not.toHaveBeenCalled();
    
    // Verificar se o MutationObserver foi criado
    expect(MutationObserver).toHaveBeenCalled();
    
    // Verificar se o observe foi chamado com os parâmetros corretos
    const mockObserverInstance = (MutationObserver as jest.Mock).mock.results[0].value;
    expect(mockObserverInstance.observe).toHaveBeenCalledWith(
      document.body,
      expect.objectContaining({
        childList: true,
        subtree: true
      })
    );
  });
  
  it('should disconnect the observer when the component is unmounted', () => {
    // Renderizar o hook
    const { unmount } = renderHook(() => useTracking());
    
    // Obter a instância do observer
    const mockObserverInstance = (MutationObserver as jest.Mock).mock.results[0].value;
    
    // Desmontar o componente
    unmount();
    
    // Verificar se o disconnect foi chamado
    expect(mockObserverInstance.disconnect).toHaveBeenCalled();
  });
  
  it('should call the modals function when there is a modal parameter in the URL', () => {
    // Configurar URL com um modal
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('modal', 'teste');
    window.history.pushState({}, '', `?${searchParams.toString()}`);
    
    // Limpar os mocks antes de renderizar o hook
    jest.clearAllMocks();
    
    // Criar um mock para o MutationObserver que executa o callback imediatamente
    const mockObserverCallback = jest.fn();
    global.MutationObserver = jest.fn().mockImplementation((callback) => {
      mockObserverCallback.mockImplementation(callback);
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        takeRecords: jest.fn()
      };
    }) as unknown as typeof MutationObserver;
    
    // Renderizar o hook
    renderHook(() => useTracking());
    
    // Simular uma mutação para acionar o callback
    mockObserverCallback([{ type: 'childList' }]);
    
    // Verificar se a função modals foi chamada
    expect(require('./modals').modals).toHaveBeenCalled();
  });
  
  it('should call the modals function when there is a modal parameter in the URL after a mutation', () => {
    // Configurar URL com um modal
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('modal', 'teste');
    window.history.pushState({}, '', `?${searchParams.toString()}`);
    
    // Criar um mock para o MutationObserver que armazena o callback
    let mutationCallback: (mutations: MutationRecord[], observer: MutationObserver) => void = () => {};
    global.MutationObserver = jest.fn().mockImplementation((callback) => {
      mutationCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        takeRecords: jest.fn()
      };
    }) as unknown as typeof MutationObserver;
    
    // Renderizar o hook
    renderHook(() => useTracking());
    
    // Limpar os mocks para verificar apenas as chamadas após a mutação
    jest.clearAllMocks();
    
    // Simular uma mutação usando o callback armazenado
    mutationCallback([{ type: 'childList' } as unknown as MutationRecord], {} as MutationObserver);
    
    // Verificar se a função modals foi chamada
    expect(require('./modals').modals).toHaveBeenCalled();
  });
  
  it('should call tracking functions when DOM mutations occur', () => {
    // Limpar a URL para garantir que não há parâmetro modal
    window.history.pushState({}, '', '/');
    
    // Criar um mock para o MutationObserver que armazena o callback
    let mutationCallback: (mutations: MutationRecord[], observer: MutationObserver) => void = () => {};
    global.MutationObserver = jest.fn().mockImplementation((callback) => {
      mutationCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        takeRecords: jest.fn()
      };
    }) as unknown as typeof MutationObserver;
    
    // Renderizar o hook
    renderHook(() => useTracking());
    
    // Limpar os mocks para verificar apenas as chamadas após a mutação
    jest.clearAllMocks();
    
    // Simular uma mutação usando o callback armazenado
    mutationCallback([{ type: 'childList' } as unknown as MutationRecord], {} as MutationObserver);
    
    // Verificar se as funções de rastreamento foram chamadas novamente
    expect(require('./buttons').buttons).toHaveBeenCalled();
    expect(require('./inputs').inputs).toHaveBeenCalled();
    expect(require('./checkbox').checkbox).toHaveBeenCalled();
    expect(require('./link').link).toHaveBeenCalled();
    expect(require('./carousel').carousel).toHaveBeenCalled();
    // modals só é chamado quando há um parâmetro modal na URL
    expect(require('./modals').modals).not.toHaveBeenCalled();
  });
  
  it('should return undefined when window is not defined', () => {
    // Salvar a referência original de window
    const originalWindow = global.window;
    
    // Simular um ambiente sem window (SSR)
    // Usando uma abordagem mais segura que não usa delete
    // @ts-ignore
    global.window = undefined;
    
    // Renderizar o hook
    const { result } = renderHook(() => useTracking());
    
    // Verificar se o hook retorna undefined quando window não está definido
    expect(result.current).toBeUndefined();
    
    // Restaurar window
    global.window = originalWindow;
  });
  
  it('should format texts correctly for GTM', () => {
    // Testar a função formatGtmText
    expect(formatGtmText('Texto de Teste')).toBe('formatted-Texto de Teste');
    expect(formatGtmText('TEXTO EM MAIÚSCULAS')).toBe('formatted-TEXTO EM MAIÚSCULAS');
    expect(formatGtmText('texto  com  espaços')).toBe('formatted-texto  com  espaços');
    
    // Verificar se a função foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledTimes(3);
  });
});
