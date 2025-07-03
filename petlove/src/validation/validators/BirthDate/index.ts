import { differenceInYears, isValid, parse } from 'date-fns';
import { CustomError } from '../../errors/CustomError';
import type { FieldValidation } from '../../interface';

export class BirthDateValidation implements FieldValidation {
  constructor(
    readonly field: string,
    readonly errorMessage?: string,
  ) {}

  validate(value: string): Error | null {
    if (value) {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      if (!isValid(parsedDate)) {
        return new CustomError(this.errorMessage);
      }
      const now = new Date();
      const currentYear = now.getFullYear();
      const birthYear = parsedDate.getFullYear();

      if (birthYear >= currentYear) {
        return new CustomError(this.errorMessage);
      }
      const age = differenceInYears(now, parsedDate);
      if (age < 18 || age > 80) {
        return new CustomError('Age less than 18 or greater than 80');
      }
      return null;
    }
    return new CustomError('Required field');
  }
}
