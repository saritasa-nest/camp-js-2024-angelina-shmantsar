import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AnimeType } from '@js-camp/angular/core/models/anime-type';

/** Filter option. */
type FilterOption = {

	/** Value. */
	value: AnimeType;

	/** Title. */
	title: string;
};

/** Anime type filter component. */
@Component({
	selector: 'camp-anime-type-filter',
	standalone: true,
	imports: [CommonModule, MatSelectModule],
	templateUrl: './anime-type-filter.component.html',
	styleUrl: './anime-type-filter.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTypeFilterComponent implements OnChanges {
	/** Filter values. */
	@Input() public values: AnimeType[] | undefined = undefined;

	/** Filter value emitter. */
	@Output()
	public readonly filter = new EventEmitter<AnimeType[] | undefined>(undefined);

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

	/**
	 * Change filter.
	 * @param value - Selected value.
	 */
	protected changeFilter(value: AnimeType[]): void {
		this.filter.emit(value ?? undefined);
	}

	/** @inheritdoc */
	public ngOnChanges(changes: SimpleChanges): void {
		this.values = changes['values'].currentValue;
	}
}
