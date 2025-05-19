import { renderHook } from '@testing-library/react';
import { useLockScroll } from '../useLockScroll';

describe('useLockScroll', () => {
  let originalStyle: CSSStyleDeclaration;
  let bodyStyle: CSSStyleDeclaration;
  
  beforeEach(() => {
    // Salvar os estilos originais do body
    originalStyle = window.getComputedStyle(document.body);
    bodyStyle = document.body.style;
    
    // Limpar os estilos do body antes de cada teste
    bodyStyle.overflow = '';
    bodyStyle.paddingRight = '';
    
    // Mock para window.scrollY e window.innerWidth
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0
    });
    
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024
    });
    
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      value: 1024
    });
    
    // Mock para window.scrollTo
    window.scrollTo = jest.fn();
  });
  
  afterEach(() => {
    // Restaurar os mocks
    jest.clearAllMocks();
  });
  
  it('deve bloquear o scroll quando isLocked é true', () => {
    renderHook(() => useLockScroll(true));
    
    // Verificar se o overflow do body foi definido como hidden
    expect(bodyStyle.overflow).toBe('hidden');
  });
  
  it('não deve bloquear o scroll quando isLocked é false', () => {
    renderHook(() => useLockScroll(false));
    
    // Verificar se o overflow do body permanece vazio
    expect(bodyStyle.overflow).toBe('');
  });
  
  it('deve restaurar o estilo original quando isLocked muda de true para false', () => {
    // Definir um estilo inicial para o body
    bodyStyle.overflow = 'auto';
    
    const { rerender } = renderHook(({ isLocked }) => useLockScroll(isLocked), {
      initialProps: { isLocked: true }
    });
    
    // Verificar se o overflow do body foi alterado para hidden
    expect(bodyStyle.overflow).toBe('hidden');
    
    // Mudar isLocked para false
    rerender({ isLocked: false });
    
    // Verificar se o overflow do body foi restaurado para auto
    expect(bodyStyle.overflow).toBe('auto');
  });
  
  it('deve adicionar padding-right quando reserveScrollBarWidth é true e existe uma barra de rolagem', () => {
    // Simular uma barra de rolagem de 20px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1044
    });
    
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      value: 1024
    });
    
    renderHook(() => useLockScroll(true, { reserveScrollBarWidth: true }));
    
    // Verificar se o padding-right foi adicionado
    expect(bodyStyle.paddingRight).toBe('20px');
  });
  
  it('não deve adicionar padding-right quando não existe uma barra de rolagem', () => {
    // Simular ausência de barra de rolagem
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024
    });
    
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      value: 1024
    });
    
    renderHook(() => useLockScroll(true, { reserveScrollBarWidth: true }));
    
    // Verificar se o padding-right não foi alterado
    expect(bodyStyle.paddingRight).toBe('');
  });
  
  it('deve restaurar o padding-right original quando isLocked muda de true para false', () => {
    // Definir um padding-right inicial
    bodyStyle.paddingRight = '10px';
    
    // Simular uma barra de rolagem de 20px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1044
    });
    
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      value: 1024
    });
    
    const { rerender } = renderHook(({ isLocked, options }) => useLockScroll(isLocked, options), {
      initialProps: { isLocked: true, options: { reserveScrollBarWidth: true } }
    });
    
    // Verificar se o padding-right foi alterado
    expect(bodyStyle.paddingRight).toBe('20px');
    
    // Mudar isLocked para false
    rerender({ isLocked: false, options: { reserveScrollBarWidth: true } });
    
    // Verificar se o padding-right foi restaurado
    expect(bodyStyle.paddingRight).toBe('10px');
  });
  
  it('deve fixar a posição do scroll quando isLocked é true', () => {
    // Simular uma posição de scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100
    });
    
    renderHook(() => useLockScroll(true));
    
    // Verificar se window.scrollTo foi chamado com os valores corretos
    expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
  });
  
  it('deve aplicar o bloqueio a um elemento específico quando targetElement é fornecido', () => {
    // Criar um elemento de teste
    const testElement = document.createElement('div');
    document.body.appendChild(testElement);
    
    renderHook(() => useLockScroll(true, { targetElement: testElement }));
    
    // Verificar se o overflow do elemento foi definido como hidden
    expect(testElement.style.overflow).toBe('hidden');
    
    // Limpar
    document.body.removeChild(testElement);
  });
  
  it('deve limpar os estilos quando o componente é desmontado', () => {
    // Definir estilos iniciais
    bodyStyle.overflow = 'auto';
    bodyStyle.paddingRight = '10px';
    
    const { unmount } = renderHook(() => useLockScroll(true));
    
    // Verificar se os estilos foram alterados
    expect(bodyStyle.overflow).toBe('hidden');
    
    // Desmontar o hook
    unmount();
    
    // Verificar se os estilos foram restaurados
    expect(bodyStyle.overflow).toBe('auto');
    expect(bodyStyle.paddingRight).toBe('10px');
  });
});
