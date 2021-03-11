// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign minimum and maximum
minNum.textContent = min;
maxNum.textContent = max;

// Listen for play again
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess submission
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate the input
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if right number
  if(guess === winningNum) {
    gameOver(true, `Congratulations! You have won! ${winningNum} is the number! You had ${guessesLeft} ${guessMessage(guessesLeft)} remaining!`)
  } else {
    guessesLeft -= 1;
    if(guessesLeft === 0) {
      gameOver(false, `Game over man! The correct number was ${winningNum}`)
    } else {
      if(guess < winningNum) {
        guessInput.style.borderColor = 'red';
        guessInput.value = '';
        setMessage(`Your guess, ${guess} is lower than the winning number. You have ${guessesLeft} ${guessMessage(guessesLeft)} left`, 'red');
      } else {
        guessInput.style.borderColor = 'red';
        guessInput.value = '';
        setMessage(`Your guess, ${guess} is higher than the winning number. You have ${guessesLeft} ${guessMessage(guessesLeft)} left`, 'red');
      }
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min);
}

function guessMessage(guessesLeft) {
    let guessMessage;
    guessesLeft === 1 ? guessMessage = 'guess' : guessMessage = 'guesses';
    return guessMessage;
}