import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable, switchMap } from 'rxjs';
import { AnimeDetails } from '@js-camp/angular/core/models/anime-details';
import { AnimePlayerComponent } from '@js-camp/angular/shared/components/anime-player/anime-player.component';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, ParamMap } from '@angular/router';

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

	private readonly activatedRoute = inject(ActivatedRoute);

	private getAnimeById(id: number): Observable<AnimeDetails> {
		return this.animeService.getAnimeById(id);
	}

	private createAnimeDetailsStream(): Observable<AnimeDetails> {
		return this.activatedRoute.paramMap.pipe(
			switchMap((params: ParamMap) => this.getAnimeById(Number(params.get('id')))),
		);
	}

	/** Anime details. */
	protected readonly animeDetails$ = this.createAnimeDetailsStream();
}
