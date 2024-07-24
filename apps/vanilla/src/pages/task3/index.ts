import { Game } from './game';
import { Player } from './player';
import { ResultDisplayHandler } from './resultDisplayHandler';

const game = new Game();
const player1 = new Player(0);
const player2 = new Player(1);
const resultDisplayHandler = new ResultDisplayHandler();

game.addPlayers([player1, player2]);

game.start();
game.subscribe(resultDisplayHandler);

/** Handles click on roll dice button. */
function onClickRollButton(): void {
	game.makeMove();
}

const rollDiceButton = document.querySelector('.roll-button');
rollDiceButton?.addEventListener('click', onClickRollButton);
