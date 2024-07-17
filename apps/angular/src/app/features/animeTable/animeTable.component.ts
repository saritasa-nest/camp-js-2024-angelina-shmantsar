import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './animeTable.component.html',
	styleUrl: './animeTable.component.css',
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
			.subscribe(value => (this.anime = value));
	}
}
