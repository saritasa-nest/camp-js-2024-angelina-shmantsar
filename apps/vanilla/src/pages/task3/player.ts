import { PlayerTurnResult } from './interfaces/playerTurnResult';
import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';

/** Type. */
type IsWinner = {

	/**  Property representing a winner status. */
	isWinner: boolean;
};

/** Type representing. */
export type PlayerResultInfo = PlayerTurnResult & IsWinner;

/** Class representing a player. */
export class Player implements Subscriber<PlayerTurnResult>, Publisher<PlayerResultInfo> {
	private diceResults: number[] = [];

	private isWinner = false;

	/** Property representing a list of subscribers. */
	public subscribers: Set<Subscriber<PlayerResultInfo>> = new Set<Subscriber<PlayerResultInfo>>();

	public constructor(private readonly playerIndex: number) {}

	/**
	 * @param s - The subscriber.
	 */
	public subscribe(s: Subscriber<PlayerResultInfo>): void {
		this.subscribers.add(s);
	}

	/**
	 * @param s - The subscriber.
	 */
	public unsubscribe(s: Subscriber<PlayerResultInfo>): void {
		this.subscribers.delete(s);
	}

	/**
	 * @param message - The message.
	 */
	public notify(message: PlayerResultInfo): void {
		// eslint-disable-next-line no-console
		console.log(message);
		this.subscribers.forEach((s: Subscriber<PlayerResultInfo>) => s.update(message));
	}

	/**
	 * @param message - The message.
	 */
	public update(message: PlayerTurnResult): void {
		const { playerIndex, diceResult } = message;
		if (this.playerIndex !== playerIndex) {
			return;
		}
		this.diceResults.push(diceResult);
		const totalPoints: number = this.diceResults.reduce((a, b) => a + b, 0);
		this.isWinner = totalPoints >= 21;

		const playerResultInfo: PlayerResultInfo = this.makeResultInfo(diceResult);
		this.notify(playerResultInfo);
	}

	private makeResultInfo(diceResult: number): PlayerResultInfo {
		return {
			playerIndex: this.playerIndex,
			diceResult,
			isWinner: this.isWinner,
		};
	}
}
