import { DiceGenerator } from './diceGenerator';
import { Publisher } from './interfaces/publisher';
import { Subscriber } from './interfaces/subscriber';
import { Player, PlayerStateInfo } from './player';

/** Represents current game state. */
export type GameStateInfo = {

	/** Contains winner. */
	readonly winner: Player | null;

	/** Contains all dice results. */
	readonly rolls: number[];

	/** Contains players. */
	readonly players: readonly Player[];
};

/** Represents a game. */
export class Game extends Publisher<GameStateInfo> implements Subscriber<PlayerStateInfo> {
	private readonly players: Player[] = [];

	private winner: Player | null = null;

	private readonly rolls: number[] = [];

	private readonly diceGenerator = new DiceGenerator();

	/**
	 * Add new player to game.
	 * @param players - Players which want to join the game.
	 */
	public addPlayers(players: readonly Player[]): void {
		for (const player of players) {
			if (!this.players.includes(player)) {
				this.players.push(player);
			}
			this.diceGenerator.subscribe(player);
		}
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
