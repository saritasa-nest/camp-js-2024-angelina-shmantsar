import { Injectable } from '@angular/core';

import { environment } from '@js-camp/angular/environments/environment';

/** Endpoints. */
enum Endpoints {
	Anime = 'anime/anime/',
}

const { baseApiUrl } = environment;

/** Creates urls. */
@Injectable({ providedIn: 'root' })
export class ApiUrlService {
	private readonly _allAnimeUrl = `${baseApiUrl}${Endpoints.Anime}`;

	/** Get anime endpoint url. */
	public get allAnimeUrl(): string {
		return this._allAnimeUrl;
	}
}
