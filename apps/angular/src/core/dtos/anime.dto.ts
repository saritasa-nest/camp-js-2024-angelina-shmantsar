// Because we get this type from backend
import { AnimeStatusDto } from './backend-enums/anime-status.dto';
import { AnimeTypeDto } from './backend-enums/anime-type.dto';
import { DateTimeRangeDto } from './date-time-range.dto';

/** Represents anime in backend. */
export type AnimeDto = {

	/** Anime id. */
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
	readonly title_eng: string;

	/** Anime title in Japanese. */
	readonly title_jpn: string;

	/** Image - anime poster. */
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

	/** Studios. */
	readonly studios: readonly number[];

	/** Genres. */
	readonly genres: readonly number[];
};
