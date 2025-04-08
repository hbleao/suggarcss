import React, { useState } from 'react';

export const useKeyPress = (targetKey: string): boolean => {
	const [keyPressed, setKeyPressed] = useState(false);

	function downHandler(keyboardEvent: KeyboardEvent) {
		if (keyboardEvent.key === targetKey) {
			setKeyPressed(true);
		}
	}

	const upHandler = (keyboardEvent: KeyboardEvent) => {
		if (keyboardEvent.key === targetKey) {
			setKeyPressed(false);
		}
	};

	React.useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);

		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	});

	return keyPressed;
};
