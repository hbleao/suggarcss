import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '..';
import { ValidationBuilder } from './index';

const makeSut = ({ fieldName }: any): { sut: ValidationBuilder } => {
  const sut = ValidationBuilder.field(fieldName);

  return {
    sut,
  };
};

describe('ValidationBuilder', () => {
  const fieldName = 'testField';

  it('should create a ValidationBuilder instance with no validations', () => {
    const { sut } = makeSut({ fieldName });
    expect(sut).toBeInstanceOf(ValidationBuilder);
  });

  it('should add a required field validation', () => {
    const { sut } = makeSut({ fieldName });
    const requireValidation = sut.required();

    expect(requireValidation['validations']).toHaveLength(1);
    expect(requireValidation['validations'][0]).toBeInstanceOf(
      RequiredFieldValidation,
    );
  });

  it('should add an email validation', () => {
    const { sut } = makeSut({ fieldName });
    const emailValidation = sut.email();

    expect(emailValidation['validations']).toHaveLength(1);
    expect(emailValidation['validations'][0]).toBeInstanceOf(EmailValidation);
  });

  it('should add a min length validation', () => {
    const minLength = 5;
    const { sut } = makeSut({ fieldName });
    const minValidation = sut.min(minLength);

    expect(minValidation['validations']).toHaveLength(1);
    expect(minValidation['validations'][0]).toBeInstanceOf(MinLengthValidation);
  });

  it('should chain multiple validations', () => {
    const minLength = 5;
    const { sut } = makeSut({ fieldName });
    const compositionValidation = sut.required().email().min(minLength);

    expect(compositionValidation['validations']).toHaveLength(3);
    expect(compositionValidation['validations'][0]).toBeInstanceOf(
      RequiredFieldValidation,
    );
    expect(compositionValidation['validations'][1]).toBeInstanceOf(
      EmailValidation,
    );
    expect(compositionValidation['validations'][2]).toBeInstanceOf(
      MinLengthValidation,
    );
  });
});
