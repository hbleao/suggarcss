import { CustomError } from '../../errors';
import type { FieldValidation } from '../../interface';

export class EmailValidation implements FieldValidation {
  constructor(
    readonly field: string,
    readonly errorMessage?: string,
  ) {}

  validate(value: string): Error | null {
    if (!value) return new CustomError(this.errorMessage);

    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return emailRegex.test(value) ? null : new CustomError(this.errorMessage);
  }
}
