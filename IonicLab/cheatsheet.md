# Cheat Sheet : Creating your first Hybrid App with Ionic in 60 Minutes

The below markdown file consists of commands, links and code snippets that will help you complete and understand Miracle Summer of Code Lab "Creating your first Hybrid App with Ionic in 60 Minutes".

## Important Links

Access Cloud9 - https://c9.io/

Google API - https://maps.googleapis.com/maps/api/geocode/json?address=detroit

## Commands

To install the Ionic Framework and Cordova with npm,

```shell
npm install -g cordova ionic
```

To create new blank ionic application,

```shell
ionic start <application-name> blank
```

To simulate the app in your browser,

```shell
ionic serve -p $PORT --nolivereload
```

## Code Snippets

### app.js

```javascript
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
```

### index.html

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <title>API Consumer Demo App</title>

  <link href="lib/ionic/css/ionic.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
  <!-- ionic/angularjs js -->
  <script src="lib/ionic/js/ionic.bundle.js"></script>
  <!-- cordova script (this will be a 404 during development) -->
  <script src="cordova.js"></script>

  <!-- your app's js -->
  <script src="js/app.js"></script>
</head>

<body ng-app="starter" ng-controller="BodyCtrl">
  <ion-pane>
    <ion-header-bar class="bar-calm">
      <h1 class="title"><strong>I am an API Consumer</strong></h1>
    </ion-header-bar>
    <ion-content class="had-header has-footer">
      <div class="list">
        <label class="item item-input">
          <input type="text" id="cname" placeholder="City Name" ng-model="city.cname">
        </label>
        <label class="item item-input">
          <input type="text" id="address" placeholder="Full Address" value="{{address}}" disabled="true">
        </label>
        <button class="button button-full button-dark" ng-click="getLocation(city)">
          Get Geolocation Details
        </button>
      </div>
    </ion-content>
    <ion-footer-bar class="bar-calm">
      <h1 class="title">This is a footer</h1>
    </ion-footer-bar>
  </ion-pane>
</body>

</html>
```
