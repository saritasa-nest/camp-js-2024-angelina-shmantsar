import { SortParamsDto } from '../dtos/backend-enums/sort-params.dto';
import { SortModel } from '../models/sort';
import { SortParams } from '../models/sort-params';

export namespace SortMapper {

	const TO_SORT_PARAM_DTO: Readonly<Record<SortParams, SortParamsDto>> = {
		[SortParams.AiredStart]: SortParamsDto.AiredStart,
		[SortParams.Status]: SortParamsDto.Status,
		[SortParams.TitleEnglish]: SortParamsDto.TitleEnglish,
	};

	const FROM_SORT_PARAM_DTO: Readonly<Record<SortParamsDto, SortParams>> = {
		[SortParamsDto.AiredStart]: SortParams.AiredStart,
		[SortParamsDto.Status]: SortParams.Status,
		[SortParamsDto.TitleEnglish]: SortParams.TitleEnglish,
	};

	const TO_DIRECTION_DTO: Readonly<Record<string, string>> = {
		asc: '',
		desc: '-',
	};

	/**
	 * Maps sort model to appropriate string.
	 * @param model Sort model.
	 */
	export function toDto(model: SortModel): string {
		return TO_DIRECTION_DTO[model.direction] + TO_SORT_PARAM_DTO[model.activeSort];
	}

	/**
	 * Maps sort string to sort model.
	 * @param dto Sort in string format.
	 */
	export function fromDto(dto: string): SortModel {
		if (dto[0] === '-') {
			return {
				activeSort: FROM_SORT_PARAM_DTO[dto.slice(1) as SortParamsDto],
				direction: 'desc',
			};
		}
		return {
			activeSort: FROM_SORT_PARAM_DTO[dto as SortParamsDto],
			direction: 'asc',
		};
	}
}
