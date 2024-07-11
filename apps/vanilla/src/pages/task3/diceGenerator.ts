import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';

/** Class representing a dice generator. */
export class DiceGenerator implements Publisher<number>, Subscriber<number> {
	/**  Property representing a list of subscribers. */
	public subscribers: Set<Subscriber<number>> = new Set();

	public constructor(private readonly sidesCount = 6) {}

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

	/**
	 * @param message - The message.
	 */
	public update(message: number): void {
		// eslint-disable-next-line no-console
		console.log(message);
	}

	/** Function to get dice value. */
	public roll(): void {
		const rollResult = Math.floor(Math.random() * this.sidesCount) + 1;
		this.notify(rollResult);
	}
}
