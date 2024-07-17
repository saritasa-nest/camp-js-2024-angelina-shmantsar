import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_API_URL } from '../constants/backendConst';

import { GetAnimeResponseDto } from '../dtos/getAnimeResponse.dto';
import { AnimeDto } from '../dtos/anime.dto';
import { AnimeMapper } from '../mappers/anime.mapper';
import { Anime } from '../models/anime';

/** Represents anime fetch service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private httpClient = inject(HttpClient);

	private baseAnimeUrl = `${BASE_API_URL}anime/`;

	public constructor() {}

	/** Method. */
	public getAllAnime(): Observable<GetAnimeResponseDto> {
		return this.httpClient.get<GetAnimeResponseDto>(`${this.baseAnimeUrl}anime/`, {
			headers: {
				// Json specific naming
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Api-Key': 'a392e76c-bd9b-4e37-a0cb-82f6aa60bb72',
			},
		});
	}

	/**
	 * @param dto - Anime dto.
	 */
	public mapAnimeDto(dto: AnimeDto[]): Anime[] {
		return dto.map(item => AnimeMapper.fromDto(item));
	}
}
