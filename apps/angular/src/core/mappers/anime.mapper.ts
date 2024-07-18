import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';
import { convertIsoToLocale } from '../utils/convertIsoToLocale';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		const anime: Anime = {
			id: dto.id,
			created: dto.created,
			modified: dto.modified,
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			image: dto.image,
			aired: {
				start: convertIsoToLocale(dto.aired.start),
				end: dto.aired.end,
			},
			type: dto.type,
			status: dto.status,
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		};
		return anime;
	}
}
