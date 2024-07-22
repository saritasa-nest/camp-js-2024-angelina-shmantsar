import { Injectable } from '@angular/core';

import { environment } from '@js-camp/angular/environments/environment';

/** Creates urls. */
@Injectable({ providedIn: 'root' })
export class ApiUrlService {
	private readonly baseApiUrl = environment.baseApiUrl;

	private readonly baseAnimeUrl = `${this.baseApiUrl}anime/`;

	private readonly _allAnimeUrl = `${this.baseAnimeUrl}anime/`;

	/** Get anime endpoint url. */
	public get allAnimeUrl(): string {
		return this._allAnimeUrl;
	}
}
