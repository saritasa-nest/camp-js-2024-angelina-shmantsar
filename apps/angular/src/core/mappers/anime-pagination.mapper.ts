import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Pagination } from '../models/pagination';

import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeMapper } from './anime.mapper';

export namespace AnimePaginationMapper {

	/**
	 * Transform pagination dto to pagination.
	 * @param dto - Pagination dto.
	 * */
	export function fromDto(dto: PaginationDto<AnimeDto>): Pagination<Anime> {
		return {
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(item => AnimeMapper.fromDto(item)),
		};
	}
}
