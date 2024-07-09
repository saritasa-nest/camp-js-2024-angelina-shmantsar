import { Subscriber } from './subscriber';

/**  Interface representing a publisher. */
export type Publisher<T> = {

	/**  Property representing a list of subscribers. */
	subscribers: Subscriber<T>[];

	/**
	 * @param {Subscriber<T>} s - Subscriber which want to subscribe.
	 */
	subscribe(s: Subscriber<T>): void;

	/**
	 * @param {Subscriber<T>} s- Subscriber which want to unsubscribe.
	 */
	unsubscribe(s: Subscriber<T>): void;

	/**
	 * @param {T} message - The message to notify with.
	 */
	notify(message: T): void;
};
