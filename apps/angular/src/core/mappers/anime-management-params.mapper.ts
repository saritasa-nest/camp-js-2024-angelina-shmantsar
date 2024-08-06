import { AnimeManagementParamsDto } from '../dtos/anime-management-params.dto';
import { AnimeManagementParams } from '../models/anime-management-params';

import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeManagementParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model - Model.
	 */
	export function toDto(model: AnimeManagementParams): AnimeManagementParamsDto {
		return {
			limit: model.pageSize.toString(),
			offset: model.pageNumber.toString(),
			ordering: model.ordering,
			search: model.search,
			type__in: model.types?.map(item => AnimeTypeMapper.toDto(item)).join(','),
		};
	}
}
