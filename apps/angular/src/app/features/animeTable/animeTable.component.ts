import { AsyncPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { RemoveUnderscorePipe } from '@js-camp/angular/core/pipes/removeUnderscore.pipe';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './animeTable.component.html',
	styleUrl: './animeTable.component.css',
	standalone: true,
	imports: [
		MatTableModule,
		AsyncPipe,
		DatePipe,
		LowerCasePipe,
		RemoveUnderscorePipe,
		EmptyPipe,
	],
})
export class AnimeTableComponent {
	private readonly animeService = inject(AnimeService);

	/** Represents anime list. */
	protected readonly anime$ = this.animeService.getAll();

	/** Represents table columns. */
	protected readonly displayedColumns: readonly string[] = ['image', 'title_eng', 'title_jpn', 'aired_start', 'type', 'status'];
}
