import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

/** Studio card. */
@Component({
	selector: 'camp-studio-card',
	standalone: true,
	imports: [CommonModule, MatCardModule],
	templateUrl: './studio-card.component.html',
	styleUrl: './studio-card.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudioCardComponent {
	/** Studio image source. */
	@Input()
	public studioImageSource = '';

	/** Studio name. */
	@Input()
	public studioName = '';
}
