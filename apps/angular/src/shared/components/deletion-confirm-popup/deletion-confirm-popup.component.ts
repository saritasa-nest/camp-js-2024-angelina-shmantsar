import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { take, tap } from 'rxjs';

/** Anime deletion confirm popup. */
@Component({
	selector: 'camp-deletion-confirm-popup',
	standalone: true,
	imports: [CommonModule, MatDialogModule, MatButtonModule],
	templateUrl: './deletion-confirm-popup.component.html',
	styleUrl: './deletion-confirm-popup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletionConfirmPopupComponent {
	/** Anime data. */
	protected readonly data = inject(MAT_DIALOG_DATA);

	private readonly animeService = inject(AnimeService);

	/** Delete anime. */
	protected deleteAnime(): void {
		this.animeService
			.deleteAnime(this.data.anime.id)
			.pipe(
				take(1),
				tap(_ => window.location.reload()),
			)
			.subscribe();
	}
}
