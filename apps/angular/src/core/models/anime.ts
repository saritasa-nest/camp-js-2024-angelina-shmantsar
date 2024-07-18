import { AnimeDto } from '../dtos/anime.dto';
import { AnimeStatus } from '../dtos/backendEnums/animeStatus';
import { AnimeType } from '../dtos/backendEnums/animeType';

import { DateTimeRangeField } from './dateTimeRangeField';

/** Type for anime class constructor. */
export type AnimeConstructorData = AnimeDto;

/** Represents anime. */
export type Anime = {

	/** Id. */
	readonly id: number;

	/** Created. */
	readonly created: string;

	/** Modified. */
	readonly modified: string;

	/** Anime title in English. */
	readonly titleEng: string;

	/** Anime title in Japanese. */
	readonly titleJpn: string;

	/** Image - anime poster. */
	readonly image: string;

	/** Aired. */
	readonly aired: DateTimeRangeField;

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
