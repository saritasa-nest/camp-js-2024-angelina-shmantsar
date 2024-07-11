import { DiceGenerator } from './diceGenerator';
import { TurnGenerator } from './turnGenerator';

const diceGenerator = new DiceGenerator();
const turnGenerator = new TurnGenerator(2, 0);
turnGenerator.subscribe(diceGenerator);

/** Function that handles click on roll dice button. */
function onClickRollButton(): void {
	turnGenerator.next();
	diceGenerator.roll();
}

const rollDiceButton = document.querySelector('.roll-button');
rollDiceButton?.addEventListener('click', onClickRollButton);
