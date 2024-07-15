import { AnimeStatusEnum } from '../enums/animeStatusEnum';
import { AnimeTypeEnum } from '../enums/animeTypeEnum';

import { DateTimeRangeField } from './dateTimeRangeField';

/** Represents anime. */
export type Anime = {

	/** Hi. */
	id: number;

	/** Hi. */
	created: string;

	/** Hi. */
	modified: string;

	/** Hi. */
	title_eng: string;

	/** Hi. */
	title_jpn: string;

	/** Hi. */
	image: string;

	/** Hi. */
	aired: DateTimeRangeField;

	/** Hi. */
	type: AnimeTypeEnum;

	/** Hi. */
	status: AnimeStatusEnum;

	/** Hi. */
	score: number;

	/** Hi. */
	user_score: number;

	/** Hi. */
	studios: number[];

	/** Hi. */
	genres: number[];
};
