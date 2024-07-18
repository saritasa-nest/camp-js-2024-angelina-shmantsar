import { AnimeDto } from './anime.dto';

/** Represents backend response with anime list. */
export type GetAnimeResponseDto = {

	/** Total count of anime. */
	readonly count: number;

	/** Reference to next page with anime. */
	readonly next: string;

	/** Reference to previous page with anime. */
	readonly previous: string;

	/** Anime list. */
	readonly results: readonly AnimeDto[];
};
