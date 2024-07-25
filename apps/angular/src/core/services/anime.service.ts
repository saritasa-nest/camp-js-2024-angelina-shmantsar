import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeDto } from '../dtos/anime.dto';

import { Anime } from '../models/anime';

import { AnimePaginationMapper } from '../mappers/anime-pagination.mapper';
import { Pagination } from '../models/pagination';

import { AnimeTypeDto } from '../dtos/backend-enums/anime-type.dto';

import { ApiUrlService } from './api-url.service';

/** Data for getPaginatedAnime function. */
export type GetPaginatedAnimeData = {

	/** Limit. */
	readonly limit: string;

	/** Offset. */
	readonly offset: string;

	/** Ordering. */
	readonly ordering?: string;

	/** Search. */
	readonly search?: string;

	/** Type. */
	readonly type?: AnimeTypeDto;
};

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	private readonly animePaginationMapper = inject(AnimePaginationMapper);

	/**
	 * Fetch all anime.
	 * @param params - Params.
	 * */
	public getPaginatedAnime(params: GetPaginatedAnimeData): Observable<Pagination<Anime>> {
		const allAnimeUrl = `${this.urlService.anime.list}?${this.urlService.constructQueryParams(params)}`;
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(allAnimeUrl)
			.pipe(map(value => this.animePaginationMapper.fromDto(value)));
	}
}
