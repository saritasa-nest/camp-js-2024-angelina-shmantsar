import { Injectable } from '@angular/core';

/** Local storage service. */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	/**
	 * Set local storage key "key" to "value".
	 * @param key - Key.
	 * @param value - Value.
	 */
	public setItem(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	/**
	 * Get local storage key "key" value.
	 * @param key - Key.
	 */
	public getItem(key: string): string | null {
		return localStorage.getItem(key);
	}

	/**
	 * Remove local storage key "key" value.
	 * @param key - Key.
	 */
	public removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	/**
	 * Clear local storage.
	 */
	public clear(): void {
		localStorage.clear();
	}
}
