import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AnimeDetails } from '@js-camp/angular/core/models/anime-details';

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
	readonly airing: FormControl<boolean>;

	/** Aired start. */
	readonly airedStart: FormControl<Date | string>;

	/** Aired end. */
	readonly airedEnd: FormControl<Date | string>;

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
		MatButtonModule,
	],
	templateUrl: './anime-edit-form.component.html',
	styleUrl: './anime-edit-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditFormComponent {
	/** Anime to edit. */
	@Input()
	public set anime(value: AnimeDetails | null) {
		this.animeDetails = value;
		this.editForm.patchValue({
			titleJapanese: value?.titleJapanese,
			titleEnglish: value?.titleEnglish,
			type: value?.type,
			status: value?.status,
			airing: value?.airing === 'Yes',
			airedStart: value?.aired.start ?? '',
			airedEnd: value?.aired.end ?? '',
			rating: value?.rating,
			season: value?.season,
			source: value?.source,
			synopsis: value?.synopsis,
		});
	}

	private animeDetails: AnimeDetails | null = null;

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
		airing: this.formBuilder.nonNullable.control(false),
		airedStart: this.formBuilder.nonNullable.control(this.animeDetails?.aired.start ?? ''),
		airedEnd: this.formBuilder.nonNullable.control(this.animeDetails?.aired.end ?? ''),
		rating: this.formBuilder.nonNullable.control(''),
		season: this.formBuilder.nonNullable.control(''),
		source: this.formBuilder.nonNullable.control(''),
		synopsis: this.formBuilder.nonNullable.control(''),
	});
}
