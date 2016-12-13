'use strict';

angular.module('myApp.loginVerification', ['ngRoute','ngMaterial', 'ngMessages'])



.controller('loginVerificationCtrl', function($scope,$mdDialog, $mdMedia,$rootScope, $routeParams,$http,$location) {

     $scope.user = {
      email: '',
      Password: '',
      verificationCode: ''
      
    };
$scope.validate = function(ev) {
   
 $scope.email = $routeParams.email;
  $scope.token = $routeParams.token;
   //console.log($scope.email+" "+$scope.token);
$scope.email = $routeParams.email;
  $scope.token = $routeParams.token;
  $scope.user.email =$scope.email;
  $scope.user.verificationCode =$scope.token;
   //console.log($scope.email+" "+$scope.token);
   var datai =  
        {
            'email' : $scope.email,
            'verificationCode' : $scope.token
        };
        //register_validation
         $http.post('backend/loginVerificationCode.php', datai)
        .success(function(data, status, headers, config)
        {
            console.log(status + ' - ' +data );
            console.log(data);
            var validator =JSON.parse(data);
            if(validator == "fail"){
             

             $scope.showAlert = function(ev){
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent('Please Contact Customer Support for help')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('ok!')
                    .targetEvent(ev)
                );
             };
              $scope.showAlert();
            }
            else{
                  //register
                    
                        
                            //prompt
                           $scope.loginVerificationPrompt = function(ev) {

                           
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak ng-controller="registerCtrl" >'+
                          '<form>'+
                           ' <md-toolbar>'+
                              '<div class="md-toolbar-tools">'+
                                '<h2>Welcome To ApeKade</h2>'+
                                '<span flex></span>'+
                                '<md-button class="md-icon-button" ng-click="cancel()">'+
                                  '<md-icon md-svg-src="logo_animated.svg" aria-label="Close dialog"></md-icon>'+
                               ' </md-button>'+
                              '</div>'+
                           '</md-toolbar>'+
                           '<md-dialog-content>'+

                             '<div class="md-dialog-content">'+
                           '<center><h2 >Your account has been successfully verified</h2></center>'+                      
                           ' </md-dialog-content>'+
                           ' <md-dialog-actions layout="row">'+
                            '  <span flex></span>'+
                            "  <md-button  ng-click='"+"cancel()"+"' >"+
                            '   OK'+
                             ' </md-button>'+
                            
                           ' </md-dialog-actions>'+
                         ' </form>'+
                        '</md-dialog>',
                              controller: function($scope, $mdDialog) {

                                                $scope.hide = function() {
                                                    $mdDialog.hide();

                                                };

                                                $scope.cancel = function() {

                                                    $mdDialog.cancel();

                                                     $location.path('/login');

                                                };

                                            },
                              parent: angular.element(document.body),
                              targetEvent: ev,
                              clickOutsideToClose:true,
                              fullscreen: useFullScreen
                            })
                            .then(function(answer) {
                              $scope.status = 'You said the information was "' + answer + '".';
                            }, function() {
                              $scope.status = 'You cancelled the dialog.';
                            });
                            $scope.$watch(function() {
                              return $mdMedia('xs') || $mdMedia('sm');
                            }, function(wantsFullScreen) {
                              $scope.customFullscreen = (wantsFullScreen === true);
                            });
                          };
                            //prompt

                          $scope.loginVerificationPrompt();

                   

                }
    

        })
        .error(function(data, status, headers, config)
        {
            console.log('error');
        });
                   



  };

 
})

.config(['$routeProvider','$mdThemingProvider', function($routeProvider,$mdThemingProvider,$locationProvider) {
 


 $routeProvider.when('/loginVerification', {
            templateUrl: './loginVerification/loginVerification.html',
            controller: 'loginVerificationCtrl'
        });
}])