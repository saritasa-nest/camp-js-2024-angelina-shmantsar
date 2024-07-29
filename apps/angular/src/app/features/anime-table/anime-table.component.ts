import { AsyncPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { Anime } from '@js-camp/angular/core/models/anime';
import { Pagination } from '@js-camp/angular/core/models/pagination';
import { TableColumn } from '@js-camp/angular/core/models/table-column';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { AnimeService, GetPaginatedAnimeData } from '@js-camp/angular/core/services/anime.service';
import { Observable, catchError, map, merge, of, startWith, switchMap, tap } from 'rxjs';
import { AnimeTypeDto } from '@js-camp/angular/core/dtos/backend-enums/anime-type.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlService } from '@js-camp/angular/core/services/api-url.service';

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

/** Filter option. */
type FilterOption = {

	/** Value. */
	value: AnimeTypeDto;

	/** Title. */
	title: string;
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

	private readonly apiUrlService = inject(ApiUrlService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private getAllAnime(params: GetPaginatedAnimeData): Observable<Pagination<Anime>> {
		const clearedParams: GetPaginatedAnimeData = JSON.parse(JSON.stringify(params));
		this.activatedRoute.queryParams.pipe(
			tap(() => this.router.navigate([''], {
				queryParams: clearedParams,
			})),
		).subscribe();
		return this.animeService.getPaginatedAnime(clearedParams);
	}

	private anime: readonly Anime[] = [];

	private readonly search = signal<string | undefined>(undefined);

	private readonly filter = signal<AnimeTypeDto[] | undefined>(undefined);

	private readonly ordering = signal<string | undefined>(undefined);

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

	@ViewChild(MatPaginator)
	private paginator!: MatPaginator;

	@ViewChild(MatSort)
	private sort!: MatSort;

	@ViewChild(SearchFormComponent)
	private searchForm!: SearchFormComponent;

	@ViewChild(MatSelect)
	private typeFilter!: MatSelect;

	/**
	 * Get value from search form.
	 * @param searchValue - Search value.
	 * */
	protected getSearchValue(searchValue?: string | null): void {
		this.search.set(searchValue ?? undefined);
	}

	/**
	 * Change filter.
	 * @param value - Selected value.
	 */
	protected changeFilter(value: AnimeTypeDto[]): void {
		this.filter.set(value ?? undefined);
	}

	/** @inheritdoc */
	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		this.searchForm.searchValue.subscribe(() => (this.paginator.pageIndex = 0));
		this.typeFilter.selectionChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.sort.sortChange.subscribe(() => this.ordering.set(this.sort.direction === 'asc' ?
			COLUMN_TO_QUERY_PARAM[this.sort.active] :
			`-${COLUMN_TO_QUERY_PARAM[this.sort.active]}`));

		merge(this.typeFilter.selectionChange, this.searchForm.searchValue, this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() =>
					this.getAllAnime({
						limit: String(this.pageSize),
						offset: String(this.paginator.pageSize * this.paginator.pageIndex),
						ordering: this.ordering(),
						search: this.search(),
						// eslint-disable-next-line @typescript-eslint/naming-convention
						type__in: this.filter()?.join(','),
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
		this.typeFilter.selectionChange.unsubscribe();
		this.sort.sortChange.unsubscribe();
	}
}
