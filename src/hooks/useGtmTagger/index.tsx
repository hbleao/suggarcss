'use client';
import { useEffect } from 'react';

import { buttons } from './buttons';
import { checkbox } from './checkbox';
import { inputs } from './inputs';
import { link } from './link';
import { selects } from './select';

export const useGtmTagger = () => {
	window.dataLayer = window.dataLayer || [];

	useEffect(() => {
		buttons();
		inputs();
		checkbox();
		selects();
		link();

		const observer = new MutationObserver(() => {
			buttons();
			inputs();
			checkbox();
			selects();
			link();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		const modalObserver = new MutationObserver(() => {
			console.log('Houve uma mudança no dom');
		});

		const modal = document.querySelector('.modal__root');
		console.log('Modal encontrado', !!modal, modal);

		// if (modal) {
		// 	modalObserver.observe(modal, {
		// 		childList: true,
		// 		subtree: true,
		// 	});
		// }

		return () => {
			observer.disconnect();
			modalObserver.disconnect();
		};
	}, []);
};
