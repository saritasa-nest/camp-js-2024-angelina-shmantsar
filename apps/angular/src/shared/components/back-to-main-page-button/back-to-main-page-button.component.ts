import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

/** Back to main page button. */
@Component({
	selector: 'camp-back-to-main-page-button',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	templateUrl: './back-to-main-page-button.component.html',
	styleUrl: './back-to-main-page-button.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToMainPageButtonComponent {
	private readonly router = inject(Router);

	/** Navigate to main page. */
	protected navigateToMainPage(): void {
		this.router.navigate(['']);
	}
}
