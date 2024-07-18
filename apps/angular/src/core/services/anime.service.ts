import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { GetAnimeResponseDto } from '../dtos/getAnimeResponse.dto';
import { AnimeDto } from '../dtos/anime.dto';
import { AnimeMapper } from '../mappers/anime.mapper';
import { Anime } from '../models/anime';
import { convertIsoToLocale } from '../utils/convertIsoToLocale';

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
			map(value => this.mapAnimeDto(value.results)),
			map(value => value.map(item => ({
				...item,
				aired: {
					start: convertIsoToLocale(item.aired.start),
					end: item.aired.end,
				},
			}))),
		);
	}

	private mapAnimeDto(dto: AnimeDto[]): Anime[] {
		return dto.map(item => AnimeMapper.fromDto(item));
	}
}
