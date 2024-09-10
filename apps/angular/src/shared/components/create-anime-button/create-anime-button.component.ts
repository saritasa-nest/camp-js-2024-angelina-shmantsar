import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

/** Create anime button. */
@Component({
	selector: 'camp-create-anime-button',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	templateUrl: './create-anime-button.component.html',
	styleUrl: './create-anime-button.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAnimeButtonComponent {
	private readonly router = inject(Router);

	/** Navigate to crete anime page. */
	protected navigateToCreateAnimePage(): void {
		this.router.navigate(['/anime/create']);
	}
}
