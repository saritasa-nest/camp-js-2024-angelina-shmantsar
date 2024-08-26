import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { TableColumn } from '@js-camp/angular/core/models/table-column';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { NavigationService } from '@js-camp/angular/core/services/navigation.service';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants/date-format';

/** Column key values. */
enum ColumnKey {
	Image = 'image',
	TitleEnglish = 'titleEnglish',
	TitleJapanese = 'titleJapanese',
	AiredStart = 'airedStart',
	Type = 'type',
	Status = 'status',
	Details = 'details',
}

/** Anime table component. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	standalone: true,
	imports: [
		MatTableModule,
		DatePipe,
		EmptyPipe,
		MatSortModule,
		AsyncPipe,
		MatButtonModule,
		MatIconModule,
	],
})
export class AnimeTableComponent {

	/** Anime list. */
	@Input({ required: true })
	public animeList: readonly Anime[] = [];

	/** Sort value emitter. */
	@Output()
	public readonly sortChange = new EventEmitter<Sort>();

	private readonly navigationService = inject(NavigationService);

	/**
	 * Handle sort change.
	 * @param event Sort change event.
	 */
	protected onSortChange(event: Sort): void {
		this.sortChange.emit(event);
	}

	/** Represents table columns. */
	protected readonly displayedColumns: readonly TableColumn<ColumnKey>[] = [
		{ key: ColumnKey.Image, header: 'Image' },
		{ key: ColumnKey.TitleEnglish, header: 'English title' },
		{ key: ColumnKey.TitleJapanese, header: 'Japanese title' },
		{ key: ColumnKey.AiredStart, header: 'Aired start' },
		{ key: ColumnKey.Type, header: 'Type' },
		{ key: ColumnKey.Status, header: 'Status' },
		{ key: ColumnKey.Details, header: 'Details' },
	];

	/** Header row definition. */
	protected readonly headerRowDefinitions = this.displayedColumns.map(column => column.key);

	/** Column key. */
	protected readonly columnKey = ColumnKey;

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** Sortable fields. */
	protected readonly sortableFields = [ColumnKey.TitleEnglish, ColumnKey.AiredStart, ColumnKey.Status];

	/**
	 *
	 * @param id Anime id.
	 */
	protected navigateToDetailsPage(id: string): void {
		this.navigationService.navigate(`/anime/${id}`);
	}
}
