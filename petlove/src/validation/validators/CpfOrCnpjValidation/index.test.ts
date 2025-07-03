import { CustomError } from '../../errors';
import { CpfOrCnpjValidation } from './index';

jest.mock('../CPF', () => ({
  CPFValidation: jest.fn().mockImplementation(() => ({
    validate: jest.fn((value) =>
      value === '52998224725' ? null : new CustomError('CPF with invalid value'),
    ),
  })),
}));

jest.mock('../CNPJ', () => ({
  CnpjValidation: jest.fn().mockImplementation(() => ({
    validate: jest.fn((value) =>
      value === '63025530000104' ? null : new CustomError('CNPJ with invalid value'),
    ),
  })),
}));

describe('CpfOrCnpjValidation', () => {
  const field = 'cpfOrCnpj';
  const errorMessage = 'Invalid document';
  const validator = new CpfOrCnpjValidation(field, errorMessage);

  it('should return null for a valid CPF', () => {
    const validCpf = '52998224725';
    expect(validator.validate(validCpf)).toBeNull();
  });

  it('should return error for an invalid CPF', () => {
    const invalidCPF = '999.999.999-99';
    expect(validator.validate(invalidCPF)).toEqual(
      new CustomError('CPF with invalid value'),
    );
  });

  it('should return null for a valid CNPJ', () => {
    const validCNPJ = '63025530000104';
    expect(validator.validate(validCNPJ)).toBeNull();
  });

  it('should return error for an invalid CNPJ', () => {
    const invalidCNPJ = '553.555.55555/555';
    expect(validator.validate(invalidCNPJ)).toEqual(
      new CustomError('CNPJ with invalid value'),
    );
  });

  it('should return null for an empty value', () => {
    expect(validator.validate('')).toBeNull();
  });
});
