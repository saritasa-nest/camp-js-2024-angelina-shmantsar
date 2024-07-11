import { DiceGenerator } from './diceGenerator';
import { Player } from './player';
import { TurnGenerator } from './turnGenerator';

const diceGenerator = new DiceGenerator();
const turnGenerator = new TurnGenerator(2, 0);
const player1 = new Player(0);
const player2 = new Player(1);

turnGenerator.subscribe(diceGenerator);
diceGenerator.subscribe(player1);
diceGenerator.subscribe(player2);

/** Function that handles click on roll dice button. */
function onClickRollButton(): void {
	turnGenerator.next();
	diceGenerator.roll();
}

const rollDiceButton = document.querySelector('.roll-button');
rollDiceButton?.addEventListener('click', onClickRollButton);
