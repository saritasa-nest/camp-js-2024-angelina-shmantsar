import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';

/** Class representing a turn generator. */
export class TurnGenerator implements Publisher<number> {
	public constructor(private readonly playersCount: number, private currentPlayerIndex: number) {}

	/**  Property representing a list of subscribers. */
	public subscribers: Set<Subscriber<number>> = new Set();

	/**
	 * @param s - The subscriber.
	 */
	public subscribe(s: Subscriber<number>): void {
		this.subscribers.add(s);
	}

	/**
	 * @param s - The subscriber.
	 */
	public unsubscribe(s: Subscriber<number>): void {
		this.subscribers.delete(s);
	}

	/**
	 * @param message - The message.
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
