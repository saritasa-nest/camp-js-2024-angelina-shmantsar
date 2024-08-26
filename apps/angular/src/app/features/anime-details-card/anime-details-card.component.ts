import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { AnimeDetails } from '@js-camp/angular/core/models/anime-details';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants/date-format';
import { StudioCardComponent } from '@js-camp/angular/shared/components/studio-card/studio-card.component';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AnimePosterPopupComponent } from '@js-camp/angular/shared/components/anime-poster-popup/anime-poster-popup.component';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';

type Detail = {

	/** Title. */
	readonly title: string;

	/** Get content. */
	readonly getContent: (source: AnimeDetails | null) => string | number | undefined;
};

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
	public animeDetails: AnimeDetails | null = null;

	private readonly posterPopup = inject(MatDialog);

	/**
	 * Handle click on popup open button.
	 * @param url Anime poster url.
	 */
	protected onPopupButtonClick(url: string): void {
		this.posterPopup.open(AnimePosterPopupComponent, {
			data: { url },
		});
	}

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** Details list. */
	protected readonly details: readonly Detail[] = [
		{ title: 'User score:', getContent: (source: AnimeDetails | null) => source?.userScore },
		{ title: 'Critic score:', getContent: (source: AnimeDetails | null) => source?.criticScore },
		{ title: 'Rating:', getContent: (source: AnimeDetails | null) => source?.rating },
		{ title: 'Source:', getContent: (source: AnimeDetails | null) => source?.source },
		{ title: 'Season:', getContent: (source: AnimeDetails | null) => source?.season },
		{ title: 'Synopsis:', getContent: (source: AnimeDetails | null) => source?.synopsis },
		{ title: 'Type:', getContent: (source: AnimeDetails | null) => source?.type },
		{ title: 'Status:', getContent: (source: AnimeDetails | null) => source?.status },
		{ title: 'Airing:', getContent: (source: AnimeDetails | null) => source?.airing },
	];
}
