import { DateTimeRangeDto } from '../dtos/date-time-range.dto';
import { DateTimeRange } from '../models/date-time-range';

export namespace DateTimeRangeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Date-time range dto.
	 */
	export function fromDto(dto: DateTimeRangeDto): DateTimeRange {
		return {
			start: dto.start != null ? new Date(dto.start) : null,
			end: dto.end != null ? new Date(dto.end) : null,
		};
	}
}
