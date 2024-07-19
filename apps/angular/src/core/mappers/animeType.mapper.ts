import { Injectable } from '@angular/core';

import { AnimeTypeDto } from '../dtos/backendEnums/animeType.dto';
import { AnimeType } from '../models/animeType';

/** Anime type transform service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeTypeMapper {
	private readonly fromAnimeTypeDto: Readonly<Record<AnimeTypeDto, AnimeType>> = {
		[AnimeTypeDto.Tv]: AnimeType.Tv,
		[AnimeTypeDto.Ova]: AnimeType.Ova,
		[AnimeTypeDto.Movie]: AnimeType.Movie,
		[AnimeTypeDto.Special]: AnimeType.Special,
		[AnimeTypeDto.Ona]: AnimeType.Ona,
		[AnimeTypeDto.Music]: AnimeType.Music,
		[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
		[AnimeTypeDto.Unknown]: AnimeType.Unknown,
	};

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	public fromDto(dto: AnimeTypeDto): AnimeType {
		return this.fromAnimeTypeDto[dto];
	}
}
