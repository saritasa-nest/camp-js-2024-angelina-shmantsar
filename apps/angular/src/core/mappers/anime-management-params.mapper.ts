import { DEFAULT_PAGE_NUMBER, INITIAL_PAGE_SIZE } from '@js-camp/angular/shared/constants/default-paginator-values';

import { AnimeManagementParamsDto } from '../dtos/anime-management-params.dto';
import { AnimeTypeDto } from '../dtos/backend-enums/anime-type.dto';
import { AnimeManagementParams } from '../models/anime-management-params';

import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeManagementParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Model.
	 */
	export function toQueryParams(model: AnimeManagementParams): AnimeManagementParamsDto {
		const types = model.types?.map(item => AnimeTypeMapper.toDto(item)).join(',');
		return {
			limit: model.pageSize,
			offset: (model.pageNumber * model.pageSize),
			ordering: model.ordering,
			search: model.search,
			type__in: types.length > 0 ? types : undefined,
		};
	}

	/**
	 * Maps DTO to model.
	 * @param dto DTO.
	 */
	export function fromQueryParams(dto: AnimeManagementParamsDto): AnimeManagementParams {
		const pageSize = Number(dto.limit ?? INITIAL_PAGE_SIZE);
		const types = dto.type__in?.split(',').map(item => AnimeTypeMapper.fromDto(item as AnimeTypeDto)) ?? [];
		return {
			pageSize,
			pageNumber: Math.round(Number(dto.offset ?? DEFAULT_PAGE_NUMBER) / pageSize),
			ordering: dto.ordering,
			search: dto.search,
			types,
		};
	}
}
