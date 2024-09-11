import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/** Anime edit form. */
@Component({
	selector: 'camp-anime-edit-form',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './anime-edit-form.component.html',
	styleUrl: './anime-edit-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditFormComponent {}
