app.controller("LevelController", function($scope, $state, $location, gameService) {

  $scope.go = function (path) {
    $location.path(path);
  };

  // prepare the level img and name
  $scope.$on('$ionicView.beforeEnter', function() {
    var level = gameService.getLevel();
    $scope.levelImg = "img/levels/" + level["img"];
    $scope.levelName = level["name"];
    $scope.currentLevel = gameService.getLevel()["class"];
  });


});
