import { Routes } from '@angular/router';

import { DetailsPageGuard } from '../core/guards/details-page.guard';

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
					import('./pages/main-page.component').then(value => value.MainPageComponent),
			},
			{
				path: 'anime/:id',
				canActivate: [DetailsPageGuard],
				children: [
					{
						path: '',
						loadComponent: () =>
							import('./pages/details-page/details-page.component').then(value => value.DetailsPageComponent),
					},
					{
						path: 'edit',
						loadComponent: () =>
							import('./pages/anime-edit-page/anime-edit-page.component').then(value => value.AnimeEditPageComponent),
					},
				],
			},
		],
	},
	{
		path: 'login',
		loadComponent: () => import('./pages/login-page/login-page.component').then(value => value.LoginPageComponent),
	},
	{
		path: 'register',
		loadComponent: () => import('./pages/registration-page/registration-page.component').then(value => value.RegistrationPageComponent),
	},
];
