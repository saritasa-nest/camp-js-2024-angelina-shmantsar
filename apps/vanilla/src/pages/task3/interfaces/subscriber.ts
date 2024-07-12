/**  Represents a subscriber. */
export type Subscriber<T> = {

	/**
	 * @param {T} message - Message to update with.
	 */
	update(message: T): void;
};
