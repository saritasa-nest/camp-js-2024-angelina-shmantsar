import { AnimeStatus } from './animeStatus';
import { AnimeType } from './animeType';

import { DateTimeRange } from './dateTimeRange';

/** Represents anime. */
export type Anime = {

	/** Id. */
	readonly id: number;

	/** Created. */
	readonly created: Date;

	/** Modified. */
	readonly modified: Date;

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

	/** Studios. */
	readonly studios: readonly number[];

	/** Genres. */
	readonly genres: readonly number[];
};
