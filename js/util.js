// First, checks if it isn't implemented yet.
if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}

////////////////////////
// common helper methods
////////////////////////

function numKeys(obj) {
  return Object.keys(obj).length;
}

function pickRandomProperty(obj) {
  var result;
  var count = 0;
  for (var prop in obj)
    if (Math.random() < 1 / ++count)
      result = prop;
  return result;
}

function pickRandomListElem(listOfStuff) {
  return listOfStuff[Math.floor(Math.random() * listOfStuff.length)];
}

function jsonToQueryString(json) {
  return '?' +
    Object.keys(json).map(function(key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
}

// prepare the image + level name for the top header in the game
function setupScoreHeader(gameService, $scope){
  var level = gameService.getLevel();
  $scope.avatarImg = "img/avatars/" + level["img"];
  $scope.levelName = level["name"];
  updateProgressBar(gameService, $scope);
}

// prepare the current level progress bar
function updateProgressBar(gameService, $scope) {
  $scope.progressBarValue = (gameService.getTotalPoints()) - (gameService.getLevel()["points"]);
  $scope.progressBarMax = (gameService.getNextLevel()["points"]) - (gameService.getLevel()["points"]) - 1;
  // update color scheme for score and progress bar
  $scope.currentLevel = gameService.getLevel()["class"];
  $scope.currentLevelPBar = $scope.currentLevel + "-pbar";
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleList(theList) {
  var currentIndex = theList.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    var randomIndex = Math.floor(Math.random() * currentIndex);
    var currentIndex = currentIndex - 1;

    // And swap it with the current element.
    var temporaryValue = theList[currentIndex];
    theList[currentIndex] = theList[randomIndex];
    theList[randomIndex] = temporaryValue;
  }

  return theList;
}
