import { CustomError } from '../../errors';
import { CpfOrCnpjValidation } from './index';

jest.mock('../CPF', () => ({
  CPFValidation: jest.fn().mockImplementation(() => ({
    validate: jest.fn((value) =>
      value === 'validCPF' ? null : new CustomError('CPF com valor inválido'),
    ),
  })),
}));

jest.mock('../CNPJ', () => ({
  CnpjValidation: jest.fn().mockImplementation(() => ({
    validate: jest.fn((value) =>
      value === 'validCNPJ' ? null : new CustomError('CNPJ com valor inválido'),
    ),
  })),
}));

describe('CpfOrCnpjValidation', () => {
  const field = 'cpfOrCnpj';
  const errorMessage = 'Documento inválido';
  const validator = new CpfOrCnpjValidation(field, errorMessage);

  it('should return null for a valid CPF', () => {
    const validCpf = '83488595005';
    expect(validator.validate(validCpf)).toBeNull();
  });

  it('should return error for an invalid CPF', () => {
    const invalidCPF = '999.999.999-99';
    expect(validator.validate(invalidCPF)).toEqual(
      new CustomError('CPF com valor inválido'),
    );
  });

  it('should return null for a valid CNPJ', () => {
    const validCNPJ = '55328882000100';
    expect(validator.validate(validCNPJ)).toBeNull();
  });

  it('should return error for an invalid CNPJ', () => {
    const invalidCNPJ = '553.555.55555/555';
    expect(validator.validate(invalidCNPJ)).toEqual(
      new CustomError('CNPJ com valor inválido'),
    );
  });

  it('should return null for an empty value', () => {
    expect(validator.validate('')).toBeNull();
  });
});
