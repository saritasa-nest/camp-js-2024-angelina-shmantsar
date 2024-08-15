import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable } from 'rxjs';
import { AnimeDetails } from '@js-camp/angular/core/models/anime-details';
import { AnimePlayerComponent } from '@js-camp/angular/shared/components/anime-player/anime-player.component';
import { MatDividerModule } from '@angular/material/divider';

import { AnimeDetailsCardComponent } from '../../features/anime-details-card/anime-details-card.component';

/** Details page. */
@Component({
	selector: 'camp-details-page',
	standalone: true,
	imports: [CommonModule, AnimeDetailsCardComponent, AsyncPipe, AnimePlayerComponent, MatDividerModule],
	templateUrl: './details-page.component.html',
	styleUrl: './details-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
	private readonly animeService = inject(AnimeService);

	/** Anime details. */
	protected readonly animeDetails$ = this.getAnimeById(23848);

	private getAnimeById(id: number): Observable<AnimeDetails> {
		return this.animeService.getAnimeById(id);
	}
}
