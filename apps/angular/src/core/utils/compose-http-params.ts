import { HttpParams } from '@angular/common/http';

/**
 * Compose fields from 'params' to new HttpParams object.
 * @param params Query params.
 */
export function composeHttpParams(params: Readonly<Record<string, string | number>>): HttpParams {
	return Object.entries(params).reduce((queryParams, [key, value]) => {
		if (params[key] != null) {
			return queryParams.set(key, value);
		}
		return queryParams;
	}, new HttpParams());
}
