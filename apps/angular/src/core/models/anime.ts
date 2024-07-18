import { AnimeDto } from '../dtos/anime.dto';
import { AnimeStatus } from '../dtos/backendEnums/animeStatus';
import { AnimeType } from '../dtos/backendEnums/animeType';
import { DateTimeRangeField } from '../interfaces/dateTimeRangeField';

/** Type for anime class constructor. */
export type AnimeConstructorData = AnimeDto;

/** Represents anime. */
export class Anime {
	/** Id. */
	public readonly id: number;

	/** Created. */
	public readonly created: string;

	/** Modified. */
	public readonly modified: string;

	/** Anime title in English. */
	public readonly titleEng: string;

	/** Anime title in Japanese. */
	public readonly titleJpn: string;

	/** Image - anime poster. */
	public readonly image: string;

	/** Aired. */
	public readonly aired: DateTimeRangeField;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

	/** Score. */
	public readonly score: number;

	/** User score. */
	public readonly userScore: number;

	/** Studios. */
	public readonly studios: number[];

	/** Genres. */
	public readonly genres: number[];

	public constructor(data: AnimeConstructorData) {
		this.id = data.id;
		this.created = data.created;
		this.modified = data.modified;
		this.titleEng = data.title_eng;
		this.titleJpn = data.title_jpn;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.user_score;
		this.studios = data.studios;
		this.genres = data.genres;
	}
}
