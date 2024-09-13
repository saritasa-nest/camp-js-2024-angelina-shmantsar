import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { BackToMainPageButtonComponent } from '@js-camp/angular/shared/components/back-to-main-page-button/back-to-main-page-button.component';

import { AnimeEditFormComponent } from '../../features/anime-edit-form/anime-edit-form.component';

/** Anime create page. */
@Component({
	selector: 'camp-anime-create-page',
	standalone: true,
	imports: [
		CommonModule,
		BackToMainPageButtonComponent,
		AnimeEditFormComponent,
		MatDividerModule,
	],
	templateUrl: './anime-create-page.component.html',
	styleUrl: './anime-create-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCreatePageComponent {}
