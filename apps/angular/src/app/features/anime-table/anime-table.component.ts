import { AsyncPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { Pagination } from '@js-camp/angular/core/models/pagination';
import { TableColumn } from '@js-camp/angular/core/models/table-column';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { BehaviorSubject, Observable, catchError, debounceTime, map, merge, startWith, switchMap, take, tap, throwError } from 'rxjs';
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

const INITIAL_PAGE_SIZE = 25;

const DEBOUNCE_TIME = 500;

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

	private readonly destroyRef = inject(DestroyRef);

	private readonly pageNumber$ = new BehaviorSubject(0);

	private readonly pageSize$ = new BehaviorSubject(INITIAL_PAGE_SIZE);

	private readonly ordering$ = new BehaviorSubject<string | null>(null);

	private readonly search$ = new BehaviorSubject('');

	/** Has fetching error. */
	protected readonly hasFetchingError$ = new BehaviorSubject(false);

	/** Search value emitter. */
	@Output()
	public readonly searchValueEmitter = new EventEmitter<string>();

	/** Filter value emitter. */
	@Output()
	public readonly filterValueEmitter = new EventEmitter<readonly AnimeType[]>();

	private readonly filter$ = new BehaviorSubject<readonly AnimeType[]>([]);

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
	protected animeList$ = new Observable<readonly Anime[]>();

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
					this.pageSize$.next(value['limit'] ?? INITIAL_PAGE_SIZE);
					this.pageNumber$.next(Math.round((value['offset'] ?? 0) / (this.getSubjectValue(this.pageSize$) ?? INITIAL_PAGE_SIZE)));
					this.search = value['search'] ?? '';
					this.ordering$.next(value['ordering']);
					this.filter = value['type__in']?.split(',').map((type: AnimeTypeDto) => AnimeTypeMapper.fromDto(type)) ?? [];
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	private getSubjectValue<T>(subject$: BehaviorSubject<T>): T | null {
		let subjectValue: T | null = null;
		subject$.pipe(take(1)).subscribe(value => {
			subjectValue = value;
		});
		return subjectValue;
	}

	private subscribeToControls(): void {
		this.paginator.page.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.pageNumber$.next(this.paginator.pageIndex);
			this.pageSize$.next(this.paginator.pageSize);
		});

		this.sort.sortChange
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => this.ordering$.next(SortParamsMapper.toDto(this.sort.active as SortParams, this.sort.direction)));
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.getQueryParams();
	}

	/** @inheritdoc */
	public ngOnChanges(changes: SimpleChanges): void {
		const previousSearchValue = changes['search']?.previousValue;
		const currentSearchValue = changes['search']?.currentValue;
		if (previousSearchValue !== currentSearchValue) {
			this.search$.next(currentSearchValue);
			this.pageNumber$.next(0);
		}
		const previousFilterValue = changes['filter']?.previousValue;
		const currentFilterValue = changes['filter']?.currentValue;
		if (this.isFiltersChange(previousFilterValue, currentFilterValue)) {
			this.filter$.next(currentFilterValue);
			this.pageNumber$.next(0);
		}
	}

	private isFiltersChange(previous: string[] | null, current: string[] | null): boolean {
		if (previous == null || current == null || previous.length !== current.length) {
			return true;
		}
		for (let i = 0; i < current.length; i++) {
			if (current[i] !== previous[i]) {
				return true;
			}
		}
		return false;
	}

	/** @inheritdoc */
	public ngAfterViewInit(): void {
		this.paginator.pageSize = this.getSubjectValue(this.pageSize$) ?? INITIAL_PAGE_SIZE;
		this.paginator.pageIndex = this.getSubjectValue(this.pageNumber$) ?? 0;

		this.subscribeToControls();

		this.animeList$ = merge(this.sort.sortChange, this.paginator.page, this.search$, this.filter$)
			.pipe(
				debounceTime(DEBOUNCE_TIME),
				startWith(null),
				tap(() => {
					this.searchValueEmitter.emit(this.search);
					this.filterValueEmitter.emit(this.filter);
				}),
				switchMap(() =>
					this.getAnimeList({
						pageSize: this.getSubjectValue(this.pageSize$) ?? INITIAL_PAGE_SIZE,
						pageNumber: this.getSubjectValue(this.pageNumber$) ?? 0,
						ordering: this.getSubjectValue(this.ordering$) ?? undefined,
						search: this.search.length > 0 ? this.search : undefined,
						types: this.filter,
					}).pipe(catchError((error: unknown) => {
						this.hasFetchingError$.next(true);
						return throwError(error);
					}))),
				tap(value => {
					if (value != null) {
						this.totalCount = value.count;
						this.paginator.pageIndex = this.getSubjectValue(this.pageNumber$) ?? 0;
					}
				}),
				map(value => {
					if (value == null) {
						return [];
					}
					return value.results;
				}),
				takeUntilDestroyed(this.destroyRef),
			);
	}
}
