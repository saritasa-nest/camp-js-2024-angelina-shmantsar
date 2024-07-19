import { Subscriber } from './subscriber';

/**  Represents a publisher. */
export abstract class Publisher<T> {

	/** Contains subscribers. */
	protected abstract subscribers: Set<Subscriber<T>>;

	/**
	 * Add new subscriber to subscribers.
	 * @param subscriber - Subscriber which want to subscribe.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		this.subscribers.add(subscriber);
	}

	/**
	 * Remove subscriber from subscribers.
	 * @param subscriber - Subscriber which want to unsubscribe.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
		this.subscribers.delete(subscriber);
	}

	/**
	 * Notifies subscribers.
	 * @param message - The message to notify with.
	 */
	protected notify(message: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}
}
