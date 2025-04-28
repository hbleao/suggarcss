'use client';

import s from './styles.module.scss';

import { Typography } from '@/components/ui/Typography';

import { PET_LIST } from '@/constants';

export type PetSelectionProps = {
	title: string;
	petType?: string;
	onClick: (value: string) => void;
};

export const PetSelection = ({
	title,
	petType = 'cat',
	onClick,
}: PetSelectionProps) => {
	return (
		<div className={s.container}>
			<Typography variant="body1" color="black70">
				{title}
			</Typography>
			<div className={s.petList}>
				{PET_LIST.map(({ icon: Icon, label, type }) => (
					<button
						title={label}
						type="button"
						key={type}
						className={`${s.petButton} ${type === petType ? s.active : ''}`}
						onClick={() => onClick(type)}
					>
						<Icon />
						{label}
					</button>
				))}
			</div>
		</div>
	);
};
