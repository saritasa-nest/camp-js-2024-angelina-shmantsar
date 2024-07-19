import { Publisher } from './interfaces/publisher';

/** Represents a turn generator. */
export class TurnGenerator extends Publisher<number> {
	public constructor(private readonly playersCount: number, private currentPlayerIndex: number) {
		super();
	}

	/** Get turn of current player. */
	public next(): void {
		this.notify(this.currentPlayerIndex % this.playersCount);
		this.currentPlayerIndex += 1;
	}
}
