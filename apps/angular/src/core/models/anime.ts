import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';

import { DateTimeRange } from './date-time-range';

/** Represents anime. */
export type Anime = {

	/** Id. */
	readonly id: number;

	/**
	 * Created.
	 * @type {/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/}
	 */
	readonly created: string;

	/**
	 * Modified.
	 * @type {/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/}
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
