import { SortParams } from './sort-params';

/** Anime sort model. */
export type SortModel = {

	/** Active sort. */
	readonly activeSort: SortParams;

	/** Sort direction: 'asc' or 'desc' . */
	readonly direction: 'asc' | 'desc' | '';
};
