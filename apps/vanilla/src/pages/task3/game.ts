import { DiceGenerator } from './diceGenerator';
import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';
import { Player, PlayerResultInfo } from './player';

/** Type representing. */
export type GameResultInfo = {

	/**  Property representing a winner. */
	winner: Player | null;

	/**  Property representing dice results. */
	rolls: number[];

	/**  Property representing players. */
	players: Player[];
};

/** Class representing game. */
export class Game implements Subscriber<PlayerResultInfo>, Publisher<GameResultInfo> {
	/**  Property representing a list of subscribers. */
	public subscribers: Set<Subscriber<GameResultInfo>> = new Set<Subscriber<GameResultInfo>>();

	private players: Player[] = [];

	private winner: Player | null = null;

	private rolls: number[] = [];

	private diceGenerator: DiceGenerator = new DiceGenerator();

	/**
	 * @param player - The player.
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
	 * @param s - The subscriber.
	 */
	public subscribe(s: Subscriber<GameResultInfo>): void {
		this.subscribers.add(s);
	}

	/**
	 * @param s - The subscriber.
	 */
	public unsubscribe(s: Subscriber<GameResultInfo>): void {
		this.subscribers.delete(s);
	}

	/**
	 * @param message - The message.
	 */
	public notify(message: GameResultInfo): void {
		this.subscribers.forEach((s: Subscriber<GameResultInfo>) => s.update(message));
	}

	/**
	 * @param message - The message.
	 */
	public update(message: PlayerResultInfo): void {
		const { playerIndex, diceResult, isWinner } = message;
		this.rolls.push(diceResult);
		if (isWinner) {
			this.winner = this.players.at(playerIndex) ?? null;
		}
		const gameResultInfo: GameResultInfo = {
			winner: this.winner,
			rolls: this.rolls,
			players: this.players,
		};
		this.notify(gameResultInfo);
	}
}
