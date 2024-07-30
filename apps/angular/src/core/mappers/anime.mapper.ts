import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { DateTimeRangeMapper } from './date-time-range.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			image: dto.image,
			aired: DateTimeRangeMapper.fromDto(dto.aired),
			type: AnimeTypeMapper.fromDto(dto.type),
			status: AnimeStatusMapper.fromDto(dto.status),
			score: dto.score,
			userScore: dto.user_score,
			studioIds: dto.studios,
			genreIds: dto.genres,
		};
	}
}
