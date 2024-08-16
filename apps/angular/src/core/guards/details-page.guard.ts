import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';

import { StorageService } from '../services/storage.service';
import { NavigationService } from '../services/navigation.service';

/** Details page guard. */
@Injectable({ providedIn: 'root' })
export class DetailsPageGuard implements CanActivate {
	private readonly navigationService = inject(NavigationService);

	private readonly storageService = inject(StorageService);

	/**
	 * Can activate anime details page route.
	 * @param route Route.
	 * @param state State.
	 */
	public canActivate(): boolean {
		const tokens = this.storageService.getItem('authTokens');
		if (tokens == null) {
			this.navigationService.navigate('/login');
			return false;
		}
		return true;
	}
}
