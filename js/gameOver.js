$(document).ready(function () {
  /**
   * Calls the retryGame() function when the retry button is pressed.
   */
  $("#retry-button").click(function () {
    retryGame()
  });
});

/**
 * Ends the game, displays game over menu, and your final score.
 */
function gameOver() {
  paused = true;
  if (!muteSound) {
    createjs.Sound.stop("gameMusic");
  }
  canPause = false;
  document.getElementById("game-over").style.display = "block";
  document.getElementById("pause-menu-screen-darken").style.display = "block";
  document.getElementById("score").innerHTML = "Your final score was: " + currentScore;
}

/**
 * Restarts the game
 */
function retryGame() {
    if (!muteSound) {
      createjs.Sound.play("gameMusic", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
    }
  // Reset element positions
  for (var i = 0; i < elementAmount; i++) {
    newElement(i);
  }
  
  // Reset special item positions
  specialSpawned = false;
  specialSpawnTimer = Math.floor(Math.random() * 30000) + 60000; // Spawn 60 - 90 seconds after retry
    setTimeout(function () {
      specialSpawned = true;
      newSpecialItem();
    }, specialSpawnTimer);
  
  // Reset lives and score
  currentLives = 5;
  currentScore = 0;
  document.getElementById("score-counter").innerHTML = "" + currentScore;
  updateLives();
  
  // Clear and redraw word
  clearWord();
  drawWord();
  letterCount = 0;
  
  game.elementContext.clearRect(0, 0, game.elementCanvas.width, game.elementCanvas.height);9
  
  //Resumes the game
  document.getElementById("game-over").style.display = "none";
  canPause = true;
  resume();
}