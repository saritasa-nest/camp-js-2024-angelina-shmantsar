import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Anime edit page. */
@Component({
	selector: 'camp-anime-edit-page',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './anime-edit-page.component.html',
	styleUrl: './anime-edit-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditPageComponent {}
