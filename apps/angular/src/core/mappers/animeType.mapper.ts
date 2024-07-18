import { AnimeTypeDto } from '../dtos/backendEnums/animeType.dto';
import { AnimeType } from '../models/animeType';

export namespace AnimeTypeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeTypeDto): AnimeType {
		const animeStatus: AnimeType = {
			tv: dto.tv,
			ova: dto.ova,
			movie: dto.movie,
			special: dto.special,
			ona: dto.ona,
			music: dto.music,
			promotionalVideos: dto.promotionalVideos,
			unknown: dto.unknown,
		};
		return animeStatus;
	}
}
