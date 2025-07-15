// 'use client';

// // @ts-ignore - Ignorando erro de tipagem do next/navigation
// import { useRouter } from 'next/navigation';

// import { useAquisitionStore } from '@/store';
// import type { UserProps } from '@/store/aquisitionSlice/types';
// import type { UsePreviousScreenReturn } from './types';

// /**
//  * Hook para verificar se o usuário passou pela tela anterior no fluxo de aquisição
//  * @param currentScreen - Nome da tela atual no fluxo
//  * @returns Objeto com função para validar a tela anterior
//  */
// export const usePreviousScreen = (currentScreen: string): UsePreviousScreenReturn => {
//   const router = useRouter();
//   const { data } = useAquisitionStore((state: UserProps) => state);

//   // Mapa de fluxo: cada chave é uma tela e o valor é a tela anterior e seus campos obrigatórios
//   const flowMap: Record<string, { previousScreen: string; requiredFields: string[] }> = {
//     'cep': {
//       previousScreen: 'dados-do-pet',
//       requiredFields: ['pet.name', 'pet.type']
//     },
//     'endereco': {
//       previousScreen: 'cep',
//       requiredFields: ['address.cep']
//     },
//     'planos': {
//       previousScreen: 'endereco',
//       requiredFields: ['address.number']
//     },
//     'dados-pessoais': {
//       previousScreen: 'planos',
//       requiredFields: ['plan.id']
//     }
//   };

//   /**
//    * Verifica se um campo existe no objeto usando notação de ponto
//    */
//   const checkField = (obj: Record<string, unknown>, field: string): boolean => {
//     try {
//       const keys = field.split('.');
//       let current: unknown = obj;

//       // Navega pela estrutura do objeto
//       for (const key of keys) {
//         if (!current || typeof current !== 'object') return false;
//         current = (current as Record<string, unknown>)[key];
//       }

//       // Verifica se o valor existe e não está vazio
//       if (typeof current === 'string') return current.trim() !== '';
//       if (typeof current === 'number') return true;
//       return current !== null && current !== undefined;
//     } catch {
//       return false;
//     }
//   };

//   /**
//    * Valida se o usuário passou pela tela anterior e redireciona se necessário
//    */
//   const validatePreviousScreen = (): void => {
//     const screenConfig = flowMap[currentScreen];

//     // Se não há configuração para esta tela, não fazemos nada
//     if (!screenConfig) return;

//     // Verifica se todos os campos obrigatórios estão preenchidos
//     const allFieldsValid = screenConfig.requiredFields.every(field =>
//       checkField(data, field)
//     );

//     // Se algum campo obrigatório não estiver preenchido, redireciona para a tela anterior
//     if (!allFieldsValid) {
//       router.push(`/loja/petlove/${screenConfig.previousScreen}`);
//     }
//   };

//   return { validatePreviousScreen };
// };

'use client';

import { useRouter } from 'next/navigation';
import { useAquisitionStore } from '@/store';
import type { UsePreviousScreenReturn } from './types';

const flowMap = {
	cep: ['dados-do-pet', ['pet.name', 'pet.type']],
	endereco: ['cep', ['address.cep']],
	planos: ['endereco', ['address.number']],
	'dados-pessoais': ['planos', ['plan.id']],
} as const;

const hasField = (obj: any, path: string): boolean => {
	return (
		path.split('.').reduce((acc, key) => {
			if (acc && typeof acc === 'object') return acc[key];
			return undefined;
		}, obj) != null
	);
};

export const usePreviousScreen = (
	currentScreen: string,
): UsePreviousScreenReturn => {
	const router = useRouter();
	const { data } = useAquisitionStore();

	const validatePreviousScreen = () => {
		const config = flowMap[currentScreen];
		if (!config) return;

		const [previousScreen, fields] = config;
		const allValid = fields.every((f) => hasField(data, f));

		if (!allValid) {
			router.push(`/loja/petlove/${previousScreen}`);
		}
	};

	return { validatePreviousScreen };
};
