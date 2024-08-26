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

	/**
	 * Created.
	 * String in ISO date format.
	 * */
	readonly created: string;

	/**
	 * Modified.
	 * String in ISO date format.
	 * */
	readonly modified: string;

	/** Anime poster image url. */
	readonly imageUrl: string;

	/** Trailer youtube id url. */
	readonly trailerYoutubeIdUrl: string;

	/** Anime title in English. */
	readonly titleEnglish: string;

	/** Anime title in Japanese. */
	readonly titleJapanese: string;

	/** Critic score. */
	readonly criticScore: number;

	/** User score. */
	readonly userScore: number;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Source. */
	readonly source: AnimeSource;

	/** Airing. */
	readonly airing: string;

	/** Aired. */
	readonly aired: DateTimeRange;

	/** Rating. */
	readonly rating: AnimeRating;

	/** Season. */
	readonly season: AnimeSeason;

	/** Synopsis. */
	readonly synopsis: string;

	/** Background. */
	readonly background: string;

	/** Broadcast day. */
	readonly broadcastDay: number;

	/** Broadcast time. */
	readonly broadcastTime: string;

	/** Broadcast timezone. */
	readonly broadcastTimezone: string;

	/** Studio ID's. */
	readonly studios: readonly number[];

	/** Studios data. */
	readonly studiosData: readonly AnimeStudiosData[];

	/** Genre ID's. */
	readonly genres: readonly number[];

	/** Genres data. */
	readonly genresData: readonly AnimeGenresData[];
};
