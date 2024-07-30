/** Paginated anime data dto. */
export type AnimeManagementParamsDto = {

	/** Limit. */
	readonly limit: string;

	/** Offset. */
	readonly offset: string;

	/** Ordering. */
	readonly ordering?: string;

	/** Search. */
	readonly search?: string;

	/** Type. */
	readonly type__in?: string;
};
