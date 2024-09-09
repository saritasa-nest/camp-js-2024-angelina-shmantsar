import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/** Anime actions popup. */
@Component({
	selector: 'camp-anime-actions-popup',
	standalone: true,
	imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
	templateUrl: './anime-actions-popup.component.html',
	styleUrl: './anime-actions-popup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeActionsPopupComponent {}
