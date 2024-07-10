import { DiceGenerator } from './diceGenerator';

const diceGenerator = new DiceGenerator();

/** Function that handles click on roll dice button. */
function onClickRollButton(): void {
	const res = diceGenerator.roll();
	// eslint-disable-next-line no-console
	console.log(res);
}

const rollDiceButton = document.querySelector('.roll-button');
rollDiceButton?.addEventListener('click', onClickRollButton);
