import { HttpParams } from '@angular/common/http';

/**
 * Compose fields from 'params' to new HttpParams object.
 * @param params Query params.
 */
export function composeHttpParams(params: Readonly<Record<string, string>>): HttpParams {
	let queryParams = new HttpParams();
	for (const key in params) {
		if (params[key] != null) {
			queryParams = queryParams.set(key, params[key]);
		}
	}
	return queryParams;
}
