import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeDto } from '../dtos/anime.dto';

import { Anime } from '../models/anime';

import { AnimePaginationMapper } from '../mappers/anime-pagination.mapper';
import { Pagination } from '../models/pagination';

import { ApiUrlService } from './api-url.service';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	private readonly animePaginationMapper = inject(AnimePaginationMapper);

	/**
	 * Fetch all anime.
	 * */
	public getPaginatedAnime(limit = '25', offset: string = '0'): Observable<Pagination<Anime>> {
		const params = {
			limit,
			offset,
		};
		const allAnimeUrl = `${this.urlService.anime.list}?${this.urlService.constructQueryParams(params)}`;
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(allAnimeUrl)
			.pipe(map((value) => this.animePaginationMapper.fromDto(value)));
	}
}
