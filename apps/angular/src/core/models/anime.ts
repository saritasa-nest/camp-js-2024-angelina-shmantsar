import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';

import { DateTimeRange } from './date-time-range';

/** Represents anime. */
export type Anime = {

	/** Id. */
	readonly id: number;

	/**
	 * Created.
	 * @type {string} - String in ISO date format.
	 */
	readonly created: string;

	/**
	 * Modified.
	 * @type {string} - String in ISO date format.
	 * */
	readonly modified: string;

	/** Anime title in English. */
	readonly titleEng: string;

	/** Anime title in Japanese. */
	readonly titleJpn: string;

	/** Image - anime poster. */
	readonly image: string;

	/** Aired. */
	readonly aired: DateTimeRange;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Score. */
	readonly score: number;

	/** User score. */
	readonly userScore: number;

	/** Studio IDs. */
	readonly studioIds: readonly number[];

	/** Genre IDs. */
	readonly genreIds: readonly number[];
};
