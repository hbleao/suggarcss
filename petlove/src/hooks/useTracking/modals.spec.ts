import { modals } from './modals';

// Mock do dataLayer global
beforeEach(() => {
  // Configurar o mock do dataLayer
  window.dataLayer = window.dataLayer || [];
  jest.spyOn(window.dataLayer, 'push').mockImplementation((...args: unknown[]) => {
    return Array.prototype.push.apply(window.dataLayer, args);
  });
});

// Limpar mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('modals tracking', () => {
  it('should track modals when there is a modal parameter in the URL', () => {
    // Configurar URL com um modal
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('modal', 'teste');
    window.history.pushState({}, '', `?${searchParams.toString()}`);
    
    // Executar a função modals
    modals();
    
    // Verificar se o evento foi disparado para o modal na URL
    expect(window.dataLayer.push).toHaveBeenCalledWith({
      event: 'modal',
      action: 'open',
      name: 'teste'
    });
  });

  it('should track modals with custom values', () => {
    // Executar a função modals
    modals();
    
    // Limpar as chamadas anteriores
    jest.clearAllMocks();
    
    // Configurar o localStorage para simular um modal atual
    window.localStorage.setItem('@petlove:current-modal', 'teste');
    
    // Disparar evento popstate
    window.dispatchEvent(new Event('popstate'));
    
    // Verificar se o evento foi processado e o dataLayer.push foi chamado
    // com o evento de abertura do modal
    expect(window.dataLayer.push).toHaveBeenCalledWith({
      event: 'modal',
      action: 'open',
      name: 'teste'
    });
  });
});
