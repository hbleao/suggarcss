/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
'use client';
import { useEffect } from 'react';

import { encryptValue } from '@/services';
import { formatGtmText } from '@/utils';
import { removeSpecialCharacters } from '@/validation/helpers';

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    customData: any;
  }
}

const useScript = (
  pageName: string,
  product: string,
  vertical: string,
  subproduct: string,
  category: string,
  funnel?: string,
  cpf?: string
) => {

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const clientId = encryptValue(removeSpecialCharacters(cpf));

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
        versao: '1.2',
        marca: 'porto',
      },
      user: {
        product_login: 'sem-produto',
        user_id: cpf ? clientId : '',
        logged: false,
        client_bcp: '',
      },
    };
  }, []);
};

export default useScript;
