import { AnimeManagementParamsDto } from '../dtos/anime-management-params.dto';
import { AnimeManagementParams } from '../models/anime-management-params';

export namespace AnimeManagementParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model - Model.
	 */
	export function toDto(model: AnimeManagementParams): AnimeManagementParamsDto {
		return {
			limit: model.limit,
			offset: model.offset,
			ordering: model.ordering,
			search: model.search,
			type__in: model.type,
		};
	}
}
