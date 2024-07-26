/** Represents result of one dice roll. */
export type PlayerTurnResult = {

	/** Contains current player index. */
	readonly playerIndex: number;

	/** Contains current dice result. */
	readonly diceResult: number;
};
