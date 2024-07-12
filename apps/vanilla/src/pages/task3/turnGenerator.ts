import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';

/** Represents a turn generator. */
export class TurnGenerator implements Publisher<number> {
	public constructor(private readonly playersCount: number, private currentPlayerIndex: number) {}

	/**
	 * @property {Set<Subscriber<number>>} subscribers - Contains subscribers.
	 */
	public subscribers: Set<Subscriber<number>> = new Set();

	/**
	 * @param s - Subscriber which want to subscribe.
	 */
	public subscribe(s: Subscriber<number>): void {
		this.subscribers.add(s);
	}

	/**
	 * @param s - Subscriber which want to unsubscribe.
	 */
	public unsubscribe(s: Subscriber<number>): void {
		this.subscribers.delete(s);
	}

	/**
	 * @param message - The message to notify with.
	 */
	public notify(message: number): void {
		this.subscribers.forEach((s: Subscriber<number>) => s.update(message));
	}

	/** Function to get turn of current player. */
	public next(): void {
		this.notify(this.currentPlayerIndex % this.playersCount);
		this.currentPlayerIndex += 1;
	}
}
