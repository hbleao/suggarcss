/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
'use client';
import { useEffect } from 'react';

import { useAquisitionStore } from '@/store';
import { formatGtmText } from '@/utils';
import { encryptGtmClientId } from '@/utils/encrypt';
// import { encryptGtmClientId } from '@/utils/encrypt/encryptGtmClientId';

const useScript = (
	pageName: string,
	product: string,
	vertical: string,
	subproduct: string,
	category: string,
	funnel?: string,
) => {
	const saveDataFLow = useAquisitionStore((state) => state.data);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const userClientId = encryptGtmClientId(saveDataFLow?.user?.cpf);

		window.customData = {
			page: {
				name: pageName,
				porto_product: product,
				porto_subproduct: formatGtmText(subproduct),
				category: category,
				vertical: vertical,
				funnel: funnel,
			},
			site: {
				portal: 'hub-vendas',
				versao: '1',
				marca: 'porto',
			},
			user: {
				product_login: 'sem-produto',
				user_id: saveDataFLow?.user?.cpf ? userClientId : '',
				logged: false,
				client_bcp: '',
			},
		};
	}, []);
};

export default useScript;
