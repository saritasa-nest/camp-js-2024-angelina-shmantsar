import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeDto } from '../dtos/anime.dto';

import { Anime } from '../models/anime';

import { AnimePaginationMapper } from '../mappers/anime-pagination.mapper';
import { Pagination } from '../models/pagination';
import { AnimeManagementParams } from '../models/anime-management-params';
import { AnimeManagementParamsMapper } from '../mappers/anime-management-params.mapper';
import { composeHttpParams } from '../utils/compose-http-params';

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
		const animeListUrl = this.urlService.anime.list;
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(animeListUrl, { params: queryParams })
			.pipe(map(value => AnimePaginationMapper.fromDto(value)));
	}
}
