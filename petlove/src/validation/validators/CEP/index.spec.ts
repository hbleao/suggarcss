import { CustomError } from '../../errors/CustomError';
import { CepValidation } from './index';

describe('CepValidation', () => {
  const field = 'cep';
  const errorMessage = 'CEP inválido';
  const validator = new CepValidation(field, errorMessage);

  it('should return null for a valid CEP', () => {
    const validCep = '12345678';
    expect(validator.validate(validCep)).toBeNull();
  });

  it('should return error for an invalid CEP', () => {
    const invalidCep = '1234567';
    expect(validator.validate(invalidCep)).toEqual(
      new CustomError(errorMessage),
    );
  });

  it('should return error for a CEP with letters', () => {
    const invalidCep = '1234abcd';
    expect(validator.validate(invalidCep)).toEqual(
      new CustomError(errorMessage),
    );
  });

  it('should return error for an empty CEP', () => {
    expect(validator.validate('')).toEqual(new CustomError(errorMessage));
  });
});
