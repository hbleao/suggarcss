import {
  BirthDateValidation,
  CPFValidation,
  CepValidation,
  CnpjValidation,
  CpfOrCnpjValidation,
  EmailValidation,
  MaxLengthValidation,
  MinLengthValidation,
  MinValueValidation,
  MinWordsValidation,
  RequiredFieldValidation,
} from '..';
import { ValidationBuilder } from './index';

const makeSut = (fieldName: string = 'testField'): ValidationBuilder => {
  return ValidationBuilder.field(fieldName);
};

describe('ValidationBuilder', () => {
  const fieldName = 'testField';

  it('should create a ValidationBuilder instance with no validations', () => {
    const sut = makeSut(fieldName);
    expect(sut).toBeInstanceOf(ValidationBuilder);
    expect(sut['validations']).toHaveLength(0);
  });

  it('should add a required field validation', () => {
    const sut = makeSut(fieldName);
    const requireValidation = sut.required();

    expect(requireValidation['validations']).toHaveLength(1);
    expect(requireValidation['validations'][0]).toBeInstanceOf(RequiredFieldValidation);
  });

  it('should add an email validation', () => {
    const sut = makeSut(fieldName);
    const emailValidation = sut.email();

    expect(emailValidation['validations']).toHaveLength(1);
    expect(emailValidation['validations'][0]).toBeInstanceOf(EmailValidation);
  });

  it('should add an email validation with custom error message', () => {
    const sut = makeSut(fieldName);
    const errorMessage = 'Custom email error';
    const emailValidation = sut.email(errorMessage);

    expect(emailValidation['validations']).toHaveLength(1);
    expect(emailValidation['validations'][0]).toBeInstanceOf(EmailValidation);
    expect(emailValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should add a min length validation', () => {
    const minLength = 5;
    const sut = makeSut(fieldName);
    const minValidation = sut.min(minLength);

    expect(minValidation['validations']).toHaveLength(1);
    expect(minValidation['validations'][0]).toBeInstanceOf(MinLengthValidation);
    // The validationValue is stored internally in the MinLengthValidation class
  });

  it('should add a min length validation with custom error message', () => {
    const minLength = 5;
    const errorMessage = 'Custom min length error';
    const sut = makeSut(fieldName);
    const minValidation = sut.min(minLength, errorMessage);

    expect(minValidation['validations']).toHaveLength(1);
    expect(minValidation['validations'][0]).toBeInstanceOf(MinLengthValidation);
    expect(minValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should add a min value validation', () => {
    const minValue = 10;
    const sut = makeSut(fieldName);
    const minValueValidation = sut.minValue(minValue);

    expect(minValueValidation['validations']).toHaveLength(1);
    expect(minValueValidation['validations'][0]).toBeInstanceOf(MinValueValidation);
    // The validationValue is stored internally in the MinValueValidation class
  });

  it('should add a min value validation with custom error message', () => {
    const minValue = 10;
    const errorMessage = 'Custom min value error';
    const sut = makeSut(fieldName);
    const minValueValidation = sut.minValue(minValue, errorMessage);

    expect(minValueValidation['validations']).toHaveLength(1);
    expect(minValueValidation['validations'][0]).toBeInstanceOf(MinValueValidation);
    expect(minValueValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should add a max length validation', () => {
    const maxLength = 20;
    const sut = makeSut(fieldName);
    const maxValidation = sut.max(maxLength);

    expect(maxValidation['validations']).toHaveLength(1);
    expect(maxValidation['validations'][0]).toBeInstanceOf(MaxLengthValidation);
    // The validationValue is stored internally in the MaxLengthValidation class
  });

  it('should add a max length validation with custom error message', () => {
    const maxLength = 20;
    const errorMessage = 'Custom max length error';
    const sut = makeSut(fieldName);
    const maxValidation = sut.max(maxLength, errorMessage);

    expect(maxValidation['validations']).toHaveLength(1);
    expect(maxValidation['validations'][0]).toBeInstanceOf(MaxLengthValidation);
    expect(maxValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should add a CPF validation', () => {
    const sut = makeSut(fieldName);
    const cpfValidation = sut.cpf();

    expect(cpfValidation['validations']).toHaveLength(1);
    expect(cpfValidation['validations'][0]).toBeInstanceOf(CPFValidation);
  });

  it('should add a CPF validation with custom error message', () => {
    const errorMessage = 'Custom CPF error';
    const sut = makeSut(fieldName);
    const cpfValidation = sut.cpf(errorMessage);

    expect(cpfValidation['validations']).toHaveLength(1);
    expect(cpfValidation['validations'][0]).toBeInstanceOf(CPFValidation);
    expect(cpfValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should add a CNPJ validation', () => {
    const sut = makeSut(fieldName);
    const cnpjValidation = sut.cnpj();

    expect(cnpjValidation['validations']).toHaveLength(1);
    expect(cnpjValidation['validations'][0]).toBeInstanceOf(CnpjValidation);
  });

  it('should add a CNPJ validation with custom error message', () => {
    const errorMessage = 'Custom CNPJ error';
    const sut = makeSut(fieldName);
    const cnpjValidation = sut.cnpj(errorMessage);

    expect(cnpjValidation['validations']).toHaveLength(1);
    expect(cnpjValidation['validations'][0]).toBeInstanceOf(CnpjValidation);
    expect(cnpjValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should add a CEP validation', () => {
    const sut = makeSut(fieldName);
    const cepValidation = sut.cep();

    expect(cepValidation['validations']).toHaveLength(1);
    expect(cepValidation['validations'][0]).toBeInstanceOf(CepValidation);
  });

  it('should add a CEP validation with custom error message', () => {
    const errorMessage = 'Custom CEP error';
    const sut = makeSut(fieldName);
    const cepValidation = sut.cep(errorMessage);

    expect(cepValidation['validations']).toHaveLength(1);
    expect(cepValidation['validations'][0]).toBeInstanceOf(CepValidation);
    expect(cepValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should add a birth date validation', () => {
    const sut = makeSut(fieldName);
    const birthDateValidation = sut.birthDate();

    expect(birthDateValidation['validations']).toHaveLength(1);
    expect(birthDateValidation['validations'][0]).toBeInstanceOf(BirthDateValidation);
  });

  it('should add a birth date validation with custom error message', () => {
    const errorMessage = 'Custom birth date error';
    const sut = makeSut(fieldName);
    const birthDateValidation = sut.birthDate(errorMessage);

    expect(birthDateValidation['validations']).toHaveLength(1);
    expect(birthDateValidation['validations'][0]).toBeInstanceOf(BirthDateValidation);
    expect(birthDateValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should add a CPF or CNPJ validation', () => {
    const sut = makeSut(fieldName);
    const cpfOrCnpjValidation = sut.cpfOrCnpj();

    expect(cpfOrCnpjValidation['validations']).toHaveLength(1);
    expect(cpfOrCnpjValidation['validations'][0]).toBeInstanceOf(CpfOrCnpjValidation);
  });

  it('should add a CPF or CNPJ validation with custom error message', () => {
    const errorMessage = 'Custom CPF or CNPJ error';
    const sut = makeSut(fieldName);
    const cpfOrCnpjValidation = sut.cpfOrCnpj(errorMessage);

    expect(cpfOrCnpjValidation['validations']).toHaveLength(1);
    expect(cpfOrCnpjValidation['validations'][0]).toBeInstanceOf(CpfOrCnpjValidation);
    expect(cpfOrCnpjValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should add a min words validation', () => {
    const minWords = 3;
    const sut = makeSut(fieldName);
    const minWordsValidation = sut.minWords(minWords);

    expect(minWordsValidation['validations']).toHaveLength(1);
    expect(minWordsValidation['validations'][0]).toBeInstanceOf(MinWordsValidation);
    // The validationValue is stored internally in the MinWordsValidation class
  });

  it('should add a min words validation with custom error message', () => {
    const minWords = 3;
    const errorMessage = 'Custom min words error';
    const sut = makeSut(fieldName);
    const minWordsValidation = sut.minWords(minWords, errorMessage);

    expect(minWordsValidation['validations']).toHaveLength(1);
    expect(minWordsValidation['validations'][0]).toBeInstanceOf(MinWordsValidation);
    expect(minWordsValidation['validations'][0]['errorMessage']).toBe(errorMessage);
  });

  it('should chain multiple validations', () => {
    const minLength = 5;
    const sut = makeSut(fieldName);
    const compositionValidation = sut.required().email().min(minLength);

    expect(compositionValidation['validations']).toHaveLength(3);
    expect(compositionValidation['validations'][0]).toBeInstanceOf(RequiredFieldValidation);
    expect(compositionValidation['validations'][1]).toBeInstanceOf(EmailValidation);
    expect(compositionValidation['validations'][2]).toBeInstanceOf(MinLengthValidation);
  });

  it('should build and return all validations', () => {
    const sut = makeSut(fieldName);
    const validations = sut.required().email().build();

    expect(validations).toHaveLength(2);
    expect(validations[0]).toBeInstanceOf(RequiredFieldValidation);
    expect(validations[1]).toBeInstanceOf(EmailValidation);
  });

  it('should build an empty array when no validations are added', () => {
    const sut = makeSut(fieldName);
    const validations = sut.build();

    expect(validations).toHaveLength(0);
    expect(validations).toEqual([]);
  });

  it('should create a complex validation chain with all validation types', () => {
    const sut = makeSut(fieldName);
    const validations = sut
      .required()
      .email()
      .min(5)
      .max(20)
      .minValue(10)
      .cpf()
      .cnpj()
      .cep()
      .birthDate()
      .cpfOrCnpj()
      .minWords(3)
      .build();

    expect(validations).toHaveLength(11);
    expect(validations[0]).toBeInstanceOf(RequiredFieldValidation);
    expect(validations[1]).toBeInstanceOf(EmailValidation);
    expect(validations[2]).toBeInstanceOf(MinLengthValidation);
    expect(validations[3]).toBeInstanceOf(MaxLengthValidation);
    expect(validations[4]).toBeInstanceOf(MinValueValidation);
    expect(validations[5]).toBeInstanceOf(CPFValidation);
    expect(validations[6]).toBeInstanceOf(CnpjValidation);
    expect(validations[7]).toBeInstanceOf(CepValidation);
    expect(validations[8]).toBeInstanceOf(BirthDateValidation);
    expect(validations[9]).toBeInstanceOf(CpfOrCnpjValidation);
    expect(validations[10]).toBeInstanceOf(MinWordsValidation);
  });
});
