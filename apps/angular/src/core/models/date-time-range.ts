/** Represents date-time interval. */
export type DateTimeRange = {

	/**
	 * Start.
	 * @type {/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/}
	 * */
	readonly start: string;

	/**
	 * End.
	 * @type {/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/}
	 */
	readonly end: string;
};
