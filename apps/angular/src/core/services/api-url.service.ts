import { Injectable, inject } from '@angular/core';

import { AppConfigService } from './app-config.service';

/** Creates urls. */
@Injectable({ providedIn: 'root' })
export class ApiUrlService {
	private readonly appConfigService = inject(AppConfigService);

	private readonly baseApiUrl = this.appConfigService.baseApiUrl;

	/** List of anime endpoints. */
	public readonly anime = {
		list: this.constructUrl('anime/anime/'),
	};

	private constructUrl(endpoint: string): string {
		return `${this.baseApiUrl}${endpoint}`;
	}

	/** Construct query params string.
	 * @param params - List of params.
	 */
	public constructQueryParams(...params: Readonly<Record<string, string>>[]): string {
		const urlParams = new URLSearchParams(...params);
		return urlParams.toString();
	}
}
