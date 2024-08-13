import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from '@js-camp/angular/core/services/navigation.service';
import { LocalStorageService } from '@js-camp/angular/core/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

/** App header component. */
@Component({
	selector: 'camp-app-header',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule, RouterOutlet, AsyncPipe],
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent {
	private readonly navigationService = inject(NavigationService);

	private readonly localStorageService = inject(LocalStorageService);

	private readonly accessToken = this.localStorageService.getItem('accessToken') ?? '';

	/** Is user authorized. */
	protected readonly isAuthorized$ = new BehaviorSubject(this.accessToken.length > 0);

	/** On login. */
	protected onLogin(): void {
		this.navigationService.navigate('/login');
	}

	/** On logout. */
	protected onLogout(): void {
		this.localStorageService.removeItem('accessToken');
		this.localStorageService.removeItem('refreshToken');
		this.isAuthorized$.next(false);
	}
}
