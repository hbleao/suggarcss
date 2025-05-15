import { renderHook, act } from '@testing-library/react';
import { useCookie } from '../useCookie';

describe('useCookie', () => {
  // Limpar cookies antes de cada teste
  beforeEach(() => {
    // Limpar todos os cookies
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  });

  // Função auxiliar para obter um cookie específico
  const getCookie = (name: string): string | undefined => {
    const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
    return match ? decodeURIComponent(match[3]) : undefined;
  };

  it('deve inicializar com o valor padrão quando o cookie não existe', () => {
    const { result } = renderHook(() => useCookie('testCookie', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
  });

  it('deve definir e recuperar um cookie', () => {
    const { result } = renderHook(() => useCookie('testCookie', 'defaultValue'));
    
    // Definir o cookie
    act(() => {
      result.current[1]('newValue');
    });
    
    // Verificar se o valor do estado foi atualizado
    expect(result.current[0]).toBe('newValue');
    
    // Verificar se o cookie foi definido no documento
    expect(getCookie('testCookie')).toBe('newValue');
  });

  it('deve remover um cookie', () => {
    const { result } = renderHook(() => useCookie('testCookie', 'defaultValue'));
    
    // Definir o cookie
    act(() => {
      result.current[1]('someValue');
    });
    
    // Verificar se o cookie foi definido
    expect(result.current[0]).toBe('someValue');
    expect(getCookie('testCookie')).toBe('someValue');
    
    // Remover o cookie
    act(() => {
      result.current[2]();
    });
    
    // Verificar se o cookie foi removido
    expect(result.current[0]).toBe('defaultValue');
    expect(getCookie('testCookie')).toBeUndefined();
  });

  it('deve aceitar opções ao definir um cookie', () => {
    const { result } = renderHook(() => useCookie('testCookie', 'defaultValue'));
    
    // Definir o cookie com opções
    act(() => {
      result.current[1]('optionsValue', { path: '/test', days: 1 });
    });
    
    // Verificar se o valor do estado foi atualizado
    expect(result.current[0]).toBe('optionsValue');
    
    // Verificar se o cookie foi definido no documento
    expect(getCookie('testCookie')).toBe('optionsValue');
    
    // Não podemos testar facilmente as opções como path e expiração em um ambiente de teste,
    // pois document.cookie não fornece acesso a esses metadados
  });

  it('deve manter o valor do cookie entre renderizações', () => {
    // Definir um cookie manualmente
    document.cookie = 'persistentCookie=persistentValue;path=/';
    
    // Primeira renderização deve obter o valor existente
    const { result, rerender } = renderHook(() => useCookie('persistentCookie', 'defaultValue'));
    expect(result.current[0]).toBe('persistentValue');
    
    // Re-renderizar o hook
    rerender();
    
    // O valor deve persistir
    expect(result.current[0]).toBe('persistentValue');
  });
});
