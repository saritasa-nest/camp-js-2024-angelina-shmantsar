import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Works with environment variables. */
@Injectable({ providedIn: 'root' })
export class AppConfigService {
	/** 'baseApiUrl' environment variable. */
	public readonly baseApiUrl = environment.baseApiUrl;

	/** 'apiKey' environment variable. */
	public readonly apiKey = environment.apiKey;
}
