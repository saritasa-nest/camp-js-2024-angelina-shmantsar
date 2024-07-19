import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeMapper } from '../mappers/anime.mapper';
import { Anime } from '../models/anime';

import { AnimeDto } from '../dtos/anime.dto';

import { ApiUrlService } from './apiUrl.service';

/** Anime fetch and transform service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly allAnimeUrl = this.urlService.allAnimeUrl;

	/** Fetch all anime from backend. */
	public getAll(): Observable<Anime[]> {
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(this.allAnimeUrl)
			.pipe(map(value => value.results.map(item => this.animeMapper.fromDto(item))));
	}
}
