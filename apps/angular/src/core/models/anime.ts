import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';

import { DateTimeRange } from './date-time-range';

/** Anime. */
export type Anime = {

	/** Id. */
	readonly id: number;

	/** Created. */
	readonly created: Date;

	/** Modified. */
	readonly modified: Date;

	/** Anime title in English. */
	readonly titleEnglish: string;

	/** Anime title in Japanese. */
	readonly titleJapanese: string;

	/** Anime poster image URL. */
	readonly image: string;

	/** Aired. */
	readonly aired: DateTimeRange;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Critic score. */
	readonly criticScore: number;

	/** User score. */
	readonly userScore: number;

	/** Studio IDs. */
	readonly studioIds: readonly number[];

	/** Genre IDs. */
	readonly genreIds: readonly number[];
};
