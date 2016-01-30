// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var app = angular.module('starter', ["ionic", "ui.bootstrap"])
  // this is for cors issue - http://blog.ionic.io/handling-cors-issues-in-ionic/
  .constant('MuniApiEndpoint', {
    url: 'http://localhost:8100/munidata'
  });

app.run(function ($ionicPlatform, $state) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('menu', {
      url: '/menu',
      templateUrl: "templates/menu.html",
      controller: "NavigationController"
    })
    .state('story', {
      url: '/story',
      templateUrl: "templates/story.html"
    })
    .state('game', {
      url: '/game',
      templateUrl: "templates/game.html",
      controller: 'TrainPickController',
      params: {}
    })
    .state('correct-pick', {
      url: '/correct-pick',
      templateUrl: "templates/correct-pick.html",
      controller: 'CorrectTrainPickedController'
    })
    .state('play-video', {
      url: '/play-video',
      templateUrl: "templates/play-video.html",
      controller: 'AutoplayVideoController'
    })
    .state('map', {
      url: '/map',
      templateUrl: "templates/map.html",
      controller: 'MapController'
    })
    .state('level', {
      url: '/level',
      templateUrl: "templates/level.html",
      controller: 'LevelController'
    })

  $urlRouterProvider.otherwise('/menu');
});
