/**
 * Converts date in ISO string format to Locale string format.
 * @param isoString - Input date in ISO string format.
 */
export function convertIsoToLocale(isoString: string): string {
	const date = new Date(isoString);
	return date.toLocaleDateString('ru-RU');
}
