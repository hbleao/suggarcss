import { CustomError } from '../../errors';
import type { FieldValidation } from '../../interface';

export class MinWordsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    readonly errorMessage = 'Valor inválido',
    readonly minWords = 0,
  ) {}

  validate(value: string): Error | null {
    const words = value.trim().split(' ');

    if (words.length < this.minWords) {
      return new CustomError(this.errorMessage);
    }
    return null;
  }
}
