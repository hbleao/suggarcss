import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

export const validation = ValidationComposite.build([
	...ValidationBuilder.field('cep').cep().required().build(),
]);
