import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AnimeTypeDto } from '@js-camp/angular/core/dtos/backend-enums/anime-type.dto';

/** Filter option. */
type FilterOption = {

	/** Value. */
	value: AnimeTypeDto;

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
	@Input() public values: AnimeTypeDto[] | undefined = undefined;

	/** Filter value emitter. */
	@Output()
	public readonly filter = new EventEmitter<AnimeTypeDto[] | undefined>(undefined);

	/** Filter options. */
	protected readonly filterOptions: readonly FilterOption[] = [
		{ value: AnimeTypeDto.Movie, title: 'Movie' },
		{ value: AnimeTypeDto.Music, title: 'Music' },
		{ value: AnimeTypeDto.Ona, title: 'ONA' },
		{ value: AnimeTypeDto.Ova, title: 'OVA' },
		{ value: AnimeTypeDto.PromotionalVideos, title: 'Promotional videos' },
		{ value: AnimeTypeDto.Special, title: 'Special' },
		{ value: AnimeTypeDto.Tv, title: 'TV' },
		{ value: AnimeTypeDto.Unknown, title: 'Unknown' },
	];

	/**
	 * Change filter.
	 * @param value - Selected value.
	 */
	protected changeFilter(value: AnimeTypeDto[]): void {
		this.filter.emit(value ?? undefined);
	}

	/** @inheritdoc */
	public ngOnChanges(changes: SimpleChanges): void {
		this.values = changes['values'].currentValue;
	}
}
