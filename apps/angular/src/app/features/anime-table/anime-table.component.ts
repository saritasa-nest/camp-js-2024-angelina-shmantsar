import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

/** Defines column. */
type Column = {

	/** Key. */
	key: string;

	/** Header. */
	header: string;
};

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
		{ key: 'image', header: 'Image' },
		{ key: 'titleEng', header: 'English title' },
		{ key: 'titleJpn', header: 'Japanese title' },
		{ key: 'airedStart', header: 'Aired start' },
		{ key: 'type', header: 'Type' },
		{ key: 'status', header: 'Status' },
	];

	/** Header row definition. */
	protected readonly headerRowDef = this.displayedColumns.map(column => column.key);
}
