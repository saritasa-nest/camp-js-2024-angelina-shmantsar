import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('../shared/components/app-header/app-header.component').then(value => value.AppHeaderComponent),
		children: [
			{
				path: '',
				loadComponent: () =>
					import('./features/anime-table/anime-table.component').then(value => value.AnimeTableComponent),
			},
		],
	},
	{
		path: 'auth',
		loadComponent: () => import('./features/auth/auth.component').then(value => value.AuthComponent),
	},
];
