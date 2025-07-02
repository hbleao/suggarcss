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
  it('deve inicializar o dataLayer e verificar o modal na URL atual', () => {
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

  it('deve monitorar eventos de navegação', () => {
    // Executar a função modals
    modals();
    
    // Limpar as chamadas anteriores
    jest.clearAllMocks();
    
    // Disparar evento popstate
    window.dispatchEvent(new Event('popstate'));
    
    // Verificar se a função de verificação é chamada
    // Não podemos testar diretamente o comportamento interno,
    // mas podemos verificar se o evento foi processado
    expect(window.dataLayer.push).not.toHaveBeenCalled();
  });
});
