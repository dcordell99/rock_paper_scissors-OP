const beginGame = () => {
	const playerChoices = document.querySelectorAll('.btn-choice'); 
	let round = 0;
	let playerWins = 0
	let computerWins = 0
	let ties = 0;

	playerChoices.forEach(choice => {
		choice.addEventListener('click', (e) => { 
			if (round > 4) {
				if (confirm('Game is over, restart')) {
					location.reload()
				} else {
					return;
				}
			}
			round++;
			let playerGuess = e.target.getAttribute('id');
			let computerGuess = computerPlay();
			let roundWinner = playRound(playerGuess, computerGuess);

			if (roundWinner === 'tie') {
				ties++;
			} else if (roundWinner && roundWinner !== 'tie') {
				playerWins++;
				document.querySelector('.player-wins').textContent = playerWins.toString();
			} else if (!roundWinner) {
				computerWins++;
				document.querySelector('.computer-wins').textContent = computerWins.toString();
			}

			if (round == 5 || playerWins == 3 || computerWins == 3) {
				let showWinner = document.querySelector('#game_won');

				playerChoices.forEach(button => { 
					button.classList.add('btn-game_over');
				});

				if (playerWins > computerWins) {
					showWinner.textContent = `You won the game!!!`;
				} else if (computerWins > playerWins) {
					showWinner.textContent = `You lost! Better luck next time!`;
				} else {
					showWinner.textContent = `Close call, but it looks like it was a tie this time!`;
				}
			}
		})
	})
}

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

function playRound(playerSelection, computerSelection) {
	let gameResult = false;
	let roundWinner = document.querySelector('#round_won')
	playerSelection =
		playerSelection.substr(0, 1).toUpperCase() + playerSelection.substr(1);
	computerSelection =
		computerSelection.substr(0, 1).toUpperCase() + computerSelection.substr(1);

	(playerSelection === 'Rock' && computerSelection === 'Scissors') ||
	(playerSelection === 'Scissors' && computerSelection === 'Paper') ||
	(playerSelection === 'Paper' && computerSelection === 'Rock')
		? (roundWinner.innerHTML = `You win! <span style="text-decoration: underline;">${playerSelection}</span> beats ${computerSelection}.`,
			(gameResult = true),
			(roundWinner.style.color = 'green'))
		: (playerSelection === 'Rock' && computerSelection === 'Paper') ||
			(playerSelection === 'Scissors' && computerSelection === 'Rock') ||
			(playerSelection === 'Paper' && computerSelection === 'Scissors')
			? (roundWinner.innerHTML = `You lose! <span style="text-decoration: underline;">${computerSelection}</span> beats ${playerSelection}.`,
				(roundWinner.style.color = 'red'))
			: (roundWinner.innerHTML = 
					`Tie! ${playerSelection} and ${computerSelection} are the same!`,
					(roundWinner.style.color = 'black'),
					(gameResult = 'tie'))

	return gameResult;
}

let newGameBtn = document.querySelector('.btn-new_game');
newGameBtn.addEventListener('click', beginGame);

beginGame();