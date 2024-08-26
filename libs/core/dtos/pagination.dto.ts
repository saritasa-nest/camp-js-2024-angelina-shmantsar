/** Pagination meta info. */
export type PaginationDto<T> = {

	/** Total count of items. */
	readonly count: number;

	/** Link to the next page of items. */
	readonly next: string;

	/** Link to the previous page of items. */
	readonly previous: string;

	/** Array of items requested. */
	readonly results: readonly T[];
};
