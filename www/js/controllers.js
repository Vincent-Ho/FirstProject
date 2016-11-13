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

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];
  })
  .factory('Sermons', function ($http) {
    var data = [
      {title: '萬勿錯過', id: 1, date: '2016/11/06', speaker: '羅雯霏牧師', mp3: "201611/L20161106.mp3"},
      {title: '青崇: 萬勿錯過！', id: 2, date: '2016/11/05', speaker: '羅雯霏牧師', mp3: "201611/L20161105.mp3"},
      {title: '信心的躁鬱', id: 3, date: '2016/10/30', speaker: '王少勇牧師', mp3: "201610/L20161030.mp3"},
      {title: '青崇：我信上帝!?', id: 4, date: '2016/10/29', speaker: '吳錫泉傳道', mp3: "201610/L20161029.mp3"},
      {title: '來！靠近祂', id: 5, date: '2016/10/23', speaker: '丘衛文傳道', mp3: "201610/L20161023.mp3"},
      {title: '青崇: 讀經攻略', id: 6, date: '2016/10/22', speaker: '黃偉健傳道', mp3: "201610/L20161022.mp3"}
    ];

    function getData() {
      return data;
    }

    return {
      list: getData,
      find: function (id, callback) {
        var sermon = data.filter(function (entry) {
          return entry.id == id;
        })[0];
        callback(sermon);
      }
    };

  })
  .controller('SermonReviseCtrl', function ($scope, Sermons) {
    $scope.reviseList = Sermons.list();
  })
  .factory('News', function ($http) {
    var data = [
      {
        title: '教會事工',
        id: 1,
        date: '2016/10/23',
        detail: '社宣探訪—十月份宣教部分別探訪獨居長者(25/10)、花園街大飯堂(28/10)及愛與光明行動(30/10)。讓主的愛延伸至旺角的鄰舍。'
      },
      {title: '世道人心', id: 2, date: '2016/10/23', detail: '新一屆立法會—新議員宣誓的亂局未能解決，求上主憐憫，盼望民生議題不會因政治角力而被犧牲。'},
      {title: '同工消息', id: 3, date: '2016/10/30', detail: '唐力行傳道將於1-13/11休假。'},
      {
        title: '第4季培育課程',
        id: 4,
        date: '2016/10/30',
        detail: '「靜中塑心靈」(11/11開課)課程仍接受報名，填妥報名表後可放2B收集箱，或到《活石網頁》→「培育專線」→「本季課程」→網上報名。查詢：吳錫泉傳道。'
      },
      {title: '書籍訂購', id: 5, date: '2016/10/30', detail: '已訂購十一月份《活潑的生命》或《清晨國度》者，請到副堂取書。'},
      {
        title: '招募詩班員',
        id: 6,
        date: '2016/10/30',
        detail: '活石詩班為能使更多弟兄姊妹參與，現於11-12月有短期的男女聲分部獻詩，練習為主日早堂時段，男聲為6/11、13/11及20/11(獻詩)，女聲為13/11、20/11、4/12及11/12(獻詩)。歡迎弟兄姊妹報名參加，可聯絡周冠華弟兄或劉寶珠姊妹。'
      }
    ];

    function getData(newsName, callback) {

      // var url = 'http://api.themoviedb.org/3/',
      //   mode = 'search/movie?query=',
      //   name = '&query=' + encodeURI(moviename),
      //   key = '&api_key=470fd2ec8853e25d2f8d86f685d2270e';
      //
      // $http.get(url + mode + key + name).success(function(data) {
      //
      //   cachedData = data.results;
      //   callback(data.results);
      // });
      callback(data);
    }

    return {
      list: getData,
      find: function (id, callback) {
        console.log(id);
        var newsItem = data.filter(function (entry) {
          return entry.id == id;
        })[0];
        callback(newsItem);
      }
    };

  })

  .controller('NewsTabCtrl', function ($scope, $http, News) {
    $scope.item = {
      title: ''
    }
    $scope.searchNews = function () {
      News.list($scope.item.title, function (newslists) {
        $scope.newslists = newslists;
      });

    };
    $scope.searchNews();
  })
  .controller('HomeTabCtrl', function ($scope) {
  })
  .controller('BookingCtrl', function ($scope) {
    var startHour = 7;
    var endHour = 21;
    var usehalfhour = true;

    $scope.timerleft = '0px';

    $scope.hours = getHours();
    $scope.rooms = getRooms();
    $scope.days = getDays();
    $scope.events = getEvents();

    function getHours() {
      var tmp = [];
      for (i = startHour; i <= endHour; i++) {
        tmp.push(('0' + i).slice(-2) + ':00');
        if (usehalfhour && i < endHour) {
          tmp.push(('0' + i).slice(-2) + ':30');
        }
      }

      return tmp;
    }
    ;


    function getRooms() {
      var tmp = [];
      tmp.push({id: 1, name: '302'});
      tmp.push({id: 2, name: '303'});
      tmp.push({id: 2, name: '304-5'});
      return tmp;
    }
    ;
    function getDays() {
      var tmp = [];
      var date1 = new Date();
      var date2 = new Date();
      date2.setDate(date2.getDate() + 1);
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      var monthname = new Array(12);
      monthname[0] = "January";
      monthname[1] = "February";
      monthname[2] = "March";
      monthname[3] = "April";
      monthname[4] = "May";
      monthname[5] = "June";
      monthname[6] = "July";
      monthname[7] = "August";
      monthname[8] = "September";
      monthname[9] = "October";
      monthname[10] = "November";
      monthname[11] = "December";


      tmp.push({
        day: weekday[date1.getDay()],
        longdate: weekday[date1.getDay()] + ', ' + monthname[date1.getMonth()] + ' ' + date1.getDate() + ', ' + date1.getFullYear(),
        datevalue: date1,
        dateformat: date1.toLocaleDateString()
      });
      console.log(tmp);
      return tmp;
    }

    $scope.gotScrolled = function () {

      $scope.timerleft = $ionicScrollDelegate.getScrollPosition().left + 'px';
      $scope.$apply();

    };

    function getEvents() {
      var tmp = [];
      var date1 = new Date();
      tmp.push({
        eventname: 'Presentation 1',
        starthour: '08:00',
        endhour: '09:30',
        eventtype: 'ion-mic-c',
        room: 'Morpheus',
        left: (60 + 0 * 120) + 'px',
        top: (23 + 1 * 100) + 'px',
        height: (1.5 * 100) + 'px',
        color: 'rgba(0,157,151,0.75)',
        dateformat: date1.toLocaleDateString()
      });
      tmp.push({
        eventname: 'Coffee Break',
        starthour: '09:30',
        endhour: '10:00',
        eventtype: 'ion-coffee',
        room: 'Morpheus',
        left: (60 + 0 * 120) + 'px',
        top: (23 + 2.5 * 100) + 'px',
        height: (0.5 * 100) + 'px',
        color: 'rgba(255,169,0,0.75)',
        dateformat: date1.toLocaleDateString()
      });
      tmp.push({
        eventname: 'Presentation 2',
        starthour: '10:00',
        endhour: '11:45',
        eventtype: 'ion-mic-c',
        room: 'Morpheus',
        left: (60 + 0 * 120) + 'px',
        top: (23 + 3 * 100) + 'px',
        height: (1.75 * 100) + 'px',
        color: 'rgba(0,157,151,0.75)',
        dateformat: date1.toLocaleDateString()
      });
      tmp.push({
        eventname: 'Networking + Coffee',
        starthour: '12:00',
        endhour: '14:00',
        eventtype: 'ion-chatbubbles',
        room: 'Morpheus',
        left: (60 + 0 * 120) + 'px',
        top: (23 + 5 * 100) + 'px',
        height: (1.75 * 100) + 'px',
        color: 'rgba(18,67,172,0.75)',
        dateformat: date1.toLocaleDateString()
      });
      tmp.push({
        eventname: 'Presentation 3',
        starthour: '14:30',
        endhour: '18:00',
        eventtype: 'ion-mic-c',
        room: 'Morpheus',
        left: (60 + 0 * 120) + 'px',
        top: (23 + 7.5 * 100) + 'px',
        height: (2.5 * 100) + 'px',
        color: 'rgba(0,157,151,0.75)',
        dateformat: date1.toLocaleDateString()
      });
      tmp.push({
        eventname: 'Dinner',
        starthour: '19:00',
        endhour: '21:00',
        eventtype: 'ion-wineglass',
        room: 'Morpheus',
        left: (60 + 0 * 120) + 'px',
        top: (23 + 12 * 100) + 'px',
        height: (2 * 100) + 'px',
        color: 'rgba(255,113,0,0.75)',
        dateformat: date1.toLocaleDateString()
      });

      tmp.push({
        eventname: 'Presentation 4',
        starthour: '08:00',
        endhour: '11:00',
        eventtype: 'ion-mic-c',
        room: 'Trinity',
        left: (60 + 2 * 120) + 'px',
        top: (23 + 1 * 100) + 'px',
        height: (3 * 100) + 'px',
        color: 'rgba(0,157,151,0.75)',
        dateformat: date1.toLocaleDateString()
      });
      tmp.push({
        eventname: 'Presentation 5',
        starthour: '11:00',
        endhour: '12:00',
        eventtype: 'ion-mic-c',
        room: 'Trinity',
        left: (60 + 2 * 120) + 'px',
        top: (23 + 4 * 100) + 'px',
        height: (1 * 100) + 'px',
        color: 'rgba(0,157,151,0.75)',
        dateformat: date1.toLocaleDateString()
      });
      tmp.push({
        eventname: 'Networking + Coffee',
        starthour: '12:00',
        endhour: '14:00',
        eventtype: 'ion-chatbubbles',
        room: 'Trinity',
        left: (60 + 2 * 120) + 'px',
        top: (23 + 5 * 100) + 'px',
        height: (1.75 * 100) + 'px',
        color: 'rgba(18,67,172,0.75)',
        dateformat: date1.toLocaleDateString()
      });
      tmp.push({
        eventname: 'Presentation 6',
        starthour: '14:30',
        endhour: '16:00',
        eventtype: 'ion-mic-c',
        room: 'Trinity',
        left: (60 + 2 * 120) + 'px',
        top: (23 + 7.5 * 100) + 'px',
        height: (1.5 * 100) + 'px',
        color: 'rgba(0,157,151,0.75)',
        dateformat: date1.toLocaleDateString()
      });
      //
      //
      //Presentation - 0,157,151 -- ion-mic-c
      //Networking 18,67,172 -- ion-chatbubbles
      //Coffee Break 255,169,0, --ion-coffee
      //Dinner 255,113,0 --ion-wineglass
      return tmp;
    }
  })
  .controller('NurtureCtrl', function ($scope, $sce) {
    $scope.link = $sce.trustAsResourceUrl("https://info.sparrow.hk/anWebRegistration.cfm?apikey=5fdc38be-86c2-11e4-a975-c81f66cb1348");
  })
  .controller('NewsItemCtrl', function ($scope, $http, $stateParams, News) {
    console.log($stateParams.newsid);
    News.find($stateParams.newsid, function (item) {
      $scope.item = item;
    });
  })
  .controller('SermonCtrl', function ($scope, Sermons, $stateParams, $cordovaMedia, $ionicLoading) {
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
      var src = "http://ourlivingstones.net/sermons/" + item.mp3;
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
  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  })
  .factory('Category', function ($http) {
    var url = 'http://ourlivingstones.net/?option=com_jbackend';

    function build(data) {
      return {};
    }

    function getList(catid, callback) {
      $http.get(url + '&action=get&module=content&resource=articles&catid=' + catid).success(function (data) {
        callback(build(data));
      });
    }

    return {
      listById: getList
    };
  })
  .factory('Article', function ($http) {
    var url = 'http://ourlivingstones.net/?option=com_jbackend';

    function build(data) {
      return {
        alias: data['alias'],
        title: data['title'],
        aid: data['id'],
        content: data['content']
      };
    }

    function getArticle(id, callback) {
      $http.get(url + '&action=get&module=content&resource=articles&id=' + id).success(function (data) {
        callback(build(data));
      });
    }

    return {
      getById: getArticle
    };
  })

;
