
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AnimeDto } from '@js-camp/angular/core/dtos/anime.dto';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { convertIsoToLocale } from '@js-camp/angular/core/utils/convertIsoToLocale';

/** Example component. */
@Component({
	selector: 'anime-table',
	templateUrl: './animeTable.component.html',
	styleUrls: ['./animeTable.component.css'],
	standalone: true,
	imports: [MatTableModule],
})
export class AnimeTableComponent {
	private animeService = inject(AnimeService);

	/** Hi. */
	public anime: AnimeDto[] = [];

	/** Hi. */
	public displayedColumns: string[] = ['image', 'title_eng', 'title_jpn', 'aired_start', 'type', 'status'];

	public constructor() {
		this.animeService.getAllAnime()
			.subscribe(value => {
				this.anime = value.results.map(item => ({
					...item,
					aired: {
						start: convertIsoToLocale(item.aired.start),
						end: item.aired.end,
					},
				}));
			});
	}
}
