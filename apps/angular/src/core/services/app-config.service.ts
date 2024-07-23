import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Works with environment variables. */
@Injectable({ providedIn: 'root' })
export class AppConfigService {
	private readonly variables = environment;

	/** Get baseApiUrl environment variable. */
	public get baseApiUrl(): string {
		return this.variables.baseApiUrl;
	}

	/** Get apiKey environment variable. */
	public get apiKey(): string {
		return this.variables.apiKey;
	}
}
