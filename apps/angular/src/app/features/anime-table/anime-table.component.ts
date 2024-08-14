import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { Pagination } from '@js-camp/angular/core/models/pagination';
import { TableColumn } from '@js-camp/angular/core/models/table-column';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import {
	BehaviorSubject,
	Observable,
	catchError,
	combineLatest,
	debounceTime,
	map,
	switchMap,
	tap,
	throwError,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AnimeManagementParams } from '@js-camp/angular/core/models/anime-management-params';
import { AnimeType } from '@js-camp/angular/core/models/anime-type';
import { NavigationService } from '@js-camp/angular/core/services/navigation.service';
import { DATE_FORMAT } from '@js-camp/angular/shared/constants/date-format';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimeManagementParamsMapper } from '@js-camp/angular/core/mappers/anime-management-params.mapper';
import { SortParamsMapper } from '@js-camp/angular/core/mappers/sort-params.mapper';
import { SortParams } from '@js-camp/angular/core/models/sort-params';
import { AnimeManagementParamsDto } from '@js-camp/angular/core/dtos/anime-management-params.dto';

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

const DEFAULT_PAGE_NUMBER = 0;

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
export class AnimeTableComponent implements OnInit {
	/** Search value. */
	@Input()
	public set search(value: string) {
		this.search$.next(value);
		this.pageNumber$.next(DEFAULT_PAGE_NUMBER);
	}

	/** Filter value. */
	@Input()
	public set filter(value: readonly AnimeType[]) {
		this.filter$.next(value);
		this.pageNumber$.next(DEFAULT_PAGE_NUMBER);
	}

	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly navigationService = inject(NavigationService);

	private readonly destroyRef = inject(DestroyRef);

	/** Page number. */
	protected readonly pageNumber$ = new BehaviorSubject(DEFAULT_PAGE_NUMBER);

	/** Page size. */
	protected readonly pageSize$ = new BehaviorSubject(INITIAL_PAGE_SIZE);

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
	protected readonly animeList$ = this.createAnimeListStream();

	/** Page size. */
	protected readonly pageSizes = [25, 50, 100];

	/** Total count. */
	protected totalCount = 0;

	/** Date format. */
	protected readonly dateFormat = DATE_FORMAT;

	/** Sortable fields. */
	protected readonly sortableFields = [ColumnKey.TitleEnglish, ColumnKey.AiredStart, ColumnKey.Status];

	private getAnimeList(params: AnimeManagementParams): Observable<Pagination<Anime>> {
		return this.animeService.getPaginatedAnime(params);
	}

	private navigateToRouteWithParams(params: AnimeManagementParams): void {
		this.navigationService.navigate('', AnimeManagementParamsMapper.toQueryParams(params));
	}

	private subscribeToQueryParams(): void {
		this.activatedRoute.queryParams
			.pipe(
				map(params => AnimeManagementParamsMapper.fromQueryParams(params as AnimeManagementParamsDto)),
				tap(params => {
					this.pageSize$.next(params.pageSize ?? INITIAL_PAGE_SIZE);
					this.pageNumber$.next(params.pageNumber ?? DEFAULT_PAGE_NUMBER);
					this.search$.next(params.search ?? '');
					this.ordering$.next(params.ordering ?? null);
					this.filter$.next(params.types);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.subscribeToQueryParams();
	}

	private createAnimeListStream(): Observable<readonly Anime[]> {
		return combineLatest([this.pageNumber$, this.pageSize$, this.ordering$, this.search$, this.filter$]).pipe(
			debounceTime(DEBOUNCE_TIME),
			tap(([, , , search, filter]) => {
				this.searchValueEmitter.emit(search);
				this.filterValueEmitter.emit(filter);
			}),
			map(([pageNumber, pageSize, ordering, search, filter]) => ({
				pageSize,
				pageNumber,
				ordering: ordering ?? undefined,
				search: search.length > 0 ? search : undefined,
				types: filter,
			})),
			tap(params => this.navigateToRouteWithParams(params)),
			switchMap(params => this.getAnimeList(params)),
			tap(value => {
				this.totalCount = value.count;
			}),
			map(value => value.results),
			catchError((error: unknown) => {
				this.hasFetchingError$.next(true);
				return throwError(() => error);
			}),
		);
	}

	/**
	 * Update page number and page size.
	 * @param event Page event.
	 */
	protected updatePagination(event: PageEvent): void {
		this.pageNumber$.next(event.pageIndex);
		this.pageSize$.next(event.pageSize);
	}

	/**
	 * On sort change.
	 * @param event Sort change event.
	 */
	protected onSortChange(event: Sort): void {
		this.ordering$.next(SortParamsMapper.toDto(event.active as SortParams, event.direction));
	}
}
