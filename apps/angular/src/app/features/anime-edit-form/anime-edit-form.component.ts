import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { ANIME_RATING_OPTIONS, ANIME_SEASON_OPTIONS, ANIME_SOURCE_OPTIONS, ANIME_STATUS_OPTIONS, ANIME_TYPE_OPTIONS } from './form-select-options';

type EditForm = {

	/** Anime title in Japanese. */
	readonly titleJapanese: FormControl<string>;

	/** Anime title in English. */
	readonly titleEnglish: FormControl<string>;

	/** Type. */
	readonly type: FormControl<string>;

	/** Status. */
	readonly status: FormControl<string>;

	/** Is anime airing. */
	readonly airing: FormControl<string>;

	/** Aired start. */
	readonly airedStart: FormControl<string>;

	/** Aired end. */
	readonly airedEnd: FormControl<string>;

	/** Rating. */
	readonly rating: FormControl<string>;

	/** Season. */
	readonly season: FormControl<string>;

	/** Source. */
	readonly source: FormControl<string>;

	/** Synopsis. */
	readonly synopsis: FormControl<string>;
};

/** Anime edit form. */
@Component({
	selector: 'camp-anime-edit-form',
	standalone: true,
	providers: [provideNativeDateAdapter()],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		MatDatepickerModule,
	],
	templateUrl: './anime-edit-form.component.html',
	styleUrl: './anime-edit-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditFormComponent {
	private readonly formBuilder = inject(FormBuilder);

	/** Anime type options. */
	protected readonly animeTypeOptions = ANIME_TYPE_OPTIONS;

	/** Anime status options. */
	protected readonly animeStatusOptions = ANIME_STATUS_OPTIONS;

	/** Anime rating options. */
	protected readonly animeRatingOptions = ANIME_RATING_OPTIONS;

	/** Anime season options. */
	protected readonly animeSeasonOptions = ANIME_SEASON_OPTIONS;

	/** Anime source options. */
	protected readonly animeSourceOptions = ANIME_SOURCE_OPTIONS;

	/** Edit form. */
	protected readonly editForm: FormGroup<EditForm> = this.formBuilder.nonNullable.group({
		titleJapanese: this.formBuilder.nonNullable.control(''),
		titleEnglish: this.formBuilder.nonNullable.control(''),
		type: this.formBuilder.nonNullable.control(''),
		status: this.formBuilder.nonNullable.control(''),
		airing: this.formBuilder.nonNullable.control(''),
		airedStart: this.formBuilder.nonNullable.control(''),
		airedEnd: this.formBuilder.nonNullable.control(''),
		rating: this.formBuilder.nonNullable.control(''),
		season: this.formBuilder.nonNullable.control(''),
		source: this.formBuilder.nonNullable.control(''),
		synopsis: this.formBuilder.nonNullable.control(''),
	});
}
