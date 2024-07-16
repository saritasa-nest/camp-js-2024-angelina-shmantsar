import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnimeService } from '../core/services/anime.service';
import { Anime } from '../core/interfaces/anime';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [RouterModule],
})
export class AppComponent {
	private animeService = inject(AnimeService);

	/** Hi. */
	public anime: Anime[] = [];

	public constructor() {
		this.animeService.getAllAnime()
			.subscribe(value => {
				this.anime = value.results;
			});
	}
}
