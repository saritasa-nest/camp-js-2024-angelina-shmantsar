import { Injectable, inject } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Pagination } from '../models/pagination';

import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeMapper } from './anime.mapper';

/** Pagination mapper. */
@Injectable({ providedIn: 'root' })
export class AnimePaginationMapper {
	private readonly animeMapper = inject(AnimeMapper);

	/**
	 * Transform pagination dto to pagination.
	 * @param dto - Pagination dto.
	 * */
	public fromDto(dto: PaginationDto<AnimeDto>): Pagination<Anime> {
		return {
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(item => this.animeMapper.fromDto(item)),
		};
	}
}
