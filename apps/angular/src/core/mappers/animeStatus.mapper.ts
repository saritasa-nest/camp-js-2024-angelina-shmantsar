import { AnimeStatusDto } from '../dtos/backendEnums/animeStatus.dto';
import { AnimeStatus } from '../models/animeStatus';

export namespace AnimeStatusMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeStatusDto): AnimeStatus {
		const animeStatus: AnimeStatus = {
			airing: dto.airing,
			finished: dto.finished,
			notYetAired: dto.notYetAired,
		};
		return animeStatus;
	}
}
