import { CustomError } from '../../errors';
import type { FieldValidation } from '../../interface';

export class MinValueValidation implements FieldValidation {
  constructor(
    readonly field: string,
    readonly errorMessage = 'valor inválido',
    readonly minValue?: number,
  ) {}

  validate(value: string): Error | null {
    const numericValue = Number(value);

    if (!this.minValue) return new CustomError(this.errorMessage);
    if (!numericValue) return new CustomError(this.errorMessage);
    if (numericValue < this.minValue) return new CustomError(this.errorMessage);

    return null;
  }
}
