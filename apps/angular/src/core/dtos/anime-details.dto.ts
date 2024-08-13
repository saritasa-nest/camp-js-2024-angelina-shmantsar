import { AnimeStatusDto } from './backend-enums/anime-status.dto';
import { AnimeTypeDto } from './backend-enums/anime-type.dto';
import { RatingDto } from './backend-enums/rating.dto';
import { SeasonDto } from './backend-enums/season.dto';
import { SourceDto } from './backend-enums/source.dto';
import { GenresDataDto } from './genres-data.dto';
import { StudiosDataDto } from './studios-data.dto';

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
	readonly source: SourceDto;

	/** Id. */
	readonly airing: boolean;

	/** Id. */
	readonly aired: {

		/** Id. */
		readonly start: string;

		/** Id. */
		readonly end: string;
	};

	/** Id. */
	readonly rating: RatingDto;

	/** Id. */
	readonly season: SeasonDto;

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
	readonly studios_data: readonly StudiosDataDto[];

	/** Id. */
	readonly genres: readonly number[];

	/** Id. */
	readonly genres_data: readonly GenresDataDto[];
};
