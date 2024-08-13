import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Anime details card. */
@Component({
	selector: 'camp-anime-details-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './anime-details-card.component.html',
	styleUrl: './anime-details-card.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsCardComponent {}
