import { DiceGenerator } from './diceGenerator';
import { Player } from './player';

/** Class representing game. */
export class Game {
	public constructor(
		private readonly player1: Player = new Player(),
		private readonly player2: Player = new Player(),
		private readonly currentPlayer: Player = new Player(),
		private readonly winner: Player | null = null,
		private readonly diceGenerator: DiceGenerator = new DiceGenerator(),
		private readonly rolls: number[] = [],
	) {}

	/** Function which start the game. */
	public start(): void {
		while (!this.winner) {
			this.diceGenerator.roll();
		}
	}
}
