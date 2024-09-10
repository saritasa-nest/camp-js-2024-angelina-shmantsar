import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Anime create page. */
@Component({
	selector: 'camp-anime-create-page',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './anime-create-page.component.html',
	styleUrl: './anime-create-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCreatePageComponent {}
