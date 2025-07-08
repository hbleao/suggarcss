'use client';

import useScript from './useScript';

import type { CustomDataProps } from './types';

export const CustomData = ({
  pageName,
  product,
  vertical,
  subproduct,
  category,
  funnel = '',
  cpf = ''
}: CustomDataProps) => {
  useScript(pageName, product, vertical, subproduct, category, funnel, cpf);

  return <></>;
};
