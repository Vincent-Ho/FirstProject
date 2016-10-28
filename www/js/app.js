// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.bootstrap.controller'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
  })
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/app.html',
        controller: 'AppCtrl'
      })
      .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tabs.home', {
        url: '/home',
        views: {
          'home-tab': {
            templateUrl: "templates/home.html",
            controller: 'HomeTabCtrl'
          }
        }
      })
      .state('tabs.news', {
        url: "/news",
        views: {
          'news-tab': {
            templateUrl: "templates/news.html",
            controller: 'NewsTabCtrl'
          }
        }
      })
      .state('tabs.profile', {
        url: "/profile",
        views: {
          'profile-tab': {
            templateUrl: "templates/profile.html"
          }
        }
      })
      .state('tabs.about', {
        url: "/about",
        views: {
          'about-tab': {
            templateUrl: "templates/about.html"
          }
        }
      })
      .state('tabs.home.index', {
        url: '/index',
        views: {
          'menuContent': {
            templateUrl: 'templates/index.html'
          }
        }
      })
      .state('tabs.home.booking', {
        url: '/booking',
        views: {
          'menuContent': {
            templateUrl: 'templates/booking.html',
            controller : 'BookingCtrl'
          }
        }
      })
      .state('tabs.home.nurture', {
        url: '/nurture',
        views: {
          'menuContent': {
            templateUrl: 'templates/fulliframe.html',
            controller : 'NurtureCtrl'
          }
        }
      })
      .state('tabs.home.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })
      .state('tabs.home.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      })
      .state('tabs.news.single', {
        url: '/news/:newsId',
        views: {
          'menuContent': {
            templateUrl: 'templates/newsItem.html',
            controller: 'NewsItemCtrl'
          }
        }
      })
      ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home/index');
  });

