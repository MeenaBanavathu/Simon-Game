//Arrays
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level =0;

//Game starts by clicking any key for first time
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

//user choices
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  //array created by user
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key To Restart");
      startOver();
    }
  }

//Comp generated seq
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //flash the selected button
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//once the game is over, start again.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
