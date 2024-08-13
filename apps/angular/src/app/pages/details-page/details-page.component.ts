import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeDetailsCardComponent } from '../../features/anime-details-card/anime-details-card.component';

/** Details page. */
@Component({
	selector: 'camp-details-page',
	standalone: true,
	imports: [CommonModule, AnimeDetailsCardComponent],
	templateUrl: './details-page.component.html',
	styleUrl: './details-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {}
