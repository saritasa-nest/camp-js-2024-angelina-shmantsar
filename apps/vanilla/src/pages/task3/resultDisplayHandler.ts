import { GameResultInfo } from './game';
import { Subscriber } from './interfaces/subscriber';
import { Player } from './player';

/** Class which represents a UI handler. */
export class ResultDisplayHandler implements Subscriber<GameResultInfo> {
	private diceCapContainer: HTMLElement | null = document.querySelector('.dice-cap-container');

	private firstContainer: HTMLElement | null = document.querySelector('.container1');

	private secondContainer: HTMLElement | null = document.querySelector('.container2');

	/**
	 * @param message - The message.
	 */
	public update(message: GameResultInfo): void {
		const { winner, rolls, players } = message;
		if (winner) {
			this.colorWinnerField(winner.playerIndex);
		}
		this.updateField(rolls, this.diceCapContainer);
		players
			.forEach((p: Player) => this.updateField(p.getDiceResults(), p.playerIndex === 0 ? this.firstContainer : this.secondContainer));
	}

	private updateField(diceResults: number[], field: HTMLElement | null): void {
		if (field) {
			field.innerText = diceResults.join(' ');
		}
	}

	private colorWinnerField(playerIndex: number): void {
		const winnerContainer = playerIndex === 0 ? this.firstContainer : this.secondContainer;
		const parentElement = winnerContainer?.parentElement;
		if (parentElement) {
			parentElement.style.backgroundColor = 'rgb(255,204,204)';
		}
	}
}
