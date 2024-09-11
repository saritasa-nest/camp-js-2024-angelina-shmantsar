import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackToMainPageButtonComponent } from '@js-camp/angular/shared/components/back-to-main-page-button/back-to-main-page-button.component';

import { AnimeEditFormComponent } from '../../features/anime-edit-form/anime-edit-form.component';

/** Anime edit page. */
@Component({
	selector: 'camp-anime-edit-page',
	standalone: true,
	imports: [CommonModule, BackToMainPageButtonComponent, AnimeEditFormComponent],
	templateUrl: './anime-edit-page.component.html',
	styleUrl: './anime-edit-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditPageComponent {}
