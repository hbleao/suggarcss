'use client';

import useScript from './useScript';

import type { CustomDataProps } from './types';

export const CustomDataPage = ({
	pageName,
	product,
	vertical,
	subproduct,
	category,
	funnel = '',
}: CustomDataProps) => {
	useScript(pageName, product, vertical, subproduct, category, funnel);

	return <></>;
};
