import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
	MAT_DIALOG_DATA,
	MatDialogContent,
	MatDialogTitle,
} from '@angular/material/dialog';

/** Anime poster popup. */
@Component({
	selector: 'camp-anime-poster-popup',
	standalone: true,
	imports: [CommonModule, MatDialogTitle, MatDialogContent, AsyncPipe],
	templateUrl: './anime-poster-popup.component.html',
	styleUrl: './anime-poster-popup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePosterPopupComponent {
	/** Anime poster url data. */
	protected readonly data = inject(MAT_DIALOG_DATA);
}
