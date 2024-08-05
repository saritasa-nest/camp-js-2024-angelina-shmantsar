import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

/** Navigation service. */
@Injectable({ providedIn: 'root' })
export class NavigationService {
	private readonly router = inject(Router);

	private readonly destroyReference = inject(DestroyRef);

	public constructor(private readonly activatedRoute: ActivatedRoute) {}

	/**
	 * Navigate to endpoint.
	 * @param endpoint - Endpoint.
	 * @param params - Query params.
	 */
	public navigate(endpoint: string, params?: Readonly<Record<string, string>>): void {
		if (params != null) {
			this.removeUndefined(params);
		}
		this.activatedRoute.queryParams.pipe(
			tap(() => this.router.navigate([endpoint], {
				queryParams: params,
			})),
			takeUntilDestroyed(this.destroyReference),
		).subscribe();
	}

	private removeUndefined(params: Readonly<Record<string, string>>): Readonly<Record<string, string>> {
		return JSON.parse(JSON.stringify(params));
	}
}
