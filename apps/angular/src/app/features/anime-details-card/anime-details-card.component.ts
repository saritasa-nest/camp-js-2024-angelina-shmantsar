import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { AnimeDetails } from '@js-camp/angular/core/models/anime-details';
import { BehaviorSubject } from 'rxjs';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants/date-format';
import { StudioCardComponent } from '@js-camp/angular/shared/components/studio-card/studio-card.component';

/** Anime details card. */
@Component({
	selector: 'camp-anime-details-card',
	standalone: true,
	imports: [CommonModule, AsyncPipe, DatePipe, StudioCardComponent],
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
}
