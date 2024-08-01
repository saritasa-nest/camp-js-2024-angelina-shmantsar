import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from '@js-camp/angular/core/services/navigation.service';
import { CookieService } from 'ngx-cookie-service';

/** App header component. */
@Component({
	selector: 'camp-app-header',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule, RouterOutlet],
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent {
	private readonly navigationService = inject(NavigationService);

	private readonly cookieService = inject(CookieService);

	private readonly accessToken = this.cookieService.get('accessToken');

	/** Is user authorized. */
	protected readonly isAuthorized = signal<boolean>(this.accessToken.length > 0);

	/** On login. */
	protected onLogin(): void {
		this.navigationService.navigate('/auth');
	}

	/** On logout. */
	protected onLogout(): void {
		this.cookieService.delete('accessToken');
		this.cookieService.delete('refreshToken');
		this.isAuthorized.set(false);
	}
}
