import { DiceGenerator } from './diceGenerator';
import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';
import { Player, PlayerStateInfo } from './player';

/** Represents current game state. */
export type GameStateInfo = {

	/**
	 * @property {Player | null} winner - Contains winner.
	 */
	winner: Player | null;

	/**
	 * @property {number[]} rolls - Contains all dice results.
	 */
	rolls: number[];

	/**
	 * @property {Player[]} players - Contains players.
	 */
	players: Player[];
};

/** Represents a game. */
export class Game implements Subscriber<PlayerStateInfo>, Publisher<GameStateInfo> {
	/**
	 * @property {Set<Subscriber<GameStateInfo>>} subscribers - Contains subscribers.
	 */
	public subscribers: Set<Subscriber<GameStateInfo>> = new Set<Subscriber<GameStateInfo>>();

	private players: Player[] = [];

	private winner: Player | null = null;

	private rolls: number[] = [];

	private diceGenerator: DiceGenerator = new DiceGenerator();

	/**
	 * @param player - Player which want to join the game.
	 */
	public addPlayer(player: Player): void {
		if (!this.players.includes(player)) {
			this.players.push(player);
		}
		this.diceGenerator.subscribe(player);
	}

	/** Function which start the game. */
	public start(): void {
		this.players.forEach((p: Player) => p.subscribe(this));
	}

	/** Function which responsible for one move. */
	public makeMove(): void {
		if (!this.winner) {
			this.diceGenerator.roll();
		}
	}

	/**
	 * @param s - Subscriber which want to subscribe.
	 */
	public subscribe(s: Subscriber<GameStateInfo>): void {
		this.subscribers.add(s);
	}

	/**
	 * @param s - Subscriber which want to unsubscribe.
	 */
	public unsubscribe(s: Subscriber<GameStateInfo>): void {
		this.subscribers.delete(s);
	}

	/**
	 * @param message - The message to notify with.
	 */
	public notify(message: GameStateInfo): void {
		this.subscribers.forEach((s: Subscriber<GameStateInfo>) => s.update(message));
	}

	/**
	 * @param message - The message to update with.
	 */
	public update(message: PlayerStateInfo): void {
		const { playerIndex, diceResult, isWinner } = message;
		this.rolls.push(diceResult);
		if (isWinner) {
			this.winner = this.players.at(playerIndex) ?? null;
		}
		const gameResultInfo: GameStateInfo = {
			winner: this.winner,
			rolls: this.rolls,
			players: this.players,
		};
		this.notify(gameResultInfo);
	}
}
