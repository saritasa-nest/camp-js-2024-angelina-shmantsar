// Because we get this type from backend
/* eslint-disable @typescript-eslint/naming-convention */
import { DateTimeRangeField } from '../interfaces/dateTimeRangeField';

import { AnimeStatusEnum } from './backendEnums/animeStatusEnum';
import { AnimeTypeEnum } from './backendEnums/animeTypeEnum';

/** Represents anime. */
export type AnimeDto = {

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
