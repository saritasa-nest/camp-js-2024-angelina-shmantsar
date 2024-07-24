import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeMapper } from '../mappers/anime.mapper';

import { AnimeDto } from '../dtos/anime.dto';

import { Anime } from '../models/anime';

import { ApiUrlService } from './api-url.service';

/** Anime service. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly allAnimeUrl = this.urlService.anime.list;

	/** Fetch all anime. */
	public getAll(): Observable<Anime[]> {
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(this.allAnimeUrl)
			.pipe(map(value => value.results.map(item => this.animeMapper.fromDto(item))));
	}
}
