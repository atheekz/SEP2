'use strict';

angular.module('myApp.navbar', ['ngRoute','ngMaterial', 'ngMessages'])

.config(['$routeProvider','$mdThemingProvider', function($routeProvider,$mdThemingProvider) {

	 $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
	
  $routeProvider.when('/navbar', {
    templateUrl: './navbar/navbar.html',
    controller: 'navbarCtrl'
  });
}])

.controller('navbarCtrl', [function($scope) {
//alert("asdsad");
//console.log("sad");
}]);