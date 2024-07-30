/**  Represents a subscriber. */
export type Subscriber<T> = {

	/**
	 * Update subscriber.
	 * @param message - Message to update with.
	 */
	update(message: T): void;
};
