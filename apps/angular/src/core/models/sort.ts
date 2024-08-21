import { SortParams } from './sort-params';

/** Anime sort model. */
export type SortModel = {

	/** Active sort. */
	readonly activeSort: SortParams;

	/** Sort direction: 'asc', 'desc' or ''. */
	readonly direction: 'asc' | 'desc' | '';
};
