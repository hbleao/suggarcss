'use client';

import './styles.scss';

import { Typography } from '@/components/Typography';

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
		<div className="pet-data__section">
			<Typography variant="body1" color="neutral-700">
				{title}
			</Typography>
			<div className="section__list">
				{PET_LIST.map(({ icon: Icon, label, type }) => (
					<button
						title={label}
						type="button"
						key={type}
						className={`section__btn ${type === petType ? 'section__btn-active' : ''}`}
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
