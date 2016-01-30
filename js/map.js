// used to display the animated map before going to the game play panel
app.controller("MapController", function($scope, $state, $timeout, gameService) {

  $scope.$on('$ionicView.beforeEnter', function() {
    var station = gameService.getStation();

    images = [downtownMap, station.img];
    imageIndex = 0;
    $scope.mapImg = mapImgDir + images[imageIndex];
    $scope.stationAudio = stationAudioDir + station.mp3;
    // update the audio src
    $timeout(function () {
      $scope.$apply();
    });
  });

  $scope.$on('$ionicView.afterEnter', function() {
    // animate while playing audio
    var audioElement = document.getElementById("station-audio");
    audioElement.play();
    ionic.EventController.on('ended', audioHandler, audioElement);

    // start timer for swapping the map image
    var startLoop = function () {
      myTimeout = setTimeout(function () {
          $scope.mapImg = mapImgDir + images[imageIndex];
          $scope.$apply();
          imageIndex++;
          if (imageIndex>= images.length) {
            imageIndex = 0;
          }
          startLoop();
        }
        , mapImgTimeout);
    }
    startLoop();

    function audioHandler() {
      // go to the station gameplay in a literal second. The audio to announce the current station will be less than a second.
      $timeout(
        function() {
          // stop the img update timer
          clearTimeout(myTimeout);
          // go to the next view
          $state.go(gameService.getNextView());
        }, 1000);
    }
  });
});
