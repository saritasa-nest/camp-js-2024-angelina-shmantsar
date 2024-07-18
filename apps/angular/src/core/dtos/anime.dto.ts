// Because we get this type from backend
/* eslint-disable @typescript-eslint/naming-convention */
import { DateTimeRangeField } from '../models/dateTimeRangeField';

import { AnimeStatus } from './backendEnums/animeStatus';
import { AnimeType } from './backendEnums/animeType';

/** Represents anime in backend. */
export type AnimeDto = {

	/** Anime id. */
	readonly id: number;

	/** Created. */
	readonly created: string;

	/** Modified. */
	readonly modified: string;

	/** Anime title in English. */
	readonly title_eng: string;

	/** Anime title in Japanese. */
	readonly title_jpn: string;

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
	readonly user_score: number;

	/** Studios. */
	readonly studios: readonly number[];

	/** Genres. */
	readonly genres: readonly number[];
};
