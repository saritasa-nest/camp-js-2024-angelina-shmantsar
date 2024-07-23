import { Injectable, inject } from '@angular/core';

import { AppConfigService } from './app-config.service';

/** Creates urls. */
@Injectable({ providedIn: 'root' })
export class ApiUrlService {
	private readonly appConfigService = inject(AppConfigService);

	private readonly baseApiUrl = this.appConfigService.baseApiUrl;

	private readonly anime: Readonly<Record<string, string>> = {
		list: this.constructUrl('anime/anime/'),
	};

	/** Get anime endpoint url. */
	public get allAnimeUrl(): string {
		return this.anime['list'];
	}

	private constructUrl(endpoint: string): string {
		return `${this.baseApiUrl}${endpoint}`;
	}
}
