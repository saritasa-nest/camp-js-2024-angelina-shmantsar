import { Subscriber } from './subscriber';

/**  Represents a publisher. */
export type Publisher<T> = {

	/**
	 * @property {Set<Subscriber<T>>} subscribers - Contains subscribers.
	 */
	readonly subscribers: Set<Subscriber<T>>;

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
