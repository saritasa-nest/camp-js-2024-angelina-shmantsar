import { AsyncPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { Pagination } from '@js-camp/angular/core/models/pagination';
import { TableColumn } from '@js-camp/angular/core/models/table-column';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable, catchError, map, merge, of, startWith, switchMap, tap } from 'rxjs';
import { AnimeTypeDto } from '@js-camp/angular/core/dtos/backend-enums/anime-type.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeManagementParams } from '@js-camp/angular/core/models/anime-management-params';

import { SearchFormComponent } from '../search-form/search-form.component';
import { AnimeTypeFilterComponent } from '../anime-type-filter/anime-type-filter.component';

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
		AnimeTypeFilterComponent,
	],
})
export class AnimeTableComponent implements AfterViewInit, OnDestroy {
	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private getAllAnime(params: AnimeManagementParams): Observable<Pagination<Anime>> {
		const clearedParams: AnimeManagementParams = JSON.parse(JSON.stringify(params));
		this.activatedRoute.queryParams.pipe(
			tap(() => this.router.navigate([''], {
				queryParams: clearedParams,
			})),
		).subscribe();
		return this.animeService.getPaginatedAnime(params);
	}

	private anime: readonly Anime[] = [];

	private readonly search = signal<string | undefined>(undefined);

	private readonly ordering = signal<string | undefined>(undefined);

	private readonly filter = signal<AnimeTypeDto[] | undefined>(undefined);

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
	protected readonly columnKey = ColumnKey;

	/** Data source. */
	protected dataSource = new MatTableDataSource<Anime>();

	/** Page size. */
	protected readonly pageSize = 25;

	/** Total count. */
	protected totalCount = 0;

	/** Sortable fields. */
	protected readonly sortableFields = [ColumnKey.TitleEng, ColumnKey.AiredStart, ColumnKey.Status];

	@ViewChild(MatPaginator)
	private readonly paginator!: MatPaginator;

	@ViewChild(MatSort)
	private readonly sort!: MatSort;

	@ViewChild(SearchFormComponent)
	private readonly searchForm!: SearchFormComponent;

	@ViewChild(AnimeTypeFilterComponent)
	private readonly typeFilter!: AnimeTypeFilterComponent;

	private subscribeToControls(): void {
		this.searchForm.searchValue.subscribe(value => {
			this.paginator.pageIndex = 0;
			this.search.set(value ?? undefined);
		});

		this.typeFilter.filter.subscribe(() => (this.paginator.pageIndex = 0));

		this.sort.sortChange.subscribe(() => this.ordering.set(this.sort.direction === 'asc' ?
			COLUMN_TO_QUERY_PARAM[this.sort.active] :
			`-${COLUMN_TO_QUERY_PARAM[this.sort.active]}`));

		this.typeFilter.filter.subscribe(value => this.filter.set(value));
	}

	/** @inheritdoc */
	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		this.subscribeToControls();

		merge(this.typeFilter.filter, this.searchForm.searchValue, this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() =>
					this.getAllAnime({
						limit: String(this.pageSize),
						offset: String(this.paginator.pageSize * this.paginator.pageIndex),
						ordering: this.ordering(),
						search: this.search(),
						type: this.filter()?.join(','),
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
		this.searchForm.searchValue.unsubscribe();
		this.sort.sortChange.unsubscribe();
		this.typeFilter.filter.unsubscribe();
	}
}
