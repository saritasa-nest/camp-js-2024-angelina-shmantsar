import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Column } from '@js-camp/angular/core/models/table-column';
import { ColumnKey } from '@js-camp/angular/core/models/table-column-key';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	standalone: true,
	imports: [
		MatTableModule,
		AsyncPipe,
		DatePipe,
		EmptyPipe,
	],
})
export class AnimeTableComponent {
	private readonly animeService = inject(AnimeService);

	/** Represents anime list. */
	protected readonly anime$ = this.animeService.getAll();

	/** Represents table columns. */
	protected readonly displayedColumns: readonly Column[] = [
		{ key: ColumnKey.Image, header: 'Image' },
		{ key: ColumnKey.TitleEng, header: 'English title' },
		{ key: ColumnKey.TitleJpn, header: 'Japanese title' },
		{ key: ColumnKey.AiredStart, header: 'Aired start' },
		{ key: ColumnKey.Type, header: 'Type' },
		{ key: ColumnKey.Status, header: 'Status' },
	];

	/** Header row definition. */
	protected readonly headerRowDef = this.displayedColumns.map(column => column.key);
}
