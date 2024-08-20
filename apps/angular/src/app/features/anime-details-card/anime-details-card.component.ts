import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { AnimeDetails } from '@js-camp/angular/core/models/anime-details';
import { BehaviorSubject } from 'rxjs';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants/date-format';
import { StudioCardComponent } from '@js-camp/angular/shared/components/studio-card/studio-card.component';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnimePosterPopupComponent } from '@js-camp/angular/shared/components/anime-poster-popup/anime-poster-popup.component';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';

/** Anime details card. */
@Component({
	selector: 'camp-anime-details-card',
	standalone: true,
	imports: [CommonModule, AsyncPipe, DatePipe, StudioCardComponent, MatListModule, MatTooltipModule, EmptyPipe],
	templateUrl: './anime-details-card.component.html',
	styleUrl: './anime-details-card.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsCardComponent {
	/** Anime details. */
	@Input()
	public set animeDetails(value: AnimeDetails | null) {
		this.animeDetails$.next(value);
	}

	/** Anime details. */
	protected readonly animeDetails$ = new BehaviorSubject<AnimeDetails | null>(null);

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** Details. */
	protected readonly details = [];

	private readonly posterPopup = inject(MatDialog);

	private readonly posterPopupConfig = new MatDialogConfig();

	/**
	 * Handle click on popup open button.
	 * @param url Anime poster url.
	 */
	protected onPopupButtonClick(url: string): void {
		this.posterPopup.open(AnimePosterPopupComponent, {
			data: { url },
		});
	}
}
