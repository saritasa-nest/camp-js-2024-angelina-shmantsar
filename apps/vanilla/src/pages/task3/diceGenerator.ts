import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';
import { PlayerTurnResult } from './interfaces/playerTurnResult';
import { TurnGenerator } from './turnGenerator';

/** Class representing a dice generator. */
export class DiceGenerator implements Publisher<PlayerTurnResult>, Subscriber<number> {
	/** Property representing current player index. */
	private currentPlayerIndex = 0;

	private turnGenerator: TurnGenerator = new TurnGenerator(2, this.currentPlayerIndex);

	/**  Property representing a list of subscribers. */
	public subscribers: Set<Subscriber<PlayerTurnResult>> = new Set();

	public constructor(private readonly sidesCount = 6) {
		this.turnGenerator.subscribe(this);
	}

	/**
	 * @param s - The subscriber.
	 */
	public subscribe(s: Subscriber<PlayerTurnResult>): void {
		this.subscribers.add(s);
	}

	/**
	 * @param s - The subscriber.
	 */
	public unsubscribe(s: Subscriber<PlayerTurnResult>): void {
		this.subscribers.delete(s);
	}

	/**
	 * @param message - The message.
	 */
	public notify(message: PlayerTurnResult): void {
		this.subscribers.forEach((s: Subscriber<PlayerTurnResult>) => s.update(message));
	}

	/**
	 * @param message - The message.
	 */
	public update(message: number): void {
		this.currentPlayerIndex = message;
	}

	/** Function to get dice value. */
	public roll(): void {
		const rollResult: PlayerTurnResult = {
			playerIndex: this.currentPlayerIndex,
			diceResult: Math.floor(Math.random() * this.sidesCount) + 1,
		};
		this.turnGenerator.next();
		this.notify(rollResult);
	}
}
