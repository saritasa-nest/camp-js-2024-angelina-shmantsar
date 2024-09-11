import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackToMainPageButtonComponent } from '@js-camp/angular/shared/components/back-to-main-page-button/back-to-main-page-button.component';

/** Anime edit page. */
@Component({
	selector: 'camp-anime-edit-page',
	standalone: true,
	imports: [CommonModule, BackToMainPageButtonComponent],
	templateUrl: './anime-edit-page.component.html',
	styleUrl: './anime-edit-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditPageComponent {}
