import { PlayerTurnResult } from './interfaces/playerTurnResult';
import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';

/** Represents whether there is a winner or not. */
type IsWinner = {

	/** Contains winner status. */
	readonly isWinner: boolean;
};

/** Represents current player state. */
export type PlayerStateInfo = PlayerTurnResult & IsWinner;

/** Represents a player. */
export class Player extends Publisher<PlayerStateInfo> implements Subscriber<PlayerTurnResult> {
	private diceResults: number[] = [];

	private isWinner = false;

	private readonly sumToWin = 21;

	/** @inheritdoc */
	public subscribers = new Set<Subscriber<PlayerStateInfo>>();

	public constructor(public readonly playerIndex: number) {
		super();
	}

	/** @inheritdoc */
	public update(message: PlayerTurnResult): void {
		const { playerIndex, diceResult } = message;
		if (this.playerIndex !== playerIndex) {
			return;
		}
		this.diceResults.push(diceResult);
		const totalPoints = this.diceResults.reduce((a, b) => a + b, 0);
		this.isWinner = totalPoints >= this.sumToWin;

		const playerResultInfo = this.makeResultInfo(diceResult);
		this.notify(playerResultInfo);
	}

	/** Get dice results. */
	public getDiceResults(): number[] {
		return [...this.diceResults];
	}

	private makeResultInfo(diceResult: number): PlayerStateInfo {
		return {
			playerIndex: this.playerIndex,
			diceResult,
			isWinner: this.isWinner,
		};
	}
}
