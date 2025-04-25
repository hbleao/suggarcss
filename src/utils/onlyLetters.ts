export function onlyLetterMask(value: string): string {
	if (!value) return '';

	const pattern = /[^A-zÀ-ú\s]/gi
	
	return value
		.normalize('NFD')
		.replace(pattern, '')
		.trim();
}
