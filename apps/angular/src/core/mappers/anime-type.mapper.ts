import { Injectable } from '@angular/core';

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

/** Anime type mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeTypeMapper {
	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	public fromDto(dto: AnimeTypeDto): AnimeType {
		return FROM_DTO[dto];
	}
}
