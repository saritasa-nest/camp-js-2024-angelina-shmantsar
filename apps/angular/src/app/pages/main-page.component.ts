import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, catchError, combineLatest, debounceTime, map, switchMap, tap, throwError } from 'rxjs';
import { AnimeType } from '@js-camp/angular/core/models/anime-type';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { AnimeManagementParamsDto } from '@js-camp/angular/core/dtos/anime-management-params.dto';
import { AnimeManagementParamsMapper } from '@js-camp/angular/core/mappers/anime-management-params.mapper';
import { SortParamsMapper } from '@js-camp/angular/core/mappers/sort-params.mapper';
import { Anime } from '@js-camp/angular/core/models/anime';
import { AnimeManagementParams } from '@js-camp/angular/core/models/anime-management-params';
import { Pagination } from '@js-camp/angular/core/models/pagination';
import { SortParams } from '@js-camp/angular/core/models/sort-params';
import { NavigationService } from '@js-camp/angular/core/services/navigation.service';
import { DEFAULT_PAGE_NUMBER, INITIAL_PAGE_SIZE } from '@js-camp/angular/shared/constants/default-paginator-values';

import { AnimeTypeFilterComponent } from '../features/anime-type-filter/anime-type-filter.component';
import { SearchFormComponent } from '../features/search-form/search-form.component';
import { AnimeTableComponent } from '../features/anime-table/anime-table.component';
import { PaginatorComponent } from '../features/paginator/paginator.component';

const DEBOUNCE_TIME = 500;

/** Main page. */
@Component({
	selector: 'camp-main-page',
	standalone: true,
	imports: [CommonModule, AnimeTypeFilterComponent, SearchFormComponent, AnimeTableComponent, AsyncPipe, PaginatorComponent],
	templateUrl: './main-page.component.html',
	styleUrl: './main-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly navigationService = inject(NavigationService);

	private readonly destroyRef = inject(DestroyRef);

	/** Page number. */
	protected readonly pageNumber$ = new BehaviorSubject(DEFAULT_PAGE_NUMBER);

	/** Page size. */
	protected readonly pageSize$ = new BehaviorSubject(INITIAL_PAGE_SIZE);

	private readonly ordering$ = new BehaviorSubject<string | null>(null);

	/** Search. */
	protected readonly search$ = new BehaviorSubject('');

	/** Has fetching error. */
	protected readonly hasFetchingError$ = new BehaviorSubject(false);

	/** Filter. */
	protected readonly animeTypeFilter$ = new BehaviorSubject<readonly AnimeType[]>([]);

	/** Data source. */
	protected readonly animeList$ = this.createAnimeListStream();

	/** Page size. */
	protected readonly pageSizes = [25, 50, 100];

	/** Total count. */
	protected totalCount = 0;

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
					this.pageSize$.next(params.pageSize);
					this.pageNumber$.next(params.pageNumber);
					this.search$.next(params.search ?? '');
					this.ordering$.next(params.ordering ?? null);
					this.animeTypeFilter$.next(params.types);
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
		return combineLatest([this.pageNumber$, this.pageSize$, this.ordering$, this.search$, this.animeTypeFilter$]).pipe(
			debounceTime(DEBOUNCE_TIME),
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
	protected onPageEvent(event: PageEvent): void {
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

	/** On search value change.
	 * @param event Search value.
	 */
	protected onSearchValueChange(event: string): void {
		this.search$.next(event);
		this.pageNumber$.next(DEFAULT_PAGE_NUMBER);
	}

	/**
	 * On filter value change.
	 * @param event Type filter change event.
	 */
	protected onFilterValueChange(event: readonly AnimeType[]): void {
		this.animeTypeFilter$.next(event);
		this.pageNumber$.next(DEFAULT_PAGE_NUMBER);
	}
}
