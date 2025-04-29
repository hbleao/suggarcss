"use client";
import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";

export type ProgressBarProps = {
	value: number;
	initialValue?: number;
	color?: string;
};

export const ProgressBar = ({
	value,
	initialValue = 0,
	color,
}: ProgressBarProps) => {
	const [progress, setProgress] = useState(initialValue);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setProgress(value);
		}, 20);
		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<div className={s.progressBar}>
			<div
				className={s.progressBar__fill}
				style={{
					width: `${progress}%`,
					backgroundColor: color ?? undefined,
				}}
			/>
		</div>
	);
};
