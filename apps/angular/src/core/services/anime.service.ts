import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { BASE_API_URL } from '../constants/backendConst';

import { GetAnimeResponseDto } from '../dtos/getAnimeResponse.dto';
import { AnimeDto } from '../dtos/anime.dto';
import { AnimeMapper } from '../mappers/anime.mapper';
import { Anime } from '../models/anime';
import { convertIsoToLocale } from '../utils/convertIsoToLocale';

/** Represents anime fetch and transform service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private httpClient = inject(HttpClient);

	private baseAnimeUrl = `${BASE_API_URL}anime/`;

	public constructor() {}

	/** Fetch all anime from backend. */
	public getAllAnime(): Observable<Anime[]> {
		return this.httpClient.get<GetAnimeResponseDto>(`${this.baseAnimeUrl}anime/`, {
			headers: {
				// Json specific naming
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Api-Key': 'a392e76c-bd9b-4e37-a0cb-82f6aa60bb72',
			},
		}).pipe(
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

	/**
	 * @param dto - Anime dto.
	 */
	private mapAnimeDto(dto: AnimeDto[]): Anime[] {
		return dto.map(item => AnimeMapper.fromDto(item));
	}
}
