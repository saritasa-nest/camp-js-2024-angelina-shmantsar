import { AsyncPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { TableColumn } from '@js-camp/angular/core/models/table-column';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

/** Column key values. */
enum ColumnKey {
	Image = 'image',
	TitleEng = 'titleEng',
	TitleJpn = 'titleJpn',
	AiredStart = 'airedStart',
	Type = 'type',
	Status = 'status',
}

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	standalone: true,
	imports: [MatTableModule, MatPaginatorModule, AsyncPipe, DatePipe, EmptyPipe],
})
export class AnimeTableComponent implements AfterViewInit {
	private readonly animeService = inject(AnimeService);

	/** Represents anime list. */
	protected readonly anime$ = this.animeService.getAll();

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

	/** Paginator. */
	@ViewChild(MatPaginator)
	private paginator!: MatPaginator;

	/** @inheritdoc */
	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}
}
