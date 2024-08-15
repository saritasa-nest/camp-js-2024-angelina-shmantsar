import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeDto } from '../dtos/anime.dto';

import { Anime } from '../models/anime';

import { PaginationMapper } from '../mappers/pagination.mapper';
import { Pagination } from '../models/pagination';
import { AnimeManagementParams } from '../models/anime-management-params';
import { AnimeManagementParamsMapper } from '../mappers/anime-management-params.mapper';
import { composeHttpParams } from '../utils/compose-http-params';
import { AnimeMapper } from '../mappers/anime.mapper';
import { AnimeDetails } from '../models/anime-details';
import { AnimeDetailsDto } from '../dtos/anime-details.dto';
import { AnimeDetailsMapper } from '../mappers/anime-details.mapper';

import { ApiUrlService } from './api-url.service';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	/**
	 * Fetch all anime.
	 * @param params - Params.
	 * */
	public getPaginatedAnime(params: AnimeManagementParams): Observable<Pagination<Anime>> {
		const queryParams = composeHttpParams(AnimeManagementParamsMapper.toDto(params));
		const animeListUrl = this.urlService.anime.listUrl;
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(animeListUrl, { params: queryParams })
			.pipe(map(value => PaginationMapper.fromDto(value, AnimeMapper.fromDto)));
	}

	/**
	 * Fetch one anime and its details.
	 * @param id Anime id.
	 */
	public getAnimeById(id: number): Observable<AnimeDetails> {
		const animeListUrl = this.urlService.anime.listUrl;
		return this.httpClient
			.get<AnimeDetailsDto>(`${animeListUrl}${id}/`)
			.pipe(map(value => AnimeDetailsMapper.fromDto(value)));
	}
}
