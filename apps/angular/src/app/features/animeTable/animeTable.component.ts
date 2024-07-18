import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/angular/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable } from 'rxjs';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './animeTable.component.html',
	styleUrl: './animeTable.component.css',
	standalone: true,
	imports: [MatTableModule, AsyncPipe],
})
export class AnimeTableComponent implements OnInit {
	private animeService = inject(AnimeService);

	/** Represents anime list. */
	public anime$: Observable<Anime[]> | undefined;

	/** Represents table columns. */
	public displayedColumns: string[] = ['image', 'title_eng', 'title_jpn', 'aired_start', 'type', 'status'];

	public constructor() {}

	/** Replaces initial anime value with the one received from the server. */
	public ngOnInit(): void {
		this.anime$ = this.animeService.getAllAnime();
	}
}
