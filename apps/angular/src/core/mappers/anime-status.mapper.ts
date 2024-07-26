import { AnimeStatusDto } from '../dtos/backend-enums/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';

const FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

export namespace AnimeStatusMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeStatusDto): AnimeStatus {
		return FROM_DTO[dto];
	}
}
