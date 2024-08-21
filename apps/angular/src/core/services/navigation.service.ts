import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AnimeManagementParamsDto } from '../dtos/anime-management-params.dto';

/** Navigation service. */
@Injectable({ providedIn: 'root' })
export class NavigationService {
	private readonly router = inject(Router);

	/**
	 * Navigate to endpoint.
	 * @param url Endpoint.
	 * @param params Query params.
	 */
	public navigate(url: string, params?: AnimeManagementParamsDto): void {
		this.router.navigate([url], {
			queryParams: params,
		});
	}
}
