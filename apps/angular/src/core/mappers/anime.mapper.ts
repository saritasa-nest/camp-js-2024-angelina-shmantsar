import { Injectable, inject } from '@angular/core';

import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

/** Anime mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeMapper {
	private readonly animeStatusMapper = inject(AnimeStatusMapper);

	private readonly animeTypeMapper = inject(AnimeTypeMapper);

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	public fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			created: dto.created,
			modified: dto.modified,
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			image: dto.image,
			aired: dto.aired,
			type: this.animeTypeMapper.fromDto(dto.type),
			status: this.animeStatusMapper.fromDto(dto.status),
			score: dto.score,
			userScore: dto.user_score,
			studioIds: dto.studios,
			genreIds: dto.genres,
		};
	}
}
