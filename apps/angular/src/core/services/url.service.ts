import { Injectable } from '@angular/core';

import { BASE_API_URL } from '../constants/backendConst';

/** Creates urls. */
@Injectable({
	providedIn: 'root',
})
export class UrlService {
	private readonly baseAnimeUrl = `${BASE_API_URL}anime/`;

	/** Get anime endpoint url. */
	public getAnimeUrl(): string {
		return `${this.baseAnimeUrl}anime/`;
	}
}
