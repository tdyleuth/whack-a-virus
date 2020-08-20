let gameState =  {
  player: 'Player',
  playerLives: 3,
  gameDifficulty: 'normal',
  score: 0,
  timeLeft: 60
}

const container = $('.grid-container');
const virus = $('.virus');
const human = $('.human');
const timer = $('#time-left');


//RENDERS INITIAL ELEMENTS
function renderState() {
  container.empty();

  //ADDS CELLS TO GRID CONTAINER
  for(let index = 0; index < 9; index = index + 1) {

    const addCells = $('<div class ="cell"></div>');
    container.append(addCells);

  }

  // ADDS NUMBERED ID TO EACH DIV IN GRID CONTAINER
  let addID = $('.grid-container div');
  addID.attr('id', function (index) {
  return  + index;
   });

  //ADD TEXT TO H3 ELEMENT
   $('.difficulty-name').text("Choose: Difficulty")
  

addDifficulty();
addUserForm();
addStartButton();
gameUpdates();

}

renderState();


//TIMER THAT COUNDOWNS TO ZERO AND ENDS GAME 
function countDownTimer(){
 
  let currentTime = gameState.timeLeft - 1;
  gameState.timeLeft = currentTime;;

  timer.text(currentTime);

  
   if (gameState.timeLeft === 0){
    alert(`Times up! ${gameState.player} You scored ${gameState.score} points!`);
    gameOver();
   }
 
  }

// UPDATES PLAYER NAME
function updatePlayerName() {
  $('#player-name').text(gameState.player);
}

//UPDATES PLAYER SCORE
function updateScore (){

  $('#player-score').text(gameState.score);  
  
}


function updateLives(){
  $('#player-lives').text(gameState.playerLives)
  if (gameState.playerLives === 0){
  alert(`GAMEOVER! ${gameState.player} You scored ${gameState.score} points!`)
  gameOver();
  }
}

function updateTime (){
  timer.text(gameState.timeLeft)
}

//GENERATES RANDOM VIRUS
function randomVirus(){
  let random = (Math.floor(Math.random()*9));
  let randomCell = "#" + random;
  let s = $(randomCell).toggleClass("virus"); 
}

//GENERATES RANDOM HUMAN
function randomHuman(){
    let random = (Math.floor(Math.random()*9));
    let randomCell = "#" + random;
    $(randomCell).toggleClass("human")
}


function removeExplosion() {
  $('.explosion').removeClass("explosion")
}

function removeSadFace() {
  $('.sad-face').removeClass("sad-face")
}

//SOUND EFFECTS WHEN CLICKING HUMAN OR VIRUS
function explosionSoundEffect() {
  new Audio('./sounds/explosion.mp3').play();
}

function HumanSoundEffect() {
  new Audio('./sounds/scream.mp3').play();
}

//ADDS POINTS AND REMOVES PLAYER LIVES
$('.grid-container').on('click', '.cell', function(){
  
  let cell = $(this)
  if (cell.hasClass("virus")){
  cell.removeClass("virus");
  cell.addClass("explosion");
  explosionSoundEffect();
  setTimeout(removeExplosion, 500);

  newScore = gameState.score + 1;
  gameState.score = newScore;
  }
  updateScore()

  if (cell.hasClass("human")){
  cell.removeClass("human");
  cell.addClass("sad-face");
  HumanSoundEffect();
  setTimeout(removeSadFace, 500);

  livesLeft = gameState.playerLives - 1;
  gameState.playerLives = livesLeft; 
  updateLives();
  }
   
})


//SETS INTERVAL CALLS FOR RAMDOMVIRUS, RANDOMHUMAN FUNCTIONS, COUNTDOWNTIMER 

function startGame() {
  if(gameState.gameDifficulty === 'easy')
  {
    easyMode();
  } 
  if(gameState.gameDifficulty ==='normal'){
    normalMode();
  }

  if(gameState.gameDifficulty ==='hard'){
    hardMode();
  }

}

function defaultGameState() {
  
  gameState = {
    gameDifficulty: 'normal',
    player:'Player',
    playerLives: 3,
    score: 0,
    timeLeft: 60
 }  
}
  

function gameOver(){

  clearInterval(intervalHuman);
  clearInterval(intervalVirus);
  clearInterval(intervalTimer);
  defaultGameState();
  renderState(); 
 
}

function userName(){
  let userInput = $('#playerName').val();
  if (userInput === ''){
    gameState.player = "Player";
  } else {
  gameState.player = userInput;
  }
  updatePlayerName();
  
  
}

let intervalVirus;
let intervalHuman;
let intervalTimer;

function easyMode(){

  intervalVirus = setInterval(randomVirus,1000);
  intervalHuman = setInterval(randomHuman,1000);
  intervalTimer = setInterval(countDownTimer,1000);

}

function normalMode(){

  intervalVirus = setInterval(randomVirus,500);
  intervalHuman = setInterval(randomHuman,500);
  intervalTimer = setInterval(countDownTimer,1000);

}

function hardMode(){

  intervalVirus = setInterval(randomVirus,250);
  intervalHuman = setInterval(randomHuman,250);
  intervalTimer = setInterval(countDownTimer,1000);

}


//ADD GAME DIFFICULTY BUTTONS
function addDifficulty() {
$('.difficulty-container').html('<button class="easy">Easy</button><button class="normal">Normal</button><button class="hard">Hard</button>')
}

//ADD USER INPUT FORM
function addUserForm(){
  $('.player-form').html('<input type="text" name="player-name" id ="playerName" placeholder="Enter Player Name">');
}

//ADD RESET BUTTON
function addResetButton () {
  $('.button-container').html('<button class ="reset-button">Reset</button>');
}
//ADD START BUTTON
function addStartButton() {
  $('.button-container').html('<button class ="start-button">Start</button>');

}

//START BUTTON CLICK HANDLER
$(".button-container").on('click','.start-button', function(){
  userName();
  startGame();
  $('.start-button').remove();
  $('.player-form input').remove()
  $('.easy').remove();
  $('.normal').remove();
  $('.hard').remove();

  if(gameState.gameDifficulty==='easy'){
  $('.difficulty-name').text('Difficulty: Easy');
  }

  if(gameState.gameDifficulty==='normal'){
    $('.difficulty-name').text('Difficulty: Normal');
  }
  if(gameState.gameDifficulty==='hard'){
   $('.difficulty-name').text('Difficulty: Hard');
  }

  addResetButton();

})

//RESET BUTTON CLICK HANDLER
$(".button-container").on('click', '.reset-button', function(){
  gameOver()

})

//SET DIFFICULTY WHEN CLICKED

$('.difficulty-container').on('click','.easy', function(){
  gameState.gameDifficulty = 'easy';
  $('.difficulty-name').text('Difficulty: Easy');

})

$('.difficulty-container').on('click','.normal', function(){
  gameState.gameDifficulty = 'normal';
  $('.difficulty-name').text('Difficulty: Normal');
})

$('.difficulty-container').on('click','.hard', function(){
  gameState.gameDifficulty = 'hard';
  $('.difficulty-name').text('Difficulty: Hard');
})

function gameUpdates(){
 updatePlayerName();  
 updateScore();
 updateLives();
 updateTime();

}


