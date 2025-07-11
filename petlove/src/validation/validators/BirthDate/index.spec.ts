import { CustomError } from '../../errors/CustomError';
import { BirthDateValidation } from './index';

describe('BirthDateValidation', () => {
  const field = 'birthDate';
  const errorMessage = 'Invalid birth date';
  const validator = new BirthDateValidation(field, errorMessage);

  function generateDateString(
    day: number,
    month: number,
    year: number,
  ): string {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US');
  }

  it('should return null when birth date is valid', () => {
    const validDate = generateDateString(1, 1, 2000);
    expect(validator.validate(validDate)).toBeNull();
  });

  it('should return error for future birth date', () => {
    const futureDate = generateDateString(1, 1, 3000);
    expect(validator.validate(futureDate)).toEqual(
      new CustomError(errorMessage),
    );
  });

  it('should return error when birth date is invalid', () => {
    const invalidFormatDate = '01-01-2000';
    expect(validator.validate(invalidFormatDate)).toEqual(
      new CustomError(errorMessage),
    );
  });

  it('should return error for birth date under 18 years', () => {
    const underageDate = generateDateString(
      1,
      1,
      new Date().getFullYear() - 17,
    );
    expect(validator.validate(underageDate)).toEqual(
      new CustomError('Age less than 18 or greater than 80'),
    );
  });

  it('should return error when birth date is over 80 years', () => {
    const overageDate = generateDateString(1, 1, new Date().getFullYear() - 81);
    expect(validator.validate(overageDate)).toEqual(
      new CustomError('Age less than 18 or greater than 80'),
    );
  });

  it('should return error for empty birth date', () => {
    expect(validator.validate('')).toEqual(
      new CustomError('Required field'),
    );
  });
});
