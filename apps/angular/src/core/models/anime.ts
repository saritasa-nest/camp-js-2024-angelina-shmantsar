import { AnimeDto } from '../dtos/anime.dto';
import { AnimeStatusEnum } from '../dtos/backendEnums/animeStatusEnum';
import { AnimeTypeEnum } from '../dtos/backendEnums/animeTypeEnum';
import { DateTimeRangeField } from '../interfaces/dateTimeRangeField';

/** Type for anime class constructor. */
export type AnimeConstructorData = AnimeDto;

/** Represents anime. */
export class Anime {
	/** Id. */
	public readonly id: number;

	/** Name. */
	public readonly created: string;

	/** Id. */
	public readonly modified: string;

	/** Name. */
	public readonly titleEng: string;

	/** Id. */
	public readonly titleJpn: string;

	/** Name. */
	public readonly image: string;

	/** Id. */
	public readonly aired: DateTimeRangeField;

	/** Name. */
	public readonly type: AnimeTypeEnum;

	/** Id. */
	public readonly status: AnimeStatusEnum;

	/** Name. */
	public readonly score: number;

	/** Id. */
	public readonly userScore: number;

	/** Name. */
	public readonly studios: number[];

	/** Name. */
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
