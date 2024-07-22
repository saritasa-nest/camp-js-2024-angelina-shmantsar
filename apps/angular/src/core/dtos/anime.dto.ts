// Because we get this type from backend
/* eslint-disable @typescript-eslint/naming-convention */
import { DateTimeRange } from '../models/date-time-range';

import { AnimeStatusDto } from './backend-enums/anime-status.dto';
import { AnimeTypeDto } from './backend-enums/anime-type.dto';

/** Represents anime in backend. */
export type AnimeDto = {

	/** Anime id. */
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
	readonly title_eng: string;

	/** Anime title in Japanese. */
	readonly title_jpn: string;

	/** Image - anime poster. */
	readonly image: string;

	/** Aired. */
	readonly aired: DateTimeRange;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Score. */
	readonly score: number;

	/** User score. */
	readonly user_score: number;

	/** Studios. */
	readonly studios: readonly number[];

	/** Genres. */
	readonly genres: readonly number[];
};
