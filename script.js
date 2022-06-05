const computerPlay = () => {
	let guess;
	let randomNumber = Math.floor(Math.random() * 3) + 1;

	if (randomNumber === 1) {
		guess = 'rock';
	} else if (randomNumber === 2) {
		guess = 'paper';
	} else {
		guess = 'scissors';
	}
	return guess;
};

const playerGuess = () => {
	let guess;
	let isWrongAnswer = true;
	while (isWrongAnswer) {
		guess = prompt('Rock, paper or scissors?').toLowerCase();
		if (guess === 'rock' || guess === 'paper' || guess === 'scissors') {
			isWrongAnswer = false;
		} else {
			alert(
				'Incorrect Response. Correct guesses are "rock", "paper" or "scissors".'
			);
		}
	}
	return guess;
};

function playRound(playerSelection, computerSelection) {
	let gameResult;
	playerSelection =
		playerSelection.substr(0, 1).toUpperCase() + playerSelection.substr(1);
	computerSelection =
		computerSelection.substr(0, 1).toUpperCase() + computerSelection.substr(1);

	(playerSelection === 'Rock' && computerSelection === 'Scissors') ||
	(playerSelection === 'Scissors' && computerSelection === 'Paper') ||
	(playerSelection === 'Paper' && computerSelection === 'Rock')
		? (console.log(`You win! ${playerSelection} beats ${computerSelection}.`),
			(gameResult = true))
		: (playerSelection === 'Rock' && computerSelection === 'Paper') ||
			(playerSelection === 'Scissors' && computerSelection === 'Rock') ||
			(playerSelection === 'Paper' && computerSelection === 'Scissors')
			? (console.log(
					`You lose! ${computerSelection} beats ${playerSelection}.`
				),
				(gameResult = false))
			: (console.log(
					`Tie! ${playerSelection} and ${computerSelection} are the same!`
				),
				(gameResult = 'tie'));

	return gameResult;
}

function game() {
	let playerWins = 0;
	let computerWins = 0;
	let ties = 0;

	for (let i = 0; i < 5; i++) {
		let round = playRound(playerGuess(), computerPlay());
		if (round === 'tie') {
			ties++;
		} else if (round && round !== 'tie') {
			playerWins++;
		} else if (!round) {
			computerWins++;
		}
	}

	let message = `You won ${playerWins} rounds.\nThe computer won ${computerWins} rounds.\nThere were ${ties} ties.\n`;
	if (playerWins > computerWins) {
		return message + `You won the game!!!`;
	} else if (computerWins > playerWins) {
		return message + `You lost! Better luck next time!`;
	} else {
		return message + `Close call, but it looks like it was a tie this time!`;
	}
}
