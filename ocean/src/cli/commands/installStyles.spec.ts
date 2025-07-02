import fs from 'fs-extra';
import path from 'node:path';
import { installStyles } from './installStyles';
import { confirm, input } from '@inquirer/prompts';

// Mock do fs-extra
jest.mock('fs-extra', () => ({
  existsSync: jest.fn(),
  ensureDirSync: jest.fn(),
  copySync: jest.fn(),
}));

// Mock do @inquirer/prompts
jest.mock('@inquirer/prompts', () => ({
  confirm: jest.fn(),
  input: jest.fn(),
}));

// Mock do process.exit
const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`Process.exit(${code})`);
});

// Mock do console.log e console.error
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('installStyles', () => {
  // Limpar todos os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve instalar estilos quando o diretório de destino é fornecido como parâmetro', async () => {
    // Mock para existsSync retornar true para um caminho específico
    (fs.existsSync as jest.Mock).mockImplementation((path) => {
      return path.includes('dist/styles');
    });

    // Chamar a função com um diretório de destino
    await installStyles('./test-styles');

    // Verificar se as funções corretas foram chamadas
    expect(fs.existsSync).toHaveBeenCalled();
    expect(fs.ensureDirSync).toHaveBeenCalled();
    expect(fs.copySync).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Instalando estilos base'));
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Estilos instalados com sucesso'));
  });

  it('deve perguntar pelo diretório de destino quando não é fornecido como parâmetro', async () => {
    // Mock para input retornar um diretório
    (input as jest.Mock).mockResolvedValue('./test-styles');
    
    // Mock para confirm retornar true
    (confirm as jest.Mock).mockResolvedValue(true);

    // Mock para existsSync retornar true para um caminho específico
    (fs.existsSync as jest.Mock).mockImplementation((path) => {
      return path.includes('dist/styles');
    });

    // Chamar a função sem um diretório de destino
    await installStyles();

    // Verificar se as funções corretas foram chamadas
    expect(input).toHaveBeenCalled();
    expect(confirm).toHaveBeenCalled();
    expect(fs.existsSync).toHaveBeenCalled();
    expect(fs.ensureDirSync).toHaveBeenCalled();
    expect(fs.copySync).toHaveBeenCalled();
  });

  it('deve sair quando o usuário cancela a instalação', async () => {
    // Mock para input retornar um diretório
    (input as jest.Mock).mockResolvedValue('./test-styles');
    
    // Mock para confirm retornar false (usuário cancela)
    (confirm as jest.Mock).mockResolvedValue(false);

    // Chamar a função sem um diretório de destino e esperar que ela lance um erro
    await expect(installStyles()).rejects.toThrow('Process.exit(0)');

    // Verificar se as funções corretas foram chamadas
    expect(input).toHaveBeenCalled();
    expect(confirm).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(0);
    expect(fs.copySync).not.toHaveBeenCalled();
  });

  it('deve sair com erro quando os estilos não são encontrados', async () => {
    // Mock para existsSync retornar false para todos os caminhos
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    // Chamar a função com um diretório de destino e esperar que ela lance um erro
    await expect(installStyles('./test-styles')).rejects.toThrow('Process.exit(1)');

    // Verificar se as funções corretas foram chamadas
    expect(fs.existsSync).toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith(expect.stringContaining('Estilos não encontrados'));
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(fs.copySync).not.toHaveBeenCalled();
  });
});
