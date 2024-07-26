import { AnimeStatusDto } from './backend-enums/anime-status.dto';
import { AnimeTypeDto } from './backend-enums/anime-type.dto';
import { DateTimeRangeDto } from './date-time-range.dto';

/** Anime. */
export type AnimeDto = {

	/** Anime id. */
	readonly id: number;

	/**
	 * Created.
	 * String in ISO date format.
	 */
	readonly created: string;

	/**
	 * Modified.
	 * String in ISO date format.
	 * */
	readonly modified: string;

	/** Anime title in English. */
	readonly title_eng: string;

	/** Anime title in Japanese. */
	readonly title_jpn: string;

	/** Anime poster image URL. */
	readonly image: string;

	/** Aired. */
	readonly aired: DateTimeRangeDto;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Score. */
	readonly score: number;

	/** User score. */
	readonly user_score: number;

	/** Studio IDs. */
	readonly studios: readonly number[];

	/** Genre IDs. */
	readonly genres: readonly number[];
};
