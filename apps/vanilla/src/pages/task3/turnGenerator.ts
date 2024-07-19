import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';

/** Represents a turn generator. */
export class TurnGenerator extends Publisher<number> {
	public constructor(private readonly playersCount: number, private currentPlayerIndex: number) {
		super();
	}

	/** @inheritdoc */
	public subscribers = new Set<Subscriber<number>>();

	/** Get turn of current player. */
	public next(): void {
		this.notify(this.currentPlayerIndex % this.playersCount);
		this.currentPlayerIndex += 1;
	}
}
