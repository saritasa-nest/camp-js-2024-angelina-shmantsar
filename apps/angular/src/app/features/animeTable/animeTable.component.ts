
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/interfaces/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

/** Example component. */
@Component({
	selector: 'camp-example',
	templateUrl: './animeTable.component.html',
	styleUrls: ['./animeTable.component.css'],
	standalone: true,
	imports: [MatTableModule],
})
export class AnimeTableComponent {
	private animeService = inject(AnimeService);

	/** Hi. */
	public anime: Anime[] = [];

	/** Hi. */
	public displayedColumns: string[] = ['image', 'title_eng', 'title_jpn', 'aired_start', 'type', 'status'];

	public constructor() {
		this.animeService.getAllAnime()
			.subscribe(value => {
				this.anime = value.results.slice(0, 10);
			});
	}
}
