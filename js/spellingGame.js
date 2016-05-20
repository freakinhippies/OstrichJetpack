var wordRow = document.getElementById("word-row"); // Div that displays the word
var currentWord; // Current word to find
var wordList = ["MARS", "STAR", "SHIP", "HALO", "MOON"]; // Array of words to find
var wordLength; // Length of the word to find
var letterCount = 0; // Current letter position to find

/**
 * Draw a random word at the top to collect.
 */
function drawWord() {
  var randomIndex = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIndex];
  wordLength = currentWord.length;
  for (var i = 0; i < wordLength; i++) {
    wordRow.insertCell(0);
  }
  for (var i = 0; i < wordLength; i++) {
    wordRow.cells[i].innerHTML = currentWord.charAt(i);
  }
}

/**
 * Clears cells in word row.
 */
function clearWord() {
  wordRow.innerHTML = "";
}

function letterCollision(character) {
  if(character == currentWord.charAt(letterCount)) {
    if (letterCount != wordLength) {
      if (!muteSound) {
        createjs.Sound.play("correctElementSound");
      }
    }
    currentScore += 100 * scoreMult;
    document.getElementById("score-counter").innerHTML = "" + currentScore;
    wordRow.cells[letterCount].style = "color: #FFFFFF";
    letterCount++;

    if(letterCount == wordLength) {
      letterCount = 0;
      currentScore += 500 * scoreMult;
      if (!muteSound) {
        createjs.Sound.play("correctWord");
      }
      document.getElementById("score-counter").innerHTML = "" + currentScore;
      clearWord();
      drawWord();
    }
  } else {
    currentLives--;
    if (currentLives != 0) {
      if (!muteSound) {
        createjs.Sound.play("wrongElementSound");
      }
    }
    updateLives();
    // Determines if you lost the game or not
    if (currentLives == 0) {
      if (!muteSound) {
        createjs.Sound.play("gameOverSound");
      }
      gameOver();
    }
  }
}


window.onload = drawWord();