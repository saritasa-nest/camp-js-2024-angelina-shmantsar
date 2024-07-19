import { DiceGenerator } from './diceGenerator';
import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';
import { Player, PlayerStateInfo } from './player';

/** Represents current game state. */
export type GameStateInfo = {

	/** Contains winner. */
	readonly winner: Player | null;

	/** Contains all dice results. */
	rolls: number[];

	/** Contains players. */
	readonly players: readonly Player[];
};

/** Represents a game. */
export class Game implements Subscriber<PlayerStateInfo>, Publisher<GameStateInfo> {
	/** @inheritdoc */
	public subscribers = new Set<Subscriber<GameStateInfo>>();

	private players: Player[] = [];

	private winner: Player | null = null;

	private rolls: number[] = [];

	private readonly diceGenerator = new DiceGenerator();

	/**
	 * Add new player to game.
	 * @param player - Player which want to join the game.
	 */
	public addPlayer(player: Player): void {
		if (!this.players.includes(player)) {
			this.players.push(player);
		}
		this.diceGenerator.subscribe(player);
	}

	/** Start the game. */
	public start(): void {
		this.players.forEach(player => player.subscribe(this));
	}

	/** Make one move. */
	public makeMove(): void {
		if (!this.winner) {
			this.diceGenerator.roll();
		}
	}

	/** @inheritdoc */
	public subscribe(subscriber: Subscriber<GameStateInfo>): void {
		this.subscribers.add(subscriber);
	}

	/** @inheritdoc */
	public unsubscribe(subscriber: Subscriber<GameStateInfo>): void {
		this.subscribers.delete(subscriber);
	}

	/** @inheritdoc */
	public notify(message: GameStateInfo): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}

	/** @inheritdoc */
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
