// Because we get this type from backend
/* eslint-disable @typescript-eslint/naming-convention */
import { DateTimeRangeField } from '../interfaces/dateTimeRangeField';

import { AnimeStatusEnum } from './backendEnums/animeStatusEnum';
import { AnimeTypeEnum } from './backendEnums/animeTypeEnum';

/** Represents anime in backend. */
export type AnimeDto = {

	/** Anime id. */
	id: number;

	/** Created. */
	created: string;

	/** Modified. */
	modified: string;

	/** Anime title in English. */
	title_eng: string;

	/** Anime title in Japanese. */
	title_jpn: string;

	/** Image - anime poster. */
	image: string;

	/** Aired. */
	aired: DateTimeRangeField;

	/** Type. */
	type: AnimeTypeEnum;

	/** Status. */
	status: AnimeStatusEnum;

	/** Score. */
	score: number;

	/** User score. */
	user_score: number;

	/** Studios. */
	studios: number[];

	/** Genres. */
	genres: number[];
};
