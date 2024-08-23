import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AnimeType } from '@js-camp/angular/core/models/anime-type';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

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
export class AnimeTypeFilterComponent {

	/** Filter values. */
	@Input()
	public set types(value: readonly AnimeType[]) {
		this.filterControl.patchValue(value);
	}

	/** Filter values emitter. */
	@Output()
	public readonly typeFilterChange = new EventEmitter<readonly AnimeType[]>();

	/**
	 * Handle filter value change.
	 * @param event Filter change event.
	 */
	protected onFilterValueChange(event: readonly AnimeType[]): void {
		this.typeFilterChange.emit(event);
	}

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
}
