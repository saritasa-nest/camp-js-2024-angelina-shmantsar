import { AnimeType } from './anime-type';

/** Anime management params. */
export type AnimeManagementParams = {

	/** Page size. */
	readonly pageSize: number;

	/** Page number. */
	readonly pageNumber: number;

	/** Types. */
	readonly types: readonly AnimeType[];

	/** Ordering. */
	readonly ordering?: string;

	/** Search. */
	readonly search?: string;
};
