import { Injectable, inject } from '@angular/core';

import { AppConfigService } from './app-config.service';

/** Creates urls. */
@Injectable({ providedIn: 'root' })
export class ApiUrlService {
	private readonly appConfigService = inject(AppConfigService);

	private constructUrl(endpoint: string): string {
		return `${this.baseApiUrl}${endpoint}`;
	}

	private readonly baseApiUrl = this.appConfigService.baseApiUrl;

	/** List of anime endpoints. */
	public readonly anime = {
		listUrl: this.constructUrl('anime/anime/'),
	};

	/** List of auth endpoints. */
	public readonly auth = {
		loginUrl: this.constructUrl('auth/login/'),
		registerUrl: this.constructUrl('auth/register/'),
		tokenRefreshUrl: this.constructUrl('auth/token/refresh/'),
	};
}
