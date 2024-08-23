/** Paginated anime data dto. */
export type AnimeManagementParamsDto = {

	/** Limit. */
	readonly limit: number;

	/** Offset. */
	readonly offset: number;

	/** Ordering. */
	readonly ordering?: string;

	/** Search. */
	readonly search?: string;

	/** Separated by comma list of selected types. */
	readonly type__in?: string;
};
