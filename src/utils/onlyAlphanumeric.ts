export function onlyAlphanumericMask(value: string): string {
	if (!value) return '';

	const pattern = /[^0-9a-zA-zÀ-ú\s]/gi

	return value
		.normalize('NFD')
		.replace(pattern, '')
		.trim();
}
