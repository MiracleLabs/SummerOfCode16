angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('BodyCtrl',function($scope,$http){
    $scope.getLocation = function(city){
      $scope.cityname = city.cname;
      $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.cityname+"").then(function(response){
          $scope.address = response.data.results[0].formatted_address;
      });
    }
})
