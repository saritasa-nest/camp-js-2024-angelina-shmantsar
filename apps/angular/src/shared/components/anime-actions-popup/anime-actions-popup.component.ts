import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

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
	private readonly dialog = inject(MatDialog);

	/** Open anime deletion dialog. */
	protected openDeletionDialog(): void {
		this.dialog.open(DeletionConfirmPopupComponent);
	}
}
