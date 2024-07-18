import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeMapper } from '../mappers/anime.mapper';
import { Anime } from '../models/anime';

import { AnimeDto } from '../dtos/anime.dto';

import { UrlService } from './url.service';

/** Anime fetch and transform service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlService = inject(UrlService);

	private readonly animeUrl = this.urlService.getAnimeUrl();

	/** Fetch all anime from backend. */
	public getAll(): Observable<Anime[]> {
		return this.httpClient.get<PaginationDto<AnimeDto>>(this.animeUrl).pipe(
			map(value => value.results.map(item => AnimeMapper.fromDto(item))),
		);
	}
}
