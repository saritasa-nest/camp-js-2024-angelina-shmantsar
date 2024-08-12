import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
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
export class AnimeTypeFilterComponent implements OnInit, OnChanges {
	/** Filter values. */
	@Input()
	public types: readonly AnimeType[] = [];

	/** Filter values emitter. */
	@Output()
	public readonly filterValueEmitter = new EventEmitter<readonly AnimeType[]>();

	private readonly destroyRef = inject(DestroyRef);

	/** Filter control. */
	protected readonly filterControl = new FormControl<readonly AnimeType[]>(this.types);

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
		this.filterControl.patchValue(this.types);
		this.filterControl.valueChanges
			.pipe(
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(value => this.filterValueEmitter.emit(value ?? []));
	}

	/** @inheritdoc */
	public ngOnChanges(changes: SimpleChanges): void {
		this.filterControl.patchValue(changes['types'].currentValue);
	}
}
