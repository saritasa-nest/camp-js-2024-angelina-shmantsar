import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';
import { DateTimeRange } from './date-time-range';
import { AnimeGenresData } from './anime-genres-data';
import { AnimeRating } from './anime-rating';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { AnimeStudiosData } from './anime-studios-data';

/** Anime details. */
export type AnimeDetails = {

	/** Id. */
	readonly id: number;

	/** Id. */
	readonly created: string;

	/** Id. */
	readonly modified: string;

	/** Id. */
	readonly imageUrl: string;

	/** Id. */
	readonly trailerYoutubeIdUrl: string;

	/** Id. */
	readonly titleEnglish: string;

	/** Id. */
	readonly titleJapanese: string;

	/** Id. */
	readonly criticScore: number;

	/** Id. */
	readonly userScore: number;

	/** Id. */
	readonly type: AnimeType;

	/** Id. */
	readonly status: AnimeStatus;

	/** Id. */
	readonly source: AnimeSource;

	/** Id. */
	readonly airing: boolean;

	/** Id. */
	readonly aired: DateTimeRange;

	/** Id. */
	readonly rating: AnimeRating;

	/** Id. */
	readonly season: AnimeSeason;

	/** Id. */
	readonly synopsis: string;

	/** Id. */
	readonly background: string;

	/** Id. */
	readonly broadcastDay: number;

	/** Id. */
	readonly broadcastTime: string;

	/** Id. */
	readonly broadcastTimezone: string;

	/** Id. */
	readonly studios: readonly number[];

	/** Id. */
	readonly studiosData: readonly AnimeStudiosData[];

	/** Id. */
	readonly genres: readonly number[];

	/** Id. */
	readonly genresData: readonly AnimeGenresData[];
};
