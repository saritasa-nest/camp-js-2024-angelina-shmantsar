import { GameStateInfo } from './game';
import { Subscriber } from './interfaces/subscriber';

/** Represents a UI handler. */
export class ResultDisplayHandler implements Subscriber<GameStateInfo> {
	private readonly diceCapContainer = document.querySelector<HTMLElement>('.dice-cap-container');

	private readonly generalSumContainer = document.querySelector<HTMLElement>('.general-sum');

	private readonly firstContainer = document.querySelector<HTMLElement>('.container1');

	private readonly firstSumContainer = document.querySelector<HTMLElement>('.sum1');

	private readonly secondContainer = document.querySelector<HTMLElement>('.container2');

	private readonly secondSumContainer = document.querySelector<HTMLElement>('.sum2');

	/** @inheritdoc */
	public update(message: GameStateInfo): void {
		const { winner, rolls, players } = message;
		if (winner) {
			this.colorWinnerField(winner.playerIndex);
		}
		this.updateField(rolls, this.diceCapContainer);
		players
			.forEach(player =>
				this.updateField(player.getDiceResults(), player.playerIndex === 0 ? this.firstContainer : this.secondContainer));
	}

	private updateField(diceResults: readonly number[], field: HTMLElement | null): void {
		if (field) {
			field.innerText = diceResults.join(' ');

			const resultsSum = diceResults.reduce((a, b) => a + b, 0);
			if (field === this.diceCapContainer) {
				this.updateSum(resultsSum, this.generalSumContainer);
			} else if (field === this.firstContainer) {
				this.updateSum(resultsSum, this.firstSumContainer);
			} else {
				this.updateSum(resultsSum, this.secondSumContainer);
			}
		}
	}

	private updateSum(sum: number, field: HTMLElement | null): void {
		if (field) {
			field.innerText = String(sum);
		}
	}

	private colorWinnerField(playerIndex: number): void {
		const winnerContainer = playerIndex === 0 ? this.firstContainer : this.secondContainer;
		const parentElement = winnerContainer?.parentElement;
		if (parentElement) {
			parentElement.classList.add('winner');
		}
	}
}
