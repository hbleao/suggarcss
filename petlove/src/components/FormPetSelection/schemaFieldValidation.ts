import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

export const validation = ValidationComposite.build([
	...ValidationBuilder.field('petName')
		.max(99, 'O nome do pet não pode ter mais de 99 caracteres')
		.min(3, 'O nome do pet precisa ter mais de 3 caracteres')
		.required()
		.build(),
]);
