import { CustomError } from '../../errors';
import { CPFValidation } from './index';

describe('CPFValidation', () => {
  const field = 'cpf';
  const errorMessage = 'Invalid CPF';
  const validator = new CPFValidation(field, errorMessage);

  it('should return null for a valid CPF', () => {
    const validCpf = '52998224725';
    expect(validator.validate(validCpf)).toBeNull();
  });

  it('should return error for an invalid CPF', () => {
    const invalidCpf = '12345678908';
    expect(validator.validate(invalidCpf)).toEqual(
      new CustomError(errorMessage),
    );
  });

  it('should return error for a CPF with repeated numbers', () => {
    const repeatedCpf = '11111111111';
    expect(validator.validate(repeatedCpf)).toEqual(
      new CustomError(errorMessage),
    );
  });

  it('should return error for an empty CPF', () => {
    expect(validator.validate('')).toEqual(new CustomError(errorMessage));
  });
});
