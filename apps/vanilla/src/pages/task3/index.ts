import { Game } from './game';
import { Player } from './player';

const game = new Game();
const player1 = new Player(0);
const player2 = new Player(1);

game.addPlayer(player1);
game.addPlayer(player2);

game.start();

/** Function that handles click on roll dice button. */
function onClickRollButton(): void {
	game.makeMove();
}

const rollDiceButton = document.querySelector('.roll-button');
rollDiceButton?.addEventListener('click', onClickRollButton);
