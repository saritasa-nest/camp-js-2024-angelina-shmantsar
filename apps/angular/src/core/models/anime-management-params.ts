/** Anime management params. */
export type AnimeManagementParams = {

	/** Limit. */
	readonly limit: string;

	/** Offset. */
	readonly offset: string;

	/** Ordering. */
	readonly ordering?: string;

	/** Search. */
	readonly search?: string;

	/** Type. */
	readonly type?: string;
};
