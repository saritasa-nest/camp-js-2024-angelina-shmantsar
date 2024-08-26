import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { StorageService } from '../services/storage.service';

/** Details page guard. */
@Injectable({ providedIn: 'root' })
export class DetailsPageGuard implements CanActivate {
	private readonly storageService = inject(StorageService);

	private readonly router = inject(Router);

	/**
	 * Can activate anime details page route.
	 * @param route Route.
	 * @param state State.
	 */
	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const tokens = this.storageService.getItem('authTokens');
		if (tokens == null) {
			this.router.navigate(['login'], { queryParams: { redirectUrl: state.url } });
			return false;
		}
		return true;
	}
}
