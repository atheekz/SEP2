'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial', 
  'ngMessages',
  'ui.tree',
  'angular.filter',
  'ui.bootstrap',
  'ui.bootstrap.contextMenu',
  'oitozero.ngSweetAlert',
  'ngSanitize',
  'flow',/*
  'ngQuill',*/
  'ng-fusioncharts',
  'myApp.home',
  'myApp.register_confirmation',
  'myApp.navbar',
  'myApp.login',
  'myApp.loginVerification',
  'myApp.register',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider','$mdThemingProvider','flowFactoryProvider',  function($locationProvider, $routeProvider,$mdThemingProvider,flowFactoryProvider) {
   $routeProvider.when('/home', {
            templateUrl: './home/home.html',
            controller: 'homeCtrl',
        });
        $routeProvider.when('/', {
            templateUrl: './home/home.html',
            controller: 'homeCtrl',
        });
        $routeProvider.when('/login', {
            templateUrl: './login/login.html',
            controller: 'loginCtrl',
        });
        $routeProvider.when('/register', {
            templateUrl: './register/register.html',
            controller: 'registerCtrl'
        });
        $routeProvider.when('/loginVerification/:email/:token', {
            templateUrl: './loginVerification/loginVerification.html',
            controller: 'loginVerificationCtrl'
        });
        //nipun
        $routeProvider.when('/admin', {
            templateUrl: './admin/admin.html',
            controller: 'adminCtrl',
        });$routeProvider.when('/addLec', {
            templateUrl: './admin/addLec.html',
            controller: 'adminCtrl',
        });
    $routeProvider.when('/editLec', {
            templateUrl: './admin/editLec.html',
            controller: 'adminCtrl',
        });
    $routeProvider.when('/singleLec', {
            templateUrl: './admin/singleLec.html',
            controller: 'adminCtrl',
        });
     $routeProvider.when('/manageCourses', {
            templateUrl: './admin/addCourse.html',
            controller: 'courseCtrl',
        });
     $routeProvider.when('/editCourse', {
            templateUrl: './admin/editCourse.html',
            controller: 'courseCtrl',
        });     
      $routeProvider.when('/singleCourse', {
            templateUrl: './admin/singleCourse.html',
            controller: 'courseCtrl',
        });
      
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        // Specify HTML5 mode (using the History APIs) or HashBang syntax.
        $locationProvider.html5Mode(false).hashPrefix('!');

        flowFactoryProvider.defaults = {
      target: 'http://localhost:3000/api/upload',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on('catchAll', function (event) {
    //  console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Flow.js
   // flowFactoryProvider.factory = fustyFlowFactory;
}]);


