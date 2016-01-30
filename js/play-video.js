// a utility panel to play a video

app.controller("AutoplayVideoController", function($scope, $state, $timeout, gameService) {
  $scope.$on('$ionicView.enter', function(event, data) {
  });

  $scope.$on('$ionicView.beforeEnter', function() {
    var vid = gameService.getNextVideo();
    $scope.videoSource = vid;
    // update the video src
    $timeout(function () {
      $scope.$apply();
      videoElement = document.getElementsByClassName('bgvid')[0];
      videoElement.load();

    });
  });

  $scope.$on('$ionicView.afterEnter', function() {
    ionic.EventController.on('ended', videoHandler, videoElement);
    videoElement.play();
    function videoHandler() {
      // clear the video source
      $scope.videoSource = "";
      $timeout(function () {
        $scope.$apply();
      });
      // use game service obj to determine the next panel to move to after video has finished
      $state.go(gameService.getNextView());
    }
  });
});
