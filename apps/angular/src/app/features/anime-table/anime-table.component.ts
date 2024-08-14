import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { TableColumn } from '@js-camp/angular/core/models/table-column';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import {
	BehaviorSubject,
} from 'rxjs';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants/date-format';

import { SearchFormComponent } from '../search-form/search-form.component';
import { AnimeTypeFilterComponent } from '../anime-type-filter/anime-type-filter.component';

/** Column key values. */
enum ColumnKey {
	Image = 'image',
	TitleEnglish = 'titleEnglish',
	TitleJapanese = 'titleJapanese',
	AiredStart = 'airedStart',
	Type = 'type',
	Status = 'status',
}

/** Anime table component. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	standalone: true,
	imports: [
		MatTableModule,
		MatPaginatorModule,
		DatePipe,
		EmptyPipe,
		MatSortModule,
		SearchFormComponent,
		AnimeTypeFilterComponent,
		AsyncPipe,
	],
})
export class AnimeTableComponent {
	/** Anime list. */
	@Input()
	public set animeList(value: readonly Anime[]) {
		this.animeList$.next(value);
	}

	/** Has fetching error. */
	protected readonly hasFetchingError$ = new BehaviorSubject(false);

	/** Sort value emitter. */
	@Output()
	public readonly sortValueEmitter = new EventEmitter<Sort>();

	/** Represents table columns. */
	protected readonly displayedColumns: readonly TableColumn<ColumnKey>[] = [
		{ key: ColumnKey.Image, header: 'Image' },
		{ key: ColumnKey.TitleEnglish, header: 'English title' },
		{ key: ColumnKey.TitleJapanese, header: 'Japanese title' },
		{ key: ColumnKey.AiredStart, header: 'Aired start' },
		{ key: ColumnKey.Type, header: 'Type' },
		{ key: ColumnKey.Status, header: 'Status' },
	];

	/** Header row definition. */
	protected readonly headerRowDefinitions = this.displayedColumns.map(column => column.key);

	/** Column key. */
	protected readonly columnKey = ColumnKey;

	/** Data source. */
	protected readonly animeList$ = new BehaviorSubject<readonly Anime[]>([]);

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** Sortable fields. */
	protected readonly sortableFields = [ColumnKey.TitleEnglish, ColumnKey.AiredStart, ColumnKey.Status];

	/**
	 * On sort change.
	 * @param event Sort change event.
	 */
	protected onSortChange(event: Sort): void {
		this.sortValueEmitter.emit(event);
	}
}
