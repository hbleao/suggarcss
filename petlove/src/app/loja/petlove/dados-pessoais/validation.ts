import { ValidationBuilder, ValidationComposite } from "@/validation/validators";

const validation = ValidationComposite.build([
  ...ValidationBuilder.field('cpf')
    .required()
    .cpf('Infome um CPF válido.')
    .build(),
  ...ValidationBuilder.field('fullName')
    .required()
    .minWords(2, 'Informe o nome completo.')
    .build(),
]);

export function handleFieldsValidation(fields: any) {
  let errors = {} as any;
  const fieldsValidation = [
    { field: 'fullName', value: fields.fullName },
    { field: 'cpf', value: fields.cpf },
  ];

  for (let i = 0; i < fieldsValidation.length; i++) {
    const value = fieldsValidation[i].value;

    if (value.length > 5) {
      const fieldName = fieldsValidation[i].field;
      const messageValidation = validation.validate(fieldName, value);

      errors = {
        ...errors,
        [fieldName]: messageValidation
      }
    }
  }

  return errors;
}
