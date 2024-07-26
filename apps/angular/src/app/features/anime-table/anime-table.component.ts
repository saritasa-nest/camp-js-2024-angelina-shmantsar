import { AsyncPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { Anime } from '@js-camp/angular/core/models/anime';
import { Pagination } from '@js-camp/angular/core/models/pagination';
import { TableColumn } from '@js-camp/angular/core/models/table-column';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { AnimeService, GetPaginatedAnimeData } from '@js-camp/angular/core/services/anime.service';
import { Observable, catchError, map, merge, of, startWith, switchMap } from 'rxjs';

import { SearchFormComponent } from '../search-form/search-form.component';

/** Column key values. */
enum ColumnKey {
	Image = 'image',
	TitleEng = 'titleEng',
	TitleJpn = 'titleJpn',
	AiredStart = 'airedStart',
	Type = 'type',
	Status = 'status',
}

const COLUMN_TO_QUERY_PARAM: Readonly<Record<string, string>> = {
	airedStart: 'aired__startswith',
	titleEng: 'title_eng',
	status: 'status',
};

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	standalone: true,
	imports: [
		MatTableModule,
		MatPaginatorModule,
		AsyncPipe,
		DatePipe,
		EmptyPipe,
		MatSortModule,
		SearchFormComponent,
		MatSelectModule,
	],
})
export class AnimeTableComponent implements AfterViewInit, OnDestroy {
	private readonly animeService = inject(AnimeService);

	private getAllAnime(params: GetPaginatedAnimeData): Observable<Pagination<Anime>> {
		const clearedParams: GetPaginatedAnimeData = JSON.parse(JSON.stringify(params));
		return this.animeService.getPaginatedAnime(clearedParams);
	}

	private anime: readonly Anime[] = [];

	private readonly search = signal<string | undefined>(undefined);

	/** Represents table columns. */
	protected readonly displayedColumns: readonly TableColumn<ColumnKey>[] = [
		{ key: ColumnKey.Image, header: 'Image' },
		{ key: ColumnKey.TitleEng, header: 'English title' },
		{ key: ColumnKey.TitleJpn, header: 'Japanese title' },
		{ key: ColumnKey.AiredStart, header: 'Aired start' },
		{ key: ColumnKey.Type, header: 'Type' },
		{ key: ColumnKey.Status, header: 'Status' },
	];

	/** Header row definition. */
	protected readonly headerRowDefinitions = this.displayedColumns.map(column => column.key);

	/** Column key. */
	protected columnKey = ColumnKey;

	/** Data source. */
	protected dataSource = new MatTableDataSource<Anime>();

	/** Page size. */
	protected readonly pageSize = 25;

	/** Total count. */
	protected totalCount = 0;

	/** Sortable fields. */
	protected sortableFields = [ColumnKey.TitleEng, ColumnKey.AiredStart, ColumnKey.Status];

	@ViewChild(MatPaginator)
	private paginator!: MatPaginator;

	@ViewChild(MatSort)
	private sort!: MatSort;

	@ViewChild(SearchFormComponent)
	private searchForm!: SearchFormComponent;

	/**
	 * Get value from search form.
	 * @param searchValue - Search value.
	 * */
	protected getSearchValue(searchValue?: string | null): void {
		this.search.set(searchValue ?? undefined);
	}

	/** @inheritdoc */
	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		merge(this.searchForm.searchValue, this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => this.getAllAnime({
					limit: String(this.pageSize),
					offset: String(this.paginator.pageSize * this.paginator.pageIndex),
					ordering: this.sort.direction === 'asc' ?
						COLUMN_TO_QUERY_PARAM[this.sort.active] :
						`-${COLUMN_TO_QUERY_PARAM[this.sort.active]}`,
					search: this.search(),
				}).pipe(catchError(() => of(null)))),
				map(value => {
					if (value == null) {
						return [];
					}
					this.totalCount = value.count;
					return value.results;
				}),
			)
			.subscribe(value => {
				this.anime = value;
				this.dataSource = new MatTableDataSource(this.anime as Anime[]);
			});
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.paginator.page.unsubscribe();
	}
}
