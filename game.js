var gamePattern=[]; 
var userClickedPattern=[];
var level=0;
var started=false;
var buttonColours=["green","red","purple","white","blue","orange"];

$(document).keypress(function(){
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$("button").click(function()
{
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playAudio(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
$(".restart").click(function()
{
  $("h1").text("Game Restarted...Game will be started in 3 seconds!");
  startOver();
  setTimeout(()=>
  {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }

  },3000);
    
})

function checkAnswer(currentlevel)
{
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playAudio("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber=Math.floor((Math.random())*6);
    var randomChosencolour = buttonColours[randomNumber];
    gamePattern.push(randomChosencolour);
    $("#"+ randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosencolour);
   
   
}


function playAudio(randomChosencolour)
{
    var audio=new Audio("sounds/"+randomChosencolour+".mp3");
    audio.play();
}



function animatePress(currentColour)
{
 $("#" + currentColour).addClass("pressed");   
 setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver()
{
    level = 0;
  gamePattern = [];
  started = false;
}