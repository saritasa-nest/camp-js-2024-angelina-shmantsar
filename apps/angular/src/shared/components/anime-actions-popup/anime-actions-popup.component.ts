import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Anime } from '@js-camp/angular/core/models/anime';
import { NavigationService } from '@js-camp/angular/core/services/navigation.service';
import { Router } from '@angular/router';

import { DeletionConfirmPopupComponent } from '../deletion-confirm-popup/deletion-confirm-popup.component';

/** Anime actions popup. */
@Component({
	selector: 'camp-anime-actions-popup',
	standalone: true,
	imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
	templateUrl: './anime-actions-popup.component.html',
	styleUrl: './anime-actions-popup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeActionsPopupComponent {
	/** Anime. */
	@Input({ required: true })
	public anime: Anime | null = null;

	private readonly dialog = inject(MatDialog);

	private readonly navigationService = inject(NavigationService);

	private readonly router = inject(Router);

	/** Open anime deletion dialog. */
	protected openDeletionDialog(): void {
		this.dialog.open(DeletionConfirmPopupComponent, {
			data: {
				anime: this.anime,
			},
		});
	}

	/** Navigate to anime edit page. */
	protected navigateToEditPage(): void {
		this.router.navigateByUrl(`/anime/${this.anime?.id}/edit`);
	}
}
