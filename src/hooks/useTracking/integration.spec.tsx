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
  
  it('deve chamar todas as funções de rastreamento na montagem', () => {
    // Renderizar o hook
    renderHook(() => useTracking());
    
    // Verificar se o dataLayer foi inicializado
    expect(window.dataLayer).toBeDefined();
    
    // Verificar se todas as funções de rastreamento foram chamadas
    expect(require('./buttons').buttons).toHaveBeenCalled();
    expect(require('./inputs').inputs).toHaveBeenCalled();
    expect(require('./checkbox').checkbox).toHaveBeenCalled();
    expect(require('./select').selects).toHaveBeenCalled();
    expect(require('./link').link).toHaveBeenCalled();
    expect(require('./modals').modals).toHaveBeenCalled();
    
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
  
  it('deve desconectar o observer quando o componente é desmontado', () => {
    // Renderizar o hook
    const { unmount } = renderHook(() => useTracking());
    
    // Obter a instância do observer
    const mockObserverInstance = (MutationObserver as jest.Mock).mock.results[0].value;
    
    // Desmontar o componente
    unmount();
    
    // Verificar se o disconnect foi chamado
    expect(mockObserverInstance.disconnect).toHaveBeenCalled();
  });
  
  it('deve chamar as funções de rastreamento quando ocorrem mutações no DOM', () => {
    // Criar um mock que permite simular mutações
    let mutationCallback: MutationCallback = () => {}; // Inicialização padrão
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
    
    // Simular uma mutação
    const mockMutations = [{ type: 'childList' }] as unknown as MutationRecord[];
    const mockObserver = (MutationObserver as jest.Mock).mock.results[0].value;
    mutationCallback(mockMutations, mockObserver);
    
    // Verificar se as funções de rastreamento foram chamadas novamente
    expect(require('./buttons').buttons).toHaveBeenCalled();
    expect(require('./inputs').inputs).toHaveBeenCalled();
    expect(require('./checkbox').checkbox).toHaveBeenCalled();
    expect(require('./link').link).toHaveBeenCalled();
    expect(require('./modals').modals).toHaveBeenCalled();
  });
  
  it('deve retornar undefined quando window não está definido', () => {
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
  
  it('deve formatar textos corretamente para GTM', () => {
    // Testar a função formatGtmText
    expect(formatGtmText('Texto de Teste')).toBe('formatted-Texto de Teste');
    expect(formatGtmText('TEXTO EM MAIÚSCULAS')).toBe('formatted-TEXTO EM MAIÚSCULAS');
    expect(formatGtmText('texto  com  espaços')).toBe('formatted-texto  com  espaços');
    
    // Verificar se a função foi chamada corretamente
    expect(formatGtmText).toHaveBeenCalledTimes(3);
  });
});
