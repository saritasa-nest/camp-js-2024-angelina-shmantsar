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
export class Player implements Subscriber<PlayerTurnResult>, Publisher<PlayerStateInfo> {
	private diceResults: number[] = [];

	private isWinner = false;

	/** @inheritdoc */
	public subscribers: Set<Subscriber<PlayerStateInfo>> = new Set<Subscriber<PlayerStateInfo>>();

	public constructor(public readonly playerIndex: number) {}

	/** @inheritdoc */
	public subscribe(subscriber: Subscriber<PlayerStateInfo>): void {
		this.subscribers.add(subscriber);
	}

	/** @inheritdoc */
	public unsubscribe(subscriber: Subscriber<PlayerStateInfo>): void {
		this.subscribers.delete(subscriber);
	}

	/** @inheritdoc */
	public notify(message: PlayerStateInfo): void {
		this.subscribers.forEach((subscriber: Subscriber<PlayerStateInfo>) => subscriber.update(message));
	}

	/** @inheritdoc */
	public update(message: PlayerTurnResult): void {
		const { playerIndex, diceResult } = message;
		if (this.playerIndex !== playerIndex) {
			return;
		}
		this.diceResults.push(diceResult);
		const totalPoints = this.diceResults.reduce((a, b) => a + b, 0);
		this.isWinner = totalPoints >= 21;

		const playerResultInfo: PlayerStateInfo = this.makeResultInfo(diceResult);
		this.notify(playerResultInfo);
	}

	/** Get dice results. */
	public getDiceResults(): number[] {
		return this.diceResults;
	}

	private makeResultInfo(diceResult: number): PlayerStateInfo {
		return {
			playerIndex: this.playerIndex,
			diceResult,
			isWinner: this.isWinner,
		};
	}
}
