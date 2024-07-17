import { AnimeDto } from './anime.dto';

/** Represents backend response with anime list. */
export type GetAnimeResponseDto = {

	/** Total count of anime. */
	count: number;

	/** Reference to next page with anime. */
	next: string;

	/** Reference to previous page with anime. */
	previous: string;

	/** Anime list. */
	results: AnimeDto[];
};
