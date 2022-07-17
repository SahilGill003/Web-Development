const buttonColours = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var num = 0;

var gameStart = false;

function animatePress(animc) {
  $("." + animc).addClass("pressed");

  setTimeout(function () {
    $("." + animc).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var snd = new Audio(`./sounds/${name}.wav`);
  snd.play();
}

if (gameStart == false) {
  $(document).keydown(function () {
    $("h1").text("Level 0");
    nextSequence();
    gameStart = true;
  });
}

function flash(flashB) {
  setInterval(function () {
    $("#" + flashB).fadeOut(100);
    $("#" + flashB).fadeIn(100);
  }, 1000);
}

$(".box").on("click", function (event) {
  var userChosenColour = event.target.id;
  playSound(buttonColours[userChosenColour]);
  animatePress(buttonColours[userChosenColour]);
  flash(buttonColours[userChosenColour]);
  userClickedPattern.push(buttonColours[userChosenColour]);
  checkAnswer(userClickedPattern.length - 1);
  console.log("My pattern ");
  console.log(userClickedPattern);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Right");
    if (gamePattern.length == userClickedPattern.length) nextSequence();
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 2000);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + num);

  // console.log(num);

  var i = Math.floor(Math.random() * 3);
  var randomChosenColour = buttonColours[i];

  gamePattern.push(randomChosenColour);

  setTimeout(() => {
    playSound(randomChosenColour);
    $("." + randomChosenColour)
      .fadeOut(100)
      .fadeIn(100);
  }, 1000);

  // console.log(gamePattern);
  num++;
}

function startOver() {
  num = 1;
  userClickedPattern = [];
  gameStart = false;
  gamePattern = [];
}
