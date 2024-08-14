import { AnimeStatusDto } from './backend-enums/anime-status.dto';
import { AnimeTypeDto } from './backend-enums/anime-type.dto';
import { AnimeRatingDto } from './backend-enums/anime-rating.dto';
import { AnimeSeasonDto } from './backend-enums/anime-season.dto';
import { AnimeSourceDto } from './backend-enums/anime-source.dto';
import { DateTimeRangeDto } from './date-time-range.dto';
import { AnimeGenresDataDto } from './anime-genres-data.dto';
import { AnimeStudiosDataDto } from './anime-studios-data.dto';

/** Anime details DTO. */
export type AnimeDetailsDto = {

	/** Id. */
	readonly id: number;

	/** Id. */
	readonly created: string;

	/** Id. */
	readonly modified: string;

	/** Id. */
	readonly image: string;

	/** Id. */
	readonly trailer_youtube_id: string;

	/** Id. */
	readonly title_eng: string;

	/** Id. */
	readonly title_jpn: string;

	/** Id. */
	readonly score: number;

	/** Id. */
	readonly user_score: number;

	/** Id. */
	readonly type: AnimeTypeDto;

	/** Id. */
	readonly status: AnimeStatusDto;

	/** Id. */
	readonly source: AnimeSourceDto;

	/** Id. */
	readonly airing: boolean;

	/** Id. */
	readonly aired: DateTimeRangeDto;

	/** Id. */
	readonly rating: AnimeRatingDto;

	/** Id. */
	readonly season: AnimeSeasonDto;

	/** Id. */
	readonly synopsis: string;

	/** Id. */
	readonly background: string;

	/** Id. */
	readonly broadcast_day: number;

	/** Id. */
	readonly broadcast_time: string;

	/** Id. */
	readonly broadcast_timezone: string;

	/** Id. */
	readonly studios: readonly number[];

	/** Id. */
	readonly studios_data: readonly AnimeStudiosDataDto[];

	/** Id. */
	readonly genres: readonly number[];

	/** Id. */
	readonly genres_data: readonly AnimeGenresDataDto[];
};
