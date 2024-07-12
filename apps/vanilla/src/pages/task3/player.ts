import { PlayerTurnResult } from './interfaces/playerTurnResult';
import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';

/** Represents whether there is a winner or not. */
type IsWinner = {

	/**
	 * @property {boolean} isWinner - Contains winner status.
	 */
	readonly isWinner: boolean;
};

/** Represents current player state. */
export type PlayerStateInfo = PlayerTurnResult & IsWinner;

/** Represents a player. */
export class Player implements Subscriber<PlayerTurnResult>, Publisher<PlayerStateInfo> {
	private diceResults: number[] = [];

	private isWinner = false;

	/**
	 * @property {Set<Subscriber<PlayerStateInfo>>} subscribers - Contains subscribers.
	 */
	public subscribers: Set<Subscriber<PlayerStateInfo>> = new Set<Subscriber<PlayerStateInfo>>();

	public constructor(public readonly playerIndex: number) {}

	/**
	 * @param s - Subscriber which want to subscribe.
	 */
	public subscribe(s: Subscriber<PlayerStateInfo>): void {
		this.subscribers.add(s);
	}

	/**
	 * @param s - Subscriber which want to unsubscribe.
	 */
	public unsubscribe(s: Subscriber<PlayerStateInfo>): void {
		this.subscribers.delete(s);
	}

	/**
	 * @param message - The message to notify with.
	 */
	public notify(message: PlayerStateInfo): void {
		this.subscribers.forEach((s: Subscriber<PlayerStateInfo>) => s.update(message));
	}

	/**
	 * @param message - The message to update with.
	 */
	public update(message: PlayerTurnResult): void {
		const { playerIndex, diceResult } = message;
		if (this.playerIndex !== playerIndex) {
			return;
		}
		this.diceResults.push(diceResult);
		const totalPoints: number = this.diceResults.reduce((a, b) => a + b, 0);
		this.isWinner = totalPoints >= 21;

		const playerResultInfo: PlayerStateInfo = this.makeResultInfo(diceResult);
		this.notify(playerResultInfo);
	}

	/** Function to get dice results. */
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
