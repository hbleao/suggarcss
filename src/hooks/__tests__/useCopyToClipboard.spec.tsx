import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyToClipboard', () => {
  // Mock para a API Clipboard
  const mockClipboard = {
    writeText: jest.fn(),
  };

  beforeEach(() => {
    // Configurar o mock do clipboard antes de cada teste
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });
    
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    
    // Verificar estado inicial
    expect(result.current[0]).toBeNull();
    expect(typeof result.current[1]).toBe('function');
  });

  it('deve copiar texto para a área de transferência com sucesso', async () => {
    // Configurar o mock para resolver com sucesso
    mockClipboard.writeText.mockResolvedValueOnce(undefined);
    
    const { result } = renderHook(() => useCopyToClipboard());
    
    // Executar a função de cópia
    await act(async () => {
      await result.current[1]('Texto a ser copiado');
    });
    
    // Verificar se o clipboard foi chamado com o texto correto
    expect(mockClipboard.writeText).toHaveBeenCalledWith('Texto a ser copiado');
    
    // Verificar se o estado foi atualizado
    expect(result.current[0]).toBe('Texto a ser copiado');
  });

  it('deve lidar com erros ao copiar para a área de transferência', async () => {
    // Configurar o mock para rejeitar com um erro
    const mockError = new Error('Erro ao copiar');
    mockClipboard.writeText.mockRejectedValueOnce(mockError);
    
    // Spy no console.error para evitar logs de erro nos testes
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const { result } = renderHook(() => useCopyToClipboard());
    
    // Executar a função de cópia
    await act(async () => {
      await result.current[1]('Texto que falhará');
    });
    
    // Verificar se o clipboard foi chamado
    expect(mockClipboard.writeText).toHaveBeenCalledWith('Texto que falhará');
    
    // Verificar se o estado permanece null (não foi atualizado devido ao erro)
    expect(result.current[0]).toBeNull();
    
    // Verificar se o erro foi logado
    expect(console.error).toHaveBeenCalled();
    
    // Restaurar o console.error
    (console.error as jest.Mock).mockRestore();
  });

  it('deve copiar diferentes tipos de texto', async () => {
    // Configurar o mock para resolver com sucesso
    mockClipboard.writeText.mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useCopyToClipboard());
    
    // Copiar uma string simples
    await act(async () => {
      await result.current[1]('Texto simples');
    });
    expect(mockClipboard.writeText).toHaveBeenLastCalledWith('Texto simples');
    expect(result.current[0]).toBe('Texto simples');
    
    // Copiar um JSON stringificado
    const jsonObject = { name: 'Test', value: 42 };
    const jsonString = JSON.stringify(jsonObject);
    
    await act(async () => {
      await result.current[1](jsonString);
    });
    expect(mockClipboard.writeText).toHaveBeenLastCalledWith(jsonString);
    expect(result.current[0]).toBe(jsonString);
    
    // Copiar um código
    const codeSnippet = 'const x = 42; console.log(x);';
    
    await act(async () => {
      await result.current[1](codeSnippet);
    });
    expect(mockClipboard.writeText).toHaveBeenLastCalledWith(codeSnippet);
    expect(result.current[0]).toBe(codeSnippet);
  });
});
