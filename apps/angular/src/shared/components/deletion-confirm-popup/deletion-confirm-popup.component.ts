import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/** Anime deletion confirm popup. */
@Component({
	selector: 'camp-deletion-confirm-popup',
	standalone: true,
	imports: [CommonModule, MatDialogModule, MatButtonModule],
	templateUrl: './deletion-confirm-popup.component.html',
	styleUrl: './deletion-confirm-popup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletionConfirmPopupComponent {}
