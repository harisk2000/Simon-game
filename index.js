var actualSequence = [];
var numberOfClick, levelNumber, randomNumber;
var colors = ['green', 'red', 'yellow', 'blue'];

// Sound and Animation function
function soundAndAnimation(color) {
  $("." + color).addClass("pressed");
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
  setTimeout(function() {
    $("." + color).removeClass("pressed");
  }, 100);
}

//Shows a Color from the four randomly
function randomColorSelector(){
  randomNumber = Math.floor((Math.random() * 4));
  actualSequence.push(randomNumber);
  var color = colors[randomNumber];
  soundAndAnimation(color);
}

//Stater function : Sound and Animation on keypress
function starter() {
  actualSequence = [];
  numberOfClick = 0;
  levelNumber = 1;
  $(document).one("keydown click", function() {
    $("h1").text("Level 1");
    randomColorSelector();

  });
}

//Only Once : Sound and Animation on keypress
starter();

// Accept User click
$(".btn").on("click", function() {
  var colorClicked = $(this).attr("id");
  soundAndAnimation(colorClicked);

//Cross-check with actualSequence
//If user click is true
  if (colorClicked === colors[actualSequence[numberOfClick]]) {
    numberOfClick++;

    //Level Upgrade: If all user clicks are true
    if (numberOfClick === levelNumber) {
      levelNumber++;
      numberOfClick = 0;
      setTimeout(function() {
        $("h1").text("Level " + levelNumber);
        randomColorSelector();
      }, 1000)

    }
  }

//Game Over : If user click is false
  else {
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over,Press Any Key to Restart");
    starter();
  }
});
