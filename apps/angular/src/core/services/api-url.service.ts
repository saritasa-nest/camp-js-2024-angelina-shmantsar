import { Injectable, inject } from '@angular/core';

import { AppConfigService } from './app-config.service';

/** Creates urls. */
@Injectable({ providedIn: 'root' })
export class ApiUrlService {
	private constructUrl(endpoint: string): string {
		return `${this.baseApiUrl}${endpoint}`;
	}

	/** Written above public member because it is needed in 'constructUrl'. */
	private readonly appConfigService = inject(AppConfigService);

	private readonly baseApiUrl = this.appConfigService.baseApiUrl;

	/** List of anime endpoints. */
	public readonly anime = {
		list: this.constructUrl('anime/anime/'),
	};
}
