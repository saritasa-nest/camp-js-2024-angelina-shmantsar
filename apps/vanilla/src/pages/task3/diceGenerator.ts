import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';
import { PlayerTurnResult } from './interfaces/playerTurnResult';
import { TurnGenerator } from './turnGenerator';

/** Represents a dice generator. */
export class DiceGenerator implements Publisher<PlayerTurnResult>, Subscriber<number> {
	/** Contains current player index. */
	private currentPlayerIndex = 0;

	private turnGenerator = new TurnGenerator(2, this.currentPlayerIndex);

	/** @inheritdoc */
	public subscribers = new Set<Subscriber<PlayerTurnResult>>();

	public constructor(private readonly sidesCount = 6) {
		this.turnGenerator.subscribe(this);
	}

	/** @inheritdoc */
	public subscribe(subscriber: Subscriber<PlayerTurnResult>): void {
		this.subscribers.add(subscriber);
	}

	/** @inheritdoc */
	public unsubscribe(subscriber: Subscriber<PlayerTurnResult>): void {
		this.subscribers.delete(subscriber);
	}

	/** @inheritdoc */
	public notify(message: PlayerTurnResult): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}

	/** @inheritdoc */
	public update(message: number): void {
		this.currentPlayerIndex = message;
	}

	/** Call notify method with current dice result and player index. */
	public roll(): void {
		this.turnGenerator.next();
		const rollResult: PlayerTurnResult = {
			playerIndex: this.currentPlayerIndex,
			diceResult: this.getDiceResult(),
		};
		this.notify(rollResult);
	}

	private getDiceResult(): number {
		const buffer = new Uint8Array(1);
		const crypto = window.crypto.getRandomValues(buffer);
		return Math.floor(crypto[0] / 256 * this.sidesCount) + 1;
	}
}
