import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AnimeType } from '@js-camp/angular/core/models/anime-type';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/** Filter option. */
type FilterOption = {

	/** Value. */
	readonly value: AnimeType;

	/** Title. */
	readonly title: string;
};

/** Anime type filter component. */
@Component({
	selector: 'camp-anime-type-filter',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
	templateUrl: './anime-type-filter.component.html',
	styleUrl: './anime-type-filter.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTypeFilterComponent implements OnInit {
	/** Filter values. */
	@Input() public values: readonly AnimeType[] = [];

	/** Filter values emitter. */
	@Output()
	public readonly filter = new EventEmitter<readonly AnimeType[] | null>();

	private readonly destroyReference = inject(DestroyRef);

	/** Filter control. */
	protected readonly filterControl = new FormControl<readonly AnimeType[]>(this.values);

	/** Filter options. */
	protected readonly filterOptions: readonly FilterOption[] = [
		{ value: AnimeType.Movie, title: 'Movie' },
		{ value: AnimeType.Music, title: 'Music' },
		{ value: AnimeType.Ona, title: 'ONA' },
		{ value: AnimeType.Ova, title: 'OVA' },
		{ value: AnimeType.PromotionalVideos, title: 'Promotional videos' },
		{ value: AnimeType.Special, title: 'Special' },
		{ value: AnimeType.Tv, title: 'TV' },
		{ value: AnimeType.Unknown, title: 'Unknown' },
	];

	/** @inheritdoc */
	public ngOnInit(): void {
		this.filterControl.valueChanges
			.pipe(
				takeUntilDestroyed(this.destroyReference),
			)
			.subscribe(value => this.filter.emit(value));
	}
}
