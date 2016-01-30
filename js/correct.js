app.controller("CorrectTrainPickedController", function ($scope, $state, $location, $timeout, gameService) {

  $scope.$on('$ionicView.beforeEnter', function () {
    setupScoreHeader(gameService, $scope);

    // retrieve current game data
    $scope.trainChoice = gameService.getTrainChoice();
    $scope.actualTrain = gameService.getActualTrain();
    $scope.roundPoints = gameService.getRoundPoints();

    // select a random video to show
    $scope.correctVideo = "img/correct/" + pickRandomListElem(correctVideos);
    // update the video src
    $timeout(function () {
      $scope.$apply();
      videoElement = document.getElementsByClassName('reward-vid')[0];
      videoElement.load();
    });

    // set the button text appropriately
    if (gameService.didLevelUp()) {
      $scope.buttonText = "Level Up!";
    } else {
      $scope.buttonText = "Next Station!";
    }

    // track if the additional points have been already been added to the progress bar
    $scope.updatedPoints = false;

  });

  $scope.nextStationPlease = function () {
    // reset the train choices
    gameService.resetTrainChoices();
    // move to the next station
    gameService.nextStation();
    // setup the next view
    gameService.setNextView("game");
    // check if player just leveled up
    if (gameService.isNewLevel()) {
      $location.path("level");
    } else {
      // go to the next view
      $location.path("map");
    }
  };

  $scope.finishPlaying = function () {
    $location.path("menu");
  }

  function addOnePoint() {
    // update the score in the timeout function
    $timeout(function () {
      gameService.setRoundPoints(gameService.getRoundPoints() - 1);
      gameService.setTotalPoints(gameService.getTotalPoints() + 1);
      $scope.roundPoints = gameService.getRoundPoints();
      $scope.totalPoints = gameService.getTotalPoints();
      $scope.progressBarValue = (gameService.getTotalPoints()) - (gameService.getLevel()["points"]);

      var pointSound = coinSound;
      // check if total points is greater then next level
      if (gameService.didLevelUp()) {
        $scope.buttonText = "Level Up!";
        // reset the progress bar
        gameService.earnNextLevel();
        updateProgressBar(gameService, $scope);
        pointSound = levelUpSound;
      }


      // need to add the sound to the browser to play
      var dingAudioElement = document.createElement("audio");
      var audioSource = document.createElement("source")
      audioSource.setAttribute("src", pointSound);
      audioSource.setAttribute("type", "audio/mpeg");
      dingAudioElement.appendChild(audioSource);
      var audioParentElement = document.getElementById("audioParent");
      audioParentElement.appendChild(dingAudioElement);

      // register the listener to perform action after sound has played
      ionic.EventController.on('ended', audioHandler, dingAudioElement);

      dingAudioElement.play();

      function audioHandler() {
        // need to remove the sound to play a different one
        var parNode = dingAudioElement.parentNode;
        dingAudioElement.parentNode.removeChild(dingAudioElement);

        // if there more points to be added to the progress bar, add them and trigger the sound
        if (gameService.getRoundPoints() > 0) {
          addOnePoint();
        } else {
          // all points have been added - display the buttons to advance to the next panel
          $timeout(function () {
            $scope.updatedPoints = true;
          })
        }
      }

    })
  }

  // start the video and adding points to the progress bar after panel has been rendered
  $scope.$on('$ionicView.afterEnter', function () {
    videoElement.play();
    addOnePoint();
  });

});
