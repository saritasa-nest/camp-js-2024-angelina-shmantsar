import { AnimeTypeDto } from '../dtos/backend-enums/anime-type.dto';
import { AnimeType } from '../models/anime-type';

const FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
	[AnimeTypeDto.Tv]: AnimeType.Tv,
	[AnimeTypeDto.Ova]: AnimeType.Ova,
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.Ona]: AnimeType.Ona,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
};

const TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
	[AnimeType.Tv]: AnimeTypeDto.Tv,
	[AnimeType.Ova]: AnimeTypeDto.Ova,
	[AnimeType.Movie]: AnimeTypeDto.Movie,
	[AnimeType.Special]: AnimeTypeDto.Special,
	[AnimeType.Ona]: AnimeTypeDto.Ona,
	[AnimeType.Music]: AnimeTypeDto.Music,
	[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
};

export namespace AnimeTypeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeTypeDto): AnimeType {
		return FROM_DTO[dto];
	}

	/**
	 * Maps model to dto.
	 * @param model Anime model.
	 * @returns
	 */
	export function toDto(model: AnimeType): AnimeTypeDto {
		return TO_DTO[model];
	}
}
