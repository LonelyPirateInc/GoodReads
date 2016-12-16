angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

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
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('SearchCtrl', function($scope, $stateParams, $http, $ionicLoading, $ionicGesture, $ionicSideMenuDelegate) {

$ionicSideMenuDelegate.canDragContent(false);
$scope.my_current_page = 1;
$scope.my_search_query;
$scope.currPage = 1; 
$scope.submit_my_search = function(searchQuery) {
$scope.my_search_query = searchQuery;
 $ionicLoading.show();
     $http({
        method : "GET",
        // url:  "https://localhost/8100/#/search/index.xml?key=XWk48pjpLIAazTduLrsgw&q=Ender%27s+Game",
        url:  "http://www.goodreads.com/search/index.xml?key=i4nRnB23nrhwHAL1LXG0A&q=" + searchQuery,

    }).then(function mySuccess(response) {
       $ionicLoading.hide();
      console.log(response.data.GoodreadsResponse.search.results.work);
        $scope.response = response.data.GoodreadsResponse.search.results.work;
    }, function myError(response) {
       $ionicLoading.hide();
      console.log(JSON.stringify(response));
        $scope.error = response.statusText;
    });
  };
$scope.doRefresh = function() {
     $http({
        method : "GET",
        // url:  "https://localhost/8100/#/search/index.xml?key=XWk48pjpLIAazTduLrsgw&q=Ender%27s+Game",
        url:  "http://www.goodreads.com/search/index.xml?key=i4nRnB23nrhwHAL1LXG0A&q=" + $scope.my_search_query,
    }).then(function mySuccess(response) {
       $ionicLoading.hide();
      console.log(response.data.GoodreadsResponse.search.results.work);
        $scope.response = response.data.GoodreadsResponse.search.results.work;
    }, function myError(response) {
            $ionicLoading.hide();
      console.log(JSON.stringify(response));
        $scope.error = response.statusText;
    })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
};
$scope.forwardPagination = function(currentPage) {
    $scope.my_current_page = currentPage + 1;
    console.log("$scope.my_current_page",  $scope.my_current_page);
};


})

.controller('DetailsCtrl', function($scope, $stateParams, $http, $ionicLoading) {
$ionicLoading.show();
     $http({
        method : "GET",
        url:  "https://www.goodreads.com/book/show/" + $stateParams.book_id + ".xml?key=i4nRnB23nrhwHAL1LXG0A" 

    }).then(function mySuccess(response) {
      console.log(response.data.GoodreadsResponse.book);
        $scope.response = response.data.GoodreadsResponse.book;
         $ionicLoading.hide();
    }, function myError(response) {
      console.log(JSON.stringify(response));
        $scope.error = response.statusText;
        $ionicLoading.hide();
    });
})

.controller('EventsCtrl', function($scope, $stateParams, $http, $ionicLoading) {

$scope.show_events = [];

$scope.submit_my_dates = function() {


$ionicLoading.show();
     $http({
        method : "GET",
        url:  "https://www.goodreads.com/event/index.xml?search%5Bcountry_code%5D=CA&key=i4nRnB23nrhwHAL1LXG0A"
    }).then(function mySuccess(response) {
         $scope.events = response.data.GoodreadsResponse.events.event;
          console.log( $scope.events);
                      console.log("TIME STAMP "  + new Date($scope.events[0].start_at.__text).getTime() / 1000);

         $ionicLoading.hide();
    }, function myError(response) {
      console.log(JSON.stringify(response));
        $scope.error = response.statusText;
        $ionicLoading.hide();
    });
};

    $scope.doRefresh = function() {
     $http({
        method : "GET",
        url:  "https://www.goodreads.com/event/index.xml?search%5Bcountry_code%5D=CA&key=i4nRnB23nrhwHAL1LXG0A"
    }).then(function mySuccess(response) {
        $scope.events = response.data.GoodreadsResponse.events.event;
            console.log($scope.events);
         $ionicLoading.hide();
    }, function myError(response) {
      console.log(JSON.stringify(response));
        $scope.error = response.statusText;
        $ionicLoading.hide();
    })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
};

// $scope.dateRangeFilter = function (property, startDate, endDate) {
//     return function (item) {
//         if (item[property] === null) return false;
 
//         var itemDate = moment(item[property]);
//         var s = moment(startDate, "DD-MM-YYYY");
//         var e = moment(endDate, "DD-MM-YYYY");
 
//         if (itemDate >= s && itemDate <= e) return true;
//         return false;
//     }
// };

  // if ( response.)


});


