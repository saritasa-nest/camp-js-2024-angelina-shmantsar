import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';
import { PlayerTurnResult } from './interfaces/playerTurnResult';
import { TurnGenerator } from './turnGenerator';

/** Represents a dice generator. */
export class DiceGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
	/** Contains current player index. */
	private currentPlayerIndex = 0;

	private turnGenerator = new TurnGenerator(2, this.currentPlayerIndex);

	public constructor(private readonly sidesCount = 6) {
		super();
		this.turnGenerator.subscribe(this);
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
