import { Routes } from '@angular/router';

import { AnimeTableComponent } from './features/animeTable/anime-table.component';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		component: AnimeTableComponent,
	},
];
