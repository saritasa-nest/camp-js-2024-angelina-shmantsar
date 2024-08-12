import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

/** Navigation service. */
@Injectable({ providedIn: 'root' })
export class NavigationService {
	private readonly router = inject(Router);

	/**
	 * Navigate to endpoint.
	 * @param url Endpoint.
	 * @param params Query params.
	 */
	public navigate(url: string, params?: Readonly<Record<string, string>>): void {
		this.router.navigate([url], {
			queryParams: params,
		});
	}
}
