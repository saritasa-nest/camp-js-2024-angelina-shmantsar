import { AnimeDto } from './anime.dto';

/** Type. */
export type GetAnimeResponseDto = {

	/** Hi. */
	count: number;

	/** Hi. */
	next: string;

	/** Hi. */
	previous: string;

	/** Hi. */
	results: AnimeDto[];
};
