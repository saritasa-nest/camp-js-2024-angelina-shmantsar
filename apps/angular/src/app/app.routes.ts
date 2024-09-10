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
				path: 'anime',
				canActivate: [DetailsPageGuard],
				children: [
					{
						path: 'create',
						loadComponent: () =>
							import('./pages/anime-create-page/anime-create-page.component').then(value => value.AnimeCreatePageComponent),
					},
					{
						path: ':id',
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
