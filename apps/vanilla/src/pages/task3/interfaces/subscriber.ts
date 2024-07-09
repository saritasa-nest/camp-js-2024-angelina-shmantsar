/**  Interface representing a subscriber. */
export type Subscriber<T> = {

	/**
	 * @param {T} message - The message to update with.
	 */
	update(message: T): void;
};
