import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Transform pagination dto to pagination.
	 * @param dto - Pagination dto.
	 * @param mapper - Mapper.
	 * */
	export function fromDto<TDto, TModel>(dto: PaginationDto<TDto>, mapper: (dto: TDto) => TModel): Pagination<TModel> {
		return {
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(mapper),
		};
	}
}
