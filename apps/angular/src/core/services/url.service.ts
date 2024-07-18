import { Injectable } from '@angular/core';

import { environment } from '@js-camp/angular/environments/environment';

/** Creates urls. */
@Injectable({
	providedIn: 'root',
})
export class UrlService {
	private readonly baseApiUrl = environment.baseApiUrl;

	private readonly baseAnimeUrl = `${this.baseApiUrl}anime/`;

	/** Get anime endpoint url. */
	public getAnimeUrl(): string {
		return `${this.baseAnimeUrl}anime/`;
	}
}
