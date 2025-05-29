import fs from 'fs-extra';
import path from 'node:path';
import * as utils from './utils';

// Mock do fs-extra
jest.mock('fs-extra', () => ({
  existsSync: jest.fn(),
  readdirSync: jest.fn(),
  statSync: jest.fn(),
}));

describe('CLI Utils', () => {
  // Limpar todos os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAvailableComponents', () => {
    it('deve retornar uma lista de componentes quando o diretório existe', () => {
      // Mock para existsSync retornar true para o primeiro caminho
      (fs.existsSync as jest.Mock).mockImplementation((path) => {
        return path.includes('src/components');
      });

      // Mock para readdirSync retornar uma lista de diretórios
      (fs.readdirSync as jest.Mock).mockReturnValue(['Button', 'Card', 'Input']);

      // Mock para statSync retornar um objeto com isDirectory() que retorna true
      (fs.statSync as jest.Mock).mockReturnValue({
        isDirectory: () => true,
      });

      const result = utils.getAvailableComponents();
      expect(result).toEqual(['Button', 'Card', 'Input']);
      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.readdirSync).toHaveBeenCalled();
    });

    it('deve retornar um array vazio quando nenhum caminho de componentes é encontrado', () => {
      // Mock para existsSync retornar false para todos os caminhos
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const result = utils.getAvailableComponents();
      expect(result).toEqual([]);
      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.readdirSync).not.toHaveBeenCalled();
    });

    it('deve filtrar apenas diretórios', () => {
      // Mock para existsSync retornar true para o primeiro caminho
      (fs.existsSync as jest.Mock).mockImplementation((path) => {
        return path.includes('src/components');
      });

      // Mock para readdirSync retornar uma lista de arquivos e diretórios
      (fs.readdirSync as jest.Mock).mockReturnValue(['Button', 'Card', 'README.md']);

      // Mock para statSync retornar um objeto com isDirectory() que retorna true apenas para diretórios
      (fs.statSync as jest.Mock).mockImplementation((path) => ({
        isDirectory: () => !path.includes('README.md'),
      }));

      const result = utils.getAvailableComponents();
      expect(result).toEqual(['Button', 'Card']);
      expect(fs.statSync).toHaveBeenCalledTimes(3);
    });
  });

  describe('getImplementedComponents', () => {
    it('deve retornar todos os componentes disponíveis', () => {
      // Mock para getAvailableComponents retornar uma lista de componentes
      jest.spyOn(utils, 'getAvailableComponents').mockReturnValue(['Button', 'Card', 'Input']);

      const result = utils.getImplementedComponents();
      expect(result).toEqual(['Button', 'Card', 'Input']);
    });
  });

  describe('findResourcePath', () => {
    it('deve retornar o caminho correto para um recurso existente', () => {
      // Mock para existsSync retornar true para um caminho específico
      (fs.existsSync as jest.Mock).mockImplementation((path) => {
        return path.includes('src/components');
      });

      const result = utils.findResourcePath('components');
      expect(result).not.toBe('');
      expect(fs.existsSync).toHaveBeenCalled();
    });

    it('deve retornar uma string vazia quando o recurso não é encontrado', () => {
      // Mock para existsSync retornar false para todos os caminhos
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const result = utils.findResourcePath('invalid-resource');
      expect(result).toBe('');
      expect(fs.existsSync).toHaveBeenCalled();
    });
  });


});
