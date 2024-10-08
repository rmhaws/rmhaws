let playerSelection = '';
let wins = 0;
let losses = 0;
let ties = 0;

// Function to start the game
function playerChoice(choice) {
    playerSelection = choice;
    
    // Highlight player's choice
    document.querySelectorAll('.choices img').forEach(img => {
        img.classList.remove('highlighted');
    });
    document.getElementById(choice).classList.add('highlighted');

    computerThrow();
}

// Function to simulate the computer's random throw with shuffling effect
function computerThrow() {
    const choices = ['rock', 'paper', 'scissors'];
    const imagePaths = {
        rock: 'images/rock.PNG',
        paper: 'images/paper.PNG',
        scissors: 'images/scissors.PNG'
    };
    const computerChoiceElement = document.getElementById('computer-choice');
    
    // Shuffle images every half second
    let shuffleIndex = 0;
    let shuffleInterval = setInterval(() => {
        const currentChoice = choices[shuffleIndex];
        computerChoiceElement.src = imagePaths[currentChoice];
        shuffleIndex = (shuffleIndex + 1) % choices.length;
    }, 500);
    
    // Stop shuffling after 3 seconds and select a random final throw
    setTimeout(() => {
        clearInterval(shuffleInterval);
        const finalChoice = choices[Math.floor(Math.random() * 3)];
        computerChoiceElement.src = imagePaths[finalChoice];
        decideWinner(finalChoice);
    }, 3000);
}

// Function to decide the winner
function decideWinner(computerSelection) {
    let result = '';
    if (playerSelection === computerSelection) {
        result = "It's a tie!";
        ties++;
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        result = 'You win!';
        wins++;
    } else {
        result = 'Computer wins!';
        losses++;
    }
    
    // Update the result text
    document.getElementById('result-text').textContent = result;
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('ties').textContent = ties;
}

// Function to reset the game
function resetGame() {
    document.getElementById('computer-choice').src = 'images/question-mark.PNG'; // Reset to question mark
    document.getElementById('result-text').textContent = 'Waiting for your move...';
    document.querySelectorAll('.choices img').forEach(img => {
        img.classList.remove('highlighted');
    });
    playerSelection = '';
}

// Function to reset the score
function resetScore() {
    wins = 0;
    losses = 0;
    ties = 0;
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('ties').textContent = ties;
    resetGame();
}
