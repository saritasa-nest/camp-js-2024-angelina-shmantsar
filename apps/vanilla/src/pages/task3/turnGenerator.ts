import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';

/** Represents a turn generator. */
export class TurnGenerator implements Publisher<number> {
	public constructor(private readonly playersCount: number, private currentPlayerIndex: number) {}

	/** @inheritdoc */
	public subscribers: Set<Subscriber<number>> = new Set<Subscriber<number>>();

	/** @inheritdoc */
	public subscribe(subscriber: Subscriber<number>): void {
		this.subscribers.add(subscriber);
	}

	/** @inheritdoc */
	public unsubscribe(subscriber: Subscriber<number>): void {
		this.subscribers.delete(subscriber);
	}

	/** @inheritdoc */
	public notify(message: number): void {
		this.subscribers.forEach((subscriber: Subscriber<number>) => subscriber.update(message));
	}

	/** Get turn of current player. */
	public next(): void {
		this.notify(this.currentPlayerIndex % this.playersCount);
		this.currentPlayerIndex += 1;
	}
}
