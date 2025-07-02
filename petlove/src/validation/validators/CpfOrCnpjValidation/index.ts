import { removeSpecialCharacters } from '../../helpers';
import type { FieldValidation } from '../../interface';
import { CnpjValidation } from '../CNPJ';
import { CPFValidation } from '../CPF';

export class CpfOrCnpjValidation implements FieldValidation {
  constructor(
    readonly field: string,
    readonly errorMessage?: string,
  ) {}

  validate(value: string): Error | null {
    const isCpf = removeSpecialCharacters(value).length <= 11;
    const cpfValidator = new CPFValidation(
      this.field,
      'CPF com valor inválido',
    );
    const cnpjValidator = new CnpjValidation(
      this.field,
      'CNPJ com valor inválido',
    );

    if (!value) return null;

    if (isCpf) return cpfValidator.validate(value);

    return cnpjValidator.validate(value);
  }
}
