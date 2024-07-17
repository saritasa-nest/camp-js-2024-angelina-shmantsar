import { Subscriber } from './subscriber';

/**  Represents a publisher. */
export type Publisher<T> = {

	/** Contains subscribers. */
	readonly subscribers: Set<Subscriber<T>>;

	/**
	 * Add new subscriber to subscribers.
	 * @param {Subscriber<T>} subscriber - Subscriber which want to subscribe.
	 */
	subscribe(subscriber: Subscriber<T>): void;

	/**
	 * Remove subscriber from subscribers.
	 * @param {Subscriber<T>} subscriber - Subscriber which want to unsubscribe.
	 */
	unsubscribe(subscriber: Subscriber<T>): void;

	/**
	 * Notifies subscribers.
	 * @param message - The message to notify with.
	 */
	notify(message: T): void;
};
