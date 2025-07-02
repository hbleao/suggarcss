import { CustomError } from '../../errors';

import { MinWordsValidation } from './index';

describe('MinLengthValidation', () => {
  const field = 'testField';
  const errorMessage = 'Valor com quantidade de palavras abaixo do mínimo';
  const minWords = 2;
  const validator = new MinWordsValidation(field, errorMessage, minWords);

  it('should return null for a string that meets the minimum word count', () => {
    const validValue = 'John Doe';
    expect(validator.validate(validValue)).toBeNull();
  });

  it('should return error message if value is invalid', () => {
    const invalidValue = 'John';
    expect(validator.validate(invalidValue)).toEqual(
      new CustomError(errorMessage),
    );
  });

  it('should return error message if value is empty', () => {
    const emptyValue = '';
    expect(validator.validate(emptyValue)).toEqual(
      new CustomError(errorMessage),
    );
  });

  it('should return error message if value contains empty space', () => {
    const valueWithEmptySpace = ' ';
    expect(validator.validate(valueWithEmptySpace)).toEqual(
      new CustomError(errorMessage),
    );
  });
});
