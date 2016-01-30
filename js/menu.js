// the menu will display a new random muni img from flickr every few seconds

app.controller("NavigationController", function ($scope, $location, $http, gameService) {
  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.muniImg = startingBackgroundMenuImg;

  // retrieve the list of random muni photos from flickr
  var fetchPhotoList = function () {
    qs_data = {
      "method": "flickr.photos.search",
      "api_key": flickr_api_key,
      "text": "muni train underground",
      "safe_search": 1,
      "per_page": 20,
      "format": "json",
      "nojsoncallback": 1
    }

    var muni_pics_list_url = flickr_rest_endpoint + jsonToQueryString(qs_data);
    console.log(muni_pics_list_url);
    return $http.get(muni_pics_list_url)
      .then(function (response) {
        return response.data.photos.photo;
      });
  };

  // get the photo src given the flickr photo id
  var fetchPhotoSrc = function (photo_id) {
    qs_data = {
      "method": "flickr.photos.getSizes",
      "api_key": flickr_api_key,
      "photo_id": photo_id,
      "format": "json",
      "nojsoncallback": 1
    }

    var muni_pic_url = flickr_rest_endpoint + jsonToQueryString(qs_data);

    return $http.get(muni_pic_url)
      .then(
      function (response) {
        return response.data;
      });
  }

  var updateBackgroundImg = function () {
    console.log("updating background img");
    // first fetch a list of possible photos
    fetchPhotoList().then(function (photo_arr) {
      // select a random photo from the list
      var photo = photo_arr[Math.floor(Math.random() * photo_arr.length)];
      fetchPhotoSrc(photo.id).then(function (photo_data) {
        var photo_src = photo_data.sizes.size[6].source;
        // set the background img to be the random photo
        $scope.muniImg = photo_src;
      })
    });
  }


  $scope.$on('$ionicView.beforeEnter', function () {
    // reset the game when entering menu
    gameService.reset();
  });

  $scope.$on('$ionicView.afterEnter', function () {
    // play the "nope" theme song
    var audioElement = document.getElementById("theme-song");
    audioElement.play();

    // loop the theme song
    ionic.EventController.on('ended', audioHandler, audioElement);
    function audioHandler() {
      audioElement.play();
    }

    // start timer to update the background img with random muni img from flickr
    var startLoop = function () {
      myTimeout = setTimeout(function () {
          updateBackgroundImg();
          startLoop();
        }
        , menuBackgroundTimeout);
    }
    startLoop();
  });


  $scope.$on('$ionicView.beforeLeave', function () {
    // stop the theme song before moving to the next panel
    var audioElement = document.getElementById("theme-song");
    audioElement.pause();
    // stop background img changing loop
    clearTimeout(myTimeout);
  });

});
