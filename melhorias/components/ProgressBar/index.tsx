'use client';
import { useEffect, useState } from 'react';
import s from './styles.module.scss';

export type ProgressBarProps = {
	initialValue?: number;
	value: number;
	color?: string;
};

export const ProgressBar = ({
	initialValue = 0,
	value,
	color,
}: ProgressBarProps) => {
	const [barWidth, setBarWidth] = useState(initialValue);

	useEffect(() => {
		const timmer = setTimeout(() => {
			setBarWidth(value);
		}, 0);

		return () => {
			clearInterval(timmer);
		};
	}, []);

	return (
		<div className={s.progressBar}>
			<div
				className={s.progressBarFill}
				style={{
					width: `${barWidth}%`,
					backgroundColor: color || '#0046c0',
				}}
			/>
		</div>
	);
};
