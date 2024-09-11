import { AnimeRating } from '@js-camp/angular/core/models/anime-rating';
import { AnimeSeason } from '@js-camp/angular/core/models/anime-season';
import { AnimeSource } from '@js-camp/angular/core/models/anime-source';
import { AnimeStatus } from '@js-camp/angular/core/models/anime-status';
import { AnimeType } from '@js-camp/angular/core/models/anime-type';

type FormSelectOption<T> = {

	/** Value. */
	readonly value: T;

	/** Title. */
	readonly title: string;
};

/** Anime type options. */
export const ANIME_TYPE_OPTIONS: readonly FormSelectOption<AnimeType>[] = [
	{ value: AnimeType.Movie, title: 'Movie' },
	{ value: AnimeType.Music, title: 'Music' },
	{ value: AnimeType.Ona, title: 'ONA' },
	{ value: AnimeType.Ova, title: 'OVA' },
	{ value: AnimeType.PromotionalVideos, title: 'Promotional videos' },
	{ value: AnimeType.Special, title: 'Special' },
	{ value: AnimeType.Tv, title: 'TV' },
	{ value: AnimeType.Unknown, title: 'Unknown' },
];

/** Anime status options. */
export const ANIME_STATUS_OPTIONS: readonly FormSelectOption<AnimeStatus>[] = [
	{ value: AnimeStatus.Airing, title: 'Airing' },
	{ value: AnimeStatus.Finished, title: 'Finished' },
	{ value: AnimeStatus.NotYetAired, title: 'Not yet aired' },
];

/** Anime rating options. */
export const ANIME_RATING_OPTIONS: readonly FormSelectOption<AnimeRating>[] = [
	{ value: AnimeRating.G, title: 'G' },
	{ value: AnimeRating.Pg, title: 'PG' },
	{ value: AnimeRating.Pg13, title: 'PG-13' },
	{ value: AnimeRating.R17, title: 'R-17' },
	{ value: AnimeRating.RPlus, title: 'R+' },
	{ value: AnimeRating.Rx, title: 'RX' },
	{ value: AnimeRating.Unknown, title: 'Unknown' },
];

/** Anime season options. */
export const ANIME_SEASON_OPTIONS: readonly FormSelectOption<AnimeSeason>[] = [
	{ value: AnimeSeason.Fall, title: 'Fall' },
	{ value: AnimeSeason.NonSeasonal, title: 'Non-seasonal' },
	{ value: AnimeSeason.Spring, title: 'Spring' },
	{ value: AnimeSeason.Summer, title: 'Summer' },
	{ value: AnimeSeason.Winter, title: 'Winter' },
];

/** Anime source options. */
export const ANIME_SOURCE_OPTIONS: readonly FormSelectOption<AnimeSource>[] = [
	{ value: AnimeSource.Book, title: 'Book' },
	{ value: AnimeSource.CardGame, title: 'Card game' },
	{ value: AnimeSource.FourKomaManga, title: 'Four-koma manga' },
	{ value: AnimeSource.Game, title: 'Game' },
	{ value: AnimeSource.LightNovel, title: 'Light novel' },
	{ value: AnimeSource.Manga, title: 'Manga' },
	{ value: AnimeSource.MixedMedia, title: 'Mixed media' },
	{ value: AnimeSource.Music, title: 'Music' },
	{ value: AnimeSource.Novel, title: 'Novel' },
	{ value: AnimeSource.Original, title: 'Original' },
	{ value: AnimeSource.Other, title: 'Other' },
	{ value: AnimeSource.PictureBook, title: 'Picture book' },
	{ value: AnimeSource.Radio, title: 'Radio' },
	{ value: AnimeSource.Unknown, title: 'Unknown' },
	{ value: AnimeSource.VisualNovel, title: 'Visual novel' },
	{ value: AnimeSource.WebManga, title: 'Web manga' },
	{ value: AnimeSource.WebNovel, title: 'Web novel' },
];
