app.controller("TrainPickController", function ($scope, $location, $state, $http, $stateParams, $timeout, gameService, MuniApiEndpoint) {

  // retrieve the next train that is arriving in the station and direction
  function getNextTrain() {
    if (gameService.getActualTrain() == null) {
      getNextMuniTrain();
    } else {
      prepareWhisperHint();
    }
  }

  // to be called after the next train to arrive is determined - start timer for whisper hint
  function prepareWhisperHint() {
    // wrap in timeout call to avoid "$digest already in progress"
    $timeout(function () {
      $scope.whisperAudio = whispersDir + gameService.getActualTrain().toLowerCase() + ".mp3";
      $scope.$apply();
      audioElement.load();
      // start timer
      myTimeout = setTimeout(function () {
          gameService.setWhispered(true);
          audioElement.play();
        }
        , whisperWait);
    })
  }

  $scope.$on('$ionicView.beforeEnter', function () {
    setupScoreHeader(gameService, $scope);
    // initialize map img
    var station = gameService.getStation();
    $scope.mapImg = mapImgDir + "small/" + station.img;

    // initial data for this view
    $scope.trainDirection = gameService.getDirection();
    $scope.stationName = gameService.getStation().name;
    $scope.trains = gameService.getTrains();
    $scope.roundPoints = gameService.getRoundPoints();
    $scope.totalPoints = gameService.getTotalPoints();

    // get the next train to arrive
    getNextTrain();
    audioElement = document.getElementById('game-audio');
    gameService.setWhispered(false);
  });

  // when a user picks a train
  $scope.choose = function (trainChoice) {
    // if this train has already been selected, then do nothing
    if (gameService.getTrains()[trainChoice]["selected"] == true) {
      return;
    }
    // cancel whisper event
    clearTimeout(myTimeout);

    // verify that a train has been set (incase async has not returned)
    if (gameService.getActualTrain() == null) {
      gameService.setActualTrain(pickRandomProperty(trains));
    }
    // check if the player picked the correct train
    if (gameService.pickTrain(trainChoice)) {
      // picked the correct train
      // check if got it right on first guess
      if (gameService.getRoundPoints() == numKeys(trains)) {
        // if got correct on first guess without whipser, get bonus points
        if (!gameService.getWhispered() && gameService.getRoundPoints() == numKeys(trains)) {
          gameService.setRoundPoints(numKeys(trains) * 2);
          // todo tee up a super beard!!
          // tee up a "beard" video
          gameService.setNextVideo(gameService.getBeardVideo());
        } else {
          // tee up a "beard" video
          gameService.setNextVideo(gameService.getBeardVideo());
        }
      } else {
        // tee up a "yes" video
        gameService.setNextVideo(gameService.getYesVideo())
      }
      gameService.setNextView("correct-pick");
      // go to the next view
      $location.path("play-video");
    } else {
      gameService.setRoundPoints(gameService.getRoundPoints() - 1);
      // prep the nope video
      gameService.setNextVideo(gameService.getNopeVideo())

      gameService.setNextView("game");
      $state.go("play-video")
    }
  }

  // retrieve the next muni train to arrive using 511.org data (if available)
  function getNextMuniTrain() {
    var stopCode = gameService.getStation().stopCode;
    var bartEndpoint = String.format("GetNextDeparturesByStopCode.aspx?token={0}&stopcode={1}", muniToken, stopCode);

    //todo set random train until picked?

    $http.get(MuniApiEndpoint.url + "/" + bartEndpoint).then(function (resp) {
      muniXmlData = resp["data"];
      var transitdata = x2js.xml_str2json(resp.data).RTT.AgencyList.Agency;
      var lowestTime = 1000;
      var train = "N";
      if (transitdata._Name == "SF-MUNI") {
        // iterate all the trains in the station
        angular.forEach(transitdata.RouteList.Route, function (trainObj, key) {
          // traverse the long json obj
          var departureTimes = trainObj.RouteDirectionList.RouteDirection.StopList.Stop.DepartureTimeList.DepartureTime;
          // iterate through the departure time list for each train
          angular.forEach(departureTimes, function (departureTime) {
            var time = parseInt(departureTime);
            if (time < lowestTime) {
              lowestTime = time;
              train = trainObj._Code;
              // fix for KT
              if (train == "KT") {
                train = "K";
              }
            }
          })
        });
      }
      console.log("from 511 - train: " + train + " time: " + lowestTime);
      gameService.setActualTrain(train);
      prepareWhisperHint();
      // For JSON responses, resp.data contains the result
    }, function (err) {
      console.error('ERR', err);
      console.log(JSON.stringify(err, null, 4))
      // err.status will contain the status code
      gameService.setActualTrain(pickRandomProperty(trains));
      prepareWhisperHint();
    })
  }
});


