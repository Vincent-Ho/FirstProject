angular.module('starter.controllers', ['ngCordova'])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('SermonReviseCtrl', function ($scope, Sermons) {
    $scope.reviseList = Sermons.list();
  })

  .controller('NewsTabCtrl', function ($scope, $http, Category) {
    $scope.rootCatId = 94;
    $scope.item = {
      title: ''
    };
    Category.listById($scope.rootCatId, function (catList) {
      $scope.catList = catList;
    });
  })
  .controller('HomeTabCtrl', function ($scope) {
  })
  .controller('BookingCtrl', function ($scope, Room, $ionicPopup) {
      $scope.bookingList = [];
      $scope.refresh = function (date) {
        Room.getByDate(date, function (events) {
          $scope.bookingList = events;
        });
      };
      $scope.$on('child', function (event, date) {
        $scope.date = date;
        $scope.refresh(date);
      });

      $scope.book = function () {
        // showpopup method code
        $scope.data = {};
        var date = Room.formatDate($scope.date);
        var myPopup = $ionicPopup.show({
          template: 'Name <input type="text" ng-model="data.userName">   <br> Number of users  <input type="number" ng-model="data.userCount" >  <br> Purpose  <textarea rows="4" cols="50" ng-model="data.purpose" >',
          title: 'Book room on ' + date,
          subTitle: 'Please fill all fields',
          scope: $scope,
          buttons: [{
            text: 'Cancel'
          }, {
            text: '<b>Submit</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.userPassword) {
                //don't allow the user to close unless unless all fields filled
                e.preventDefault();
              } else {
                return $scope.data;
              }
            }
          }]
        });
        myPopup.then(function (res) {
          if (res) {
            if (res.userPassword == res.confirmPassword) {
              console.log('Password Is Ok');
            } else {
              console.log('Password not matched');
            }
          } else {
            console.log('Enter password');
          }
        });
      }
    }
  )
  .controller('NurtureCtrl', function ($scope, $sce) {
    $scope.link = $sce.trustAsResourceUrl("https://info.sparrow.hk/anWebRegistration.cfm?apikey=5fdc38be-86c2-11e4-a975-c81f66cb1348");
    //$scope.link = "https://info.sparrow.hk/anWebRegistration.cfm?apikey=5fdc38be-86c2-11e4-a975-c81f66cb1348";
  })
  .controller('NewsCatCtrl', function ($scope, $stateParams, Article, Category) {
    $scope.cat = {
      title: ''
    };
    $scope.newslists = [];
    $scope.allList = [];
    $scope.catId = $stateParams.catid;
    Article.listById($scope.catId, function (newslists) {
      $scope.allList = newslists;
      $scope.newslists = newslists;
    });

    Category.getById($scope.catId, function(catItem){
      $scope.cat = catItem;
    });
  })
  .controller('NewsItemCtrl', function ($scope, $stateParams, Article) {
    $scope.news = {
      title: ''
    };
    $scope.newsId = $stateParams.newsid;
    Article.getById($scope.newsId, function (news) {
      $scope.news.title = news.title;
      $scope.content = news.content;
    });
  })
  .filter('searchNews', function () {

    return function (items, query) {
      var filtered = [];
      var letterMatch = new RegExp(query, 'i');
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (query) {
          if (letterMatch.test(item.title)) {
            filtered.push(item);
          }
        } else {
          filtered.push(item);
        }
      }
      return filtered;
    };
  })
  .controller('SermonCtrl', function ($scope, Sermons, $stateParams, $cordovaMedia, $ionicLoading, ApiEndpoint) {
    var mediaStatusCallback = function (status) {
      if (status == Media.MEDIA_STARTING) {
        $ionicLoading.show({
          template: "Loading..."
        });
      } else {
        $ionicLoading.hide();
      }
    }

    Sermons.find($stateParams.sermonid, function (item) {
      $scope.item = item;
      var src = ApiEndpoint.url + "sermons/" + item.mp3;
      try {
        $scope.media = $cordovaMedia.newMedia(src, null, null, mediaStatusCallback);
      } catch (e) {
      }
    });
    $scope.play = function () {
      var iOSPlayOptions = {
        numberOfLoops: 2,
        playAudioWhenScreenIsLocked: false
      }

      $scope.media.play(iOSPlayOptions); // iOS only!
      $scope.media.play(); // Android
    }

    $scope.pause = function () {
      $scope.media.pause();
    }

    $scope.stop = function () {
      $scope.media.stop();
    }
  })
;
