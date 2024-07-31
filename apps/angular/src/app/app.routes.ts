import { Routes } from '@angular/router';

import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';

import { AnimeTableComponent } from './features/anime-table/anime-table.component';
import { AuthComponent } from './features/auth/auth.component';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		component: AppHeaderComponent,
		children: [{ path: '', component: AnimeTableComponent }],
	},
	{
		path: 'auth',
		component: AuthComponent,
	},
];
