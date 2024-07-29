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
	// eslint-disable-next-line @typescript-eslint/naming-convention
	readonly type__in?: string;
};
