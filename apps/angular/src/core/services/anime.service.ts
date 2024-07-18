import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { GetAnimeResponseDto } from '../dtos/getAnimeResponse.dto';
import { AnimeMapper } from '../mappers/anime.mapper';
import { Anime } from '../models/anime';

import { UrlService } from './url.service';

/** Represents anime fetch and transform service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private httpClient = inject(HttpClient);

	private urlService = inject(UrlService);

	private animeUrl = this.urlService.getAnimeUrl();

	public constructor() {}

	/** Fetch all anime from backend. */
	public getAllAnime(): Observable<Anime[]> {
		return this.httpClient.get<GetAnimeResponseDto>(this.animeUrl).pipe(
			map(value => value.results.map(item => AnimeMapper.fromDto(item))),
		);
	}
}
