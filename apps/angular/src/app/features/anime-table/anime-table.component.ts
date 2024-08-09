import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, inject, signal } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { Pagination } from '@js-camp/angular/core/models/pagination';
import { TableColumn } from '@js-camp/angular/core/models/table-column';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { BehaviorSubject, Observable, catchError, debounceTime, map, merge, of, startWith, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AnimeManagementParams } from '@js-camp/angular/core/models/anime-management-params';
import { AnimeType } from '@js-camp/angular/core/models/anime-type';
import { AnimeTypeMapper } from '@js-camp/angular/core/mappers/anime-type.mapper';
import { AnimeTypeDto } from '@js-camp/angular/core/dtos/backend-enums/anime-type.dto';
import { NavigationService } from '@js-camp/angular/core/services/navigation.service';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants/date-format';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimeManagementParamsMapper } from '@js-camp/angular/core/mappers/anime-management-params.mapper';
import { SortParamsMapper } from '@js-camp/angular/core/mappers/sort-params.mapper';
import { SortParams } from '@js-camp/angular/core/models/sort-params';

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
	],
})
export class AnimeTableComponent implements OnInit, AfterViewInit, OnChanges {
	/** Search value. */
	@Input()
	public search = '';

	/** Filter value. */
	@Input()
	public filter: readonly AnimeType[] = [];

	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly navigationService = inject(NavigationService);

	private readonly destroyReference = inject(DestroyRef);

	private readonly pageNumber = signal(0);

	private readonly pageSize = signal(25);

	private readonly ordering = signal<string | null>(null);

	private readonly search$ = new BehaviorSubject('');

	/** Select filter values. */
	protected readonly filter$ = new BehaviorSubject<AnimeType[]>([]);

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
	protected dataSource = new MatTableDataSource<Anime>();

	/** Page size. */
	protected readonly pageSizes = [25, 50, 100];

	/** Total count. */
	protected totalCount = 0;

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** Sortable fields. */
	protected readonly sortableFields = [ColumnKey.TitleEnglish, ColumnKey.AiredStart, ColumnKey.Status];

	@ViewChild(MatPaginator)
	private readonly paginator!: MatPaginator;

	@ViewChild(MatSort)
	private readonly sort!: MatSort;

	private getAnimeList(params: AnimeManagementParams): Observable<Pagination<Anime>> {
		this.navigationService.navigate('', AnimeManagementParamsMapper.toDto(params));
		return this.animeService.getPaginatedAnime(params);
	}

	private getQueryParams(): void {
		this.activatedRoute.queryParams
			.pipe(
				tap(value => {
					this.pageSize.set(value['limit']);
					this.pageNumber.set(Math.round(value['offset'] / this.pageSize()));
					this.search = value['search'] ?? '';
					this.ordering.set(value['ordering']);
					this.filter$.next(value['type__in']?.split(',').map((type: AnimeTypeDto) => AnimeTypeMapper.fromDto(type)));
				}),
				takeUntilDestroyed(this.destroyReference),
			)
			.subscribe();
	}

	private subscribeToControls(): void {
		this.paginator.page.pipe(takeUntilDestroyed(this.destroyReference)).subscribe(() => {
			this.pageNumber.set(this.paginator.pageIndex);
			this.pageSize.set(this.paginator.pageSize);
		});

		// this.typeFilter.filter.pipe(takeUntilDestroyed(this.destroyReference)).subscribe(value => {
		// 	this.paginator.pageIndex = 0;
		// 	this.pageNumber.set(0);
		// 	this.filter.set(value && value?.length > 0 ? value : []);
		// });

		this.sort.sortChange
			.pipe(takeUntilDestroyed(this.destroyReference))
			.subscribe(() => this.ordering.set(SortParamsMapper.toDto(this.sort.active as SortParams, this.sort.direction)));
	}

	private getSearchValue(): string | null {
		let search: string | null = null;
		this.search$
			.pipe(takeUntilDestroyed(this.destroyReference))
			.subscribe(value => {
				search = value;
			});
		return search;
	}

	private getFilterValue(): readonly AnimeType[] {
		let filter: readonly AnimeType[] = [];
		this.filter$
			.pipe(takeUntilDestroyed(this.destroyReference))
			.subscribe(value => {
				filter = value;
			});
		return filter;
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.getQueryParams();
	}

	/** @inheritdoc */
	public ngOnChanges(changes: SimpleChanges): void {
		if (this.paginator) {
			this.paginator.pageIndex = 0;
			this.pageNumber.set(0);
		}
		const searchValue = changes['search']?.currentValue;
		const filterValue = changes['filter']?.currentValue;
		if (searchValue) {
			this.search$.next(searchValue);
		}
		if (filterValue.length) {
			this.filter$.next(filterValue);
		}
	}

	/** @inheritdoc */
	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.paginator.pageSize = this.pageSize();
		this.paginator.pageIndex = this.pageNumber();

		this.subscribeToControls();

		merge(this.sort.sortChange, this.paginator.page, this.search$)
			.pipe(
				debounceTime(500),
				startWith(null),
				switchMap(() =>
					this.getAnimeList({
						pageSize: this.pageSize(),
						pageNumber: this.pageNumber(),
						ordering: this.ordering() ?? undefined,
						search: this.getSearchValue() ?? undefined,
						types: this.getFilterValue(),
					}).pipe(catchError(() => of(null)))),
				map(value => {
					if (value == null) {
						return [];
					}
					this.totalCount = value.count;
					this.paginator.pageIndex = this.pageNumber();
					return value.results;
				}),
				takeUntilDestroyed(this.destroyReference),
			)
			.subscribe(value => {
				this.dataSource = new MatTableDataSource([...value]);
			});
	}
}
