import { ValidationBuilder, ValidationComposite } from '@/validation/validators';

const validationSchema = {
  cpf: ValidationBuilder.field('cpf')
    .required()
    .cpf('Informe um CPF válido.')
    .get(),
  fullName: ValidationBuilder.field('fullName')
    .required()
    .minWords(2, 'Informe o nome completo.')
    .get(),
  email: ValidationBuilder.field('email')
    .required()
    .email('Informe um email válido.')
    .get(),
};

// Junta tudo numa lista plana
const validation = ValidationComposite.build(
  Object.values(validationSchema).flat()
);

export function handleFieldsValidation(fields: Record<string, string>) {
  return Object.entries(fields).reduce((errors, [field, value]) => {
    if (value.length > 5) {
      const errorMessage = validation.validate(field, value);
      if (errorMessage) errors[field] = errorMessage;
    }
    return errors;
  }, {} as Record<string, string>);
}
