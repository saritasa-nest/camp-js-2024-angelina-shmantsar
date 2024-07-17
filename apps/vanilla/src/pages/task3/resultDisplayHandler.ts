import { GameStateInfo } from './game';
import { Subscriber } from './interfaces/subscriber';
import { Player } from './player';

/** Represents a UI handler. */
export class ResultDisplayHandler implements Subscriber<GameStateInfo> {
	private readonly diceCapContainer: HTMLElement | null = document.querySelector('.dice-cap-container');

	private readonly generalSumContainer: HTMLElement | null = document.querySelector('.general-sum');

	private readonly firstContainer: HTMLElement | null = document.querySelector('.container1');

	private readonly firstSumContainer: HTMLElement | null = document.querySelector('.sum1');

	private readonly secondContainer: HTMLElement | null = document.querySelector('.container2');

	private readonly secondSumContainer: HTMLElement | null = document.querySelector('.sum2');

	/** @inheritdoc */
	public update(message: GameStateInfo): void {
		const { winner, rolls, players } = message;
		if (winner) {
			this.colorWinnerField(winner.playerIndex);
		}
		this.updateField(rolls, this.diceCapContainer);
		players
			.forEach((player: Player) =>
				this.updateField(player.getDiceResults(), player.playerIndex === 0 ? this.firstContainer : this.secondContainer));
	}

	private updateField(diceResults: readonly number[], field: HTMLElement | null): void {
		if (field) {
			field.innerText = diceResults.join(' ');

			const resultsSum = diceResults.reduce((a: number, b: number) => a + b, 0);
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
			parentElement.style.backgroundColor = 'rgb(255,204,204)';
		}
	}
}
