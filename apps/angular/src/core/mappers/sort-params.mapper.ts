import { SortParamsDto } from '../dtos/backend-enums/sort-params.dto';
import { SortParams } from '../models/sort-params';

const TO_DTO: Readonly<Record<SortParams, SortParamsDto>> = {
	[SortParams.AiredStart]: SortParamsDto.AiredStart,
	[SortParams.Status]: SortParamsDto.Status,
	[SortParams.TitleEnglish]: SortParamsDto.TitleEnglish,
};

type SortDirection = 'asc' | 'desc' | '';

export namespace SortParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model Model.
	 * @param sortDirection Sort direction.
	 */
	export function toDto(model: SortParams, sortDirection: SortDirection): string {
		return sortDirection === 'asc' ? TO_DTO[model] : `-${TO_DTO[model]}`;
	}
}
