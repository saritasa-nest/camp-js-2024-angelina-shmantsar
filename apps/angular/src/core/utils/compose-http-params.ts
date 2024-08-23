import { HttpParams } from '@angular/common/http';

import { AnimeManagementParamsDto } from '../dtos/anime-management-params.dto';

/**
 * Compose fields from 'params' to new HttpParams object.
 * @param params Query params.
 */
export function composeHttpParams(params: AnimeManagementParamsDto): HttpParams {
	return Object.entries(params).reduce((queryParams, [key, value]) => {
		if (params[key as keyof AnimeManagementParamsDto] != null) {
			return queryParams.set(key, value);
		}
		return queryParams;
	}, new HttpParams());
}
