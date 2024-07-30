import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

/** Navigation service. */
@Injectable({ providedIn: 'root' })
export class NavigationService {
	private readonly router = inject(Router);

	public constructor(private readonly activatedRoute: ActivatedRoute) {}

	/**
	 * Navigate to endpoint.
	 * @param endpoint Endpoint.
	 * @param params Query params.
	 */
	public navigate(endpoint: string, params?: Readonly<Record<string, string>>): void {
		if (params != null) {
			this.removeUndefined(params);
		}
		this.activatedRoute.queryParams.pipe(
			tap(() => this.router.navigate([endpoint], {
				queryParams: params,
			})),
		).subscribe();
	}

	private removeUndefined(params: Readonly<Record<string, string>>): Readonly<Record<string, string>> {
		return JSON.parse(JSON.stringify(params));
	}
}
