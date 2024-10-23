var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[]
userClickedPattern=[];

var level=0;
var started=false;

$(document).on("keypress",function(){
  $("#level-title").text("Level "+level);
  nextSequence();
  started=true
});


$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});



function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
   setTimeout(function () {
     nextSequence();
   }, 1000);

 }
  }
  else{
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){
  var audio = new Audio('sounds/'+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
