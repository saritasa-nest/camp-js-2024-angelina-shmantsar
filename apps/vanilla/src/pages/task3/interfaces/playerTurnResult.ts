/** Represents result of one dice roll. */
export type PlayerTurnResult = {

	/**
	 * @property {number} playerIndex - Contains current player index.
	 */
	playerIndex: number;

	/**
	 * @property {number} diceResult - Contains current dice result.
	 */
	diceResult: number;
};
