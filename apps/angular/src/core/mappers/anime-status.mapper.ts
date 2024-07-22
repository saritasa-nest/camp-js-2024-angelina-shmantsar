import { Injectable } from '@angular/core';

import { AnimeStatusDto } from '../dtos/backend-enums/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';

const fromAnimeStatusDto: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

/** Anime status mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeStatusMapper {
	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	public fromDto(dto: AnimeStatusDto): AnimeStatus {
		return fromAnimeStatusDto[dto];
	}
}
