app.service('gameService', function () {
  this.setActualTrain =
    function (train) {
      console.log("set actual train: " + train);
      _actualTrain = train;
    };

  this.getActualTrain =
    function () {
      return _actualTrain;
    };

  this.getTrains =
    function () {
      return _trains;
    };

  this.setStation =
    function (station) {
      _currentStation = station;
    };

  this.getStation =
    function () {
      return _currentStation;
    };

  this.setDirection =
    function (direction) {
      _currentDirection = direction;
    };
  this.getDirection =
    function () {
      return _currentDirection;
    };

  this.getWelcomeVideo =
    function () {
      var vids = stations[_currentDirection][Object.keys(stations[_currentDirection])[_stationIndex]].welcomeVids;
      var currentVid = vids[_videoIndex];
      // cycle through the videos
      _videoIndex++;
      if (_videoIndex == vids.length) {
        _videoIndex = 0;
      }
      return "vid/welcome/" + currentVid;
    };

  this.nextStation =
    function () {
      _stationIndex++;
      if (Object.keys(stations[_currentDirection]).length <= _stationIndex) {
        _stationIndex = 0;
      }
      // reset the video index to 0
      _videoIndex = 0;
      this.setStation(stations[_currentDirection][Object.keys(stations[_currentDirection])[_stationIndex]]);
    };

  this.pickTrain =
    function (pickedTrain) {
      _trainChoice = pickedTrain;
      // set that train to be greyed out if its the wrong train
      _trains[pickedTrain]["selected"] = true;
      return _trainChoice == this.getActualTrain();
    };


  this.getTrainChoice =
    function () {
      return _trainChoice;
    };


  this.resetTrainChoices =
    function () {
      _trains = JSON.parse(JSON.stringify(trains));
      _actualTrain = null;
      _trainChoice = null;
      // reset round points as well
      _roundPoints = numKeys(trains);
    };

  this.getNextView =
    function () {
      return _nextView;
    };

  this.setNextView =
    function (nextView) {
      _nextView = nextView;
    };

  this.getNextVideo =
    function () {
      return _nextVideo;
    };

  this.setNextVideo =
    function (nextVideo) {
      _nextVideo = nextVideo;
    };

  this.getRoundPoints =
    function () {
      return _roundPoints;
    };

  this.setRoundPoints =
    function (roundPoints) {
      _roundPoints = roundPoints;
    };


  this.getNopeVideo =
    function () {
      var vid = nopeVideos[_nopeVideoIndex];
      _nopeVideoIndex++;
      if (_nopeVideoIndex >= nopeVideos.length) {
        shuffleList(nopeVideos)
        _nopeVideoIndex = 0;
      }
      return "vid/nope/" + vid;
    }

  this.getYesVideo =
    function () {
      var vid = yesVideos[_yesVideoIndex];
      _yesVideoIndex++;
      if (_yesVideoIndex >= yesVideos.length) {
        shuffleList(yesVideos)
        _yesVideoIndex = 0;
      }
      return "vid/yes/" + vid;
    }

  this.getBeardVideo =
    function () {
      return "vid/beard/" + "beard.mp4";
    }

  this.getTotalPoints =
    function () {
      return _totalPoints;
    }

  this.setTotalPoints =
    function (points) {
      _totalPoints = points;
    }

  this.setWhispered =
    function (whispered) {
      _whispered = whispered;
    }

  this.getWhispered =
    function () {
      return _whispered;
    }

  this.getLevel =
    function () {
      return levels[_levelIndex];
    }

  this.getNextLevel =
    function () {
      if (_levelIndex + 1 < levels.length) {
        return levels[_levelIndex + 1];
      } else {
        return levels[_levelIndex];
      }
    }

  this.earnNextLevel =
    function () {
      if (_levelIndex + 1 < levels.length) {
        _levelIndex++;
        _newLevel = true;
      }
    }

  this.isNewLevel =
    function () {
      var actualValue = _newLevel;
      _newLevel = false;
      return actualValue;
    }

  this.didLevelUp =
    function () {
      if (this.getTotalPoints() >= this.getNextLevel()["points"]) {
        // verify there is indeed a next level
        return this.getLevel() != this.getNextLevel();
      }
      return false;
    }

  this.reset =
    function () {
      _whispered = false;
      _stationIndex = 0;
      _directionIndex = 0;
      _currentDirection = Object.keys(stations)[_directionIndex];
      _currentStation = stations[_currentDirection][Object.keys(stations[_currentDirection])[_stationIndex]];
      _videoIndex = 0;
      _trains = JSON.parse(JSON.stringify(trains));
      _actualTrain = null;
      _trainToRemove = null;
      _nextVideo = null;
      _roundPoints = numKeys(trains);
      _totalPoints = 0;
      _nopeVideoIndex = 0;
      _yesVideoIndex = 0;
      _levelIndex = 0;
      _trainChoice = null;
      _newLevel = false;
      this.setNextView("game");
    };

  // for testing purposes
  this.resetTest =
    function () {
      reset();
      _roundPoints = 2;
      _totalPoints = 12;
      _trainChoice = trains[0];
    };
});
