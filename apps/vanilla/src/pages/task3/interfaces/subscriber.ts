/**  Represents a subscriber. */
export type Subscriber<T> = {

	/**
	 * Update subscriber.
	 * @param {T} message - Message to update with.
	 */
	update(message: T): void;
};
