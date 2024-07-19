import { Injectable } from '@angular/core';

import { AnimeStatusDto } from '../dtos/backendEnums/animeStatus.dto';
import { AnimeStatus } from '../models/animeStatus';

/** Anime status transform service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeStatusMapper {
	private readonly fromAnimeStatusDto: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
	};

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	public fromDto(dto: AnimeStatusDto): AnimeStatus {
		return this.fromAnimeStatusDto[dto];
	}
}
