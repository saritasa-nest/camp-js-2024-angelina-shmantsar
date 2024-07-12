import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';
import { PlayerTurnResult } from './interfaces/playerTurnResult';
import { TurnGenerator } from './turnGenerator';

/** Represents a dice generator. */
export class DiceGenerator implements Publisher<PlayerTurnResult>, Subscriber<number> {
	/**
	 * @property {number} currentPlayerIndex - Contains current player index.
	 */
	private currentPlayerIndex = 0;

	private turnGenerator: TurnGenerator = new TurnGenerator(2, this.currentPlayerIndex);

	/**
	 * @property {Set<Subscriber<PlayerTurnResult>>} subscribers - Contains subscribers.
	 */
	public subscribers: Set<Subscriber<PlayerTurnResult>> = new Set<Subscriber<PlayerTurnResult>>();

	public constructor(private readonly sidesCount = 6) {
		this.turnGenerator.subscribe(this);
	}

	/**
	 * @param s - Subscriber which want to subscribe.
	 */
	public subscribe(s: Subscriber<PlayerTurnResult>): void {
		this.subscribers.add(s);
	}

	/**
	 * @param s - Subscriber which want to subscribe.
	 */
	public unsubscribe(s: Subscriber<PlayerTurnResult>): void {
		this.subscribers.delete(s);
	}

	/**
	 * @param message - The message to notify with.
	 */
	public notify(message: PlayerTurnResult): void {
		this.subscribers.forEach((s: Subscriber<PlayerTurnResult>) => s.update(message));
	}

	/**
	 * @param message - Message to update with.
	 */
	public update(message: number): void {
		this.currentPlayerIndex = message;
	}

	/** Function to get dice value. */
	public roll(): void {
		this.turnGenerator.next();
		const rollResult: PlayerTurnResult = {
			playerIndex: this.currentPlayerIndex,
			diceResult: Math.floor(Math.random() * this.sidesCount) + 1,
		};
		this.notify(rollResult);
	}
}
