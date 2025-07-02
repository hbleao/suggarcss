'use client';

import { useEffect } from 'react';

import { Button, HeaderAcquisitionFlow, Typography } from '@/components';

export default function Error({
	error,
	reset,
}: Error & {
	digest: string;
}) {
	useEffect(() => {
		console.error(`Erro capturado: ${error}`);
	}, [error]);

	return (
		<div>
			<HeaderAcquisitionFlow goBackLink="/loja/petlove/dados-do-pet" />
			<main
				style={{
					margin: '0 auto',
					marginTop: '94px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '16px',
				}}
			>
				<Typography variant="title4" weight="bold">
					Ops! Algo deu errado
				</Typography>
				<Button variant="negative" onClick={reset}>
					Por favor, tente novamente.
				</Button>
			</main>
		</div>
	);
}
