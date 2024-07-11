import { DiceGenerator } from './diceGenerator';
import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';
import { Player, PlayerResultInfo } from './player';

/** Class representing game. */
export class Game implements Subscriber<PlayerResultInfo>, Publisher<Player | null> {
	/**  Property representing a list of subscribers. */
	public subscribers: Set<Subscriber<Player | null>> = new Set<Subscriber<Player | null>>();

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
		this.diceGenerator.roll();
	}

	/**
	 * @param s - The subscriber.
	 */
	public subscribe(s: Subscriber<Player | null>): void {
		this.subscribers.add(s);
	}

	/**
	 * @param s - The subscriber.
	 */
	public unsubscribe(s: Subscriber<Player | null>): void {
		this.subscribers.delete(s);
	}

	/**
	 * @param message - The message.
	 */
	public notify(message: Player | null): void {
		// eslint-disable-next-line no-console
		console.log(message);
		this.subscribers.forEach((s: Subscriber<Player | null>) => s.update(message));
	}

	/**
	 * @param message - The message.
	 */
	public update(message: PlayerResultInfo): void {
		// eslint-disable-next-line no-console
		console.log(message);
		const { playerIndex, diceResult, isWinner } = message;
		this.rolls.push(diceResult);
		if (isWinner) {
			this.winner = this.players.at(playerIndex) ?? null;
		}
		this.notify(this.winner);
	}
}
