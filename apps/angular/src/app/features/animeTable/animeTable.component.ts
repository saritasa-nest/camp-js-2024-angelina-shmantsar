
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { convertIsoToLocale } from '@js-camp/angular/core/utils/convertIsoToLocale';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './animeTable.component.html',
	styleUrls: ['./animeTable.component.css'],
	standalone: true,
	imports: [MatTableModule],
})
export class AnimeTableComponent {
	private animeService = inject(AnimeService);

	/** Represents anime list. */
	public anime: Anime[] = [];

	/** Represents table columns. */
	public displayedColumns: string[] = ['image', 'title_eng', 'title_jpn', 'aired_start', 'type', 'status'];

	public constructor() {
		this.animeService.getAllAnime()
			.subscribe(value => {
				this.anime = this.animeService.mapAnimeDto(value.results)
					.map(item => ({
						...item,
						aired: {
							start: convertIsoToLocale(item.aired.start),
							end: item.aired.end,
						},
					}));
			});
	}
}
