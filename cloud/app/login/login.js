'use strict';

angular.module('myApp.login', ['ngRoute','ngMaterial', 'ngMessages'])




.controller('loginCtrl', function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) {
/*   $rootScope.userDetails={
                name : 'null',
                token : 'null'
                                                 };*/

    $scope.user = {
      
      email: '',
      password: ''
      
    };
$scope.Redirect=function(){
  //console.log(localStorage.getItem("userName"));
  if( localStorage.getItem("userName") != null || localStorage.getItem("userToken") != null ){
    //console.log(localStorage.getItem("userName"));
     $location.path('/');
  }
};
$scope.loading = false;

$scope.login = function(ev) {

          $scope.loading = true;
          $scope.loadingPromt = function(ev) {

                           if($scope.loading == true){
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak ng-controller="registerCtrl" >'+
                          '<form>'+
                           ' <md-toolbar>'+
                              '<div class="md-toolbar-tools">'+
                                '<h2>Loading . . . </h2>'+
                                '<span flex></span>'+
                                '<md-button class="md-icon-button" ng-click="cancel()">'+
                                  '<md-icon md-svg-src="logo_animated.svg"   aria-label="Close dialog"></md-icon>'+
                               ' </md-button>'+
                              '</div>'+
                           '</md-toolbar>'+
                           '<md-dialog-content>'+

                             '<div class="md-dialog-content">'+
                                   '<center><md-button  ng-click="cancel()">'+
                                  '<md-icon md-svg-src="finalLoading.svg" style="width:60px;height:60px;" aria-label="Close dialog"></md-icon>'+
                               ' </md-button></center>'+             
                           ' </md-dialog-content>'+
                           ' <md-dialog-actions layout="row">'+
                            '  <span flex></span>'+
                            
                           ' </md-dialog-actions>'+
                         ' </form>'+
                        '</md-dialog>',
                              parent: angular.element(document.body),
                              targetEvent: ev,
                              clickOutsideToClose:false,
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
                          }};
          //loading
          $scope.loadingPromt();

       var datai =  
        {
            'email' : $scope.user.email,
            'password' : $scope.user.password
        };
        //login_validation
         $http.post('backend/login.php', datai)
        .success(function(data, status, headers, config)
        {
            console.log(status + ' - '  );
            //console.log(data);
            var datareturn =data;
           // $rootScope.loginInfo =datareturn;   latest comment
            //console.log($rootScope.loginInfo);
             if(datareturn.validator == "failMailPass" || datareturn.validator == "fail"){
             

             $scope.showAlert = function(ev){
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Login Failed')
                    .textContent('Incorrect email address or password')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('ok!')
                    .targetEvent(ev)
                );
             };
              $scope.showAlert();
            }
            else if(datareturn.validator == "verificationCodeFail"){

             $scope.showAlert2 = function(ev){
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Verification Failed')
                    .textContent('Please verify your email first before trying to login')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('ok!')
                    .targetEvent(ev)
                );
             };
              $scope.showAlert2();
            }
           else if(datareturn.validator == "Firstsuccess"){
                  //login

                                  //localStorage.setItem("userDetails",JSON.stringify(data));

                                  localStorage.setItem("userId",JSON.stringify(data.id));
                                    localStorage.setItem("userValidator",JSON.stringify(data.validator));
                                                 localStorage.setItem("userEmail",JSON.stringify(data.email));
                                                 localStorage.setItem("userToken",JSON.stringify(data.token));
                                                 localStorage.setItem("userName",JSON.stringify(data.name));

      localStorage.setItem("currentSubjectid",JSON.stringify(""));
            localStorage.setItem("currentSubjectName",JSON.stringify(""));

                    /*                               $rootScope.userDetails={
                name : JSON.parse( localStorage.getItem("userName") ),
                token : JSON.parse( localStorage.getItem("userToken") )
                                                 };
                                                 console.log( $rootScope.userDetails);*/

                    
                            //prompt
                           $scope.loginCart = function(ev) {

                           
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak ng-controller="registerCtrl" >'+
                          '<form>'+
                           ' <md-toolbar>'+
                              '<div class="md-toolbar-tools">'+
                                '<h2>You can create categories of your products to help you organize your lists </h2>'+

                                '<span flex></span>'+
                                '<md-button class="md-icon-button" ng-click="cancel()">'+
                                  '<md-icon md-svg-src="logo_animated.svg" aria-label="Close dialog"></md-icon>'+
                               ' </md-button>'+
                              '</div>'+
                           '</md-toolbar>'+
                           '<md-dialog-content>'+

                             '<div class="md-dialog-content">'+
                           '<center>'+
                          ' <md-input-container class="md-block">'+
                            '<label>Search</label>'+
                            '<input  ng-model="search">'+
                         ' </md-input-container>'+
                                               '</center>'+  
                                                           //new
             '  <div layout="row"  layout-wrap flex>'+
             '<div style="border :2px solid #3f51b5; max-height: 150px;overflow: auto;width: 100%;">'+
            '<div flex="50"  ng-repeat="item in items| filter:search:name">'+
              '<md-checkbox ng-checked="exists(item, selected)" ng-click="toggle(item, selected)">'+
              '  {{ item.name }} <span ng-if="exists(item, selected)"><span style="color:#009688" >selected</span></span>'+
             ' </md-checkbox>'+
             '</div>'+
            '</div>'+

               '   <div flex="100">'+
           ' <h2 class="md-title">Selected Items</h2>'+
           '<div flex="50"  style="display: inline-block; padding: 0 25px;height: 50px;font-size: 16px;line-height: 50px;border-radius: 25px;background-color: #2c5baf; color: white;"'+
           ' ng-repeat="itemss in selected">{{itemss.name}}<span style="padding-left: 10px;color: #fff6f6;font-weight: bold;float: right;font-size: 20px;cursor: pointer;" ng-click="removeItem($index)">&times;</span></br>'+
         ' </div>'+
                                         //new                    
                           ' </md-dialog-content>'+
                           ' <md-dialog-actions layout="row">'+
                            '  <span flex></span>'+
                            "  <md-button style='background:#03A9F4;color:white;'  ng-click='"+"skip()"+"' >"+
                            '   SKIP'+
                             ' </md-button>'+
                              "  <md-button style='background:#03A9F4;color:white;'  ng-click='"+"cancel()"+"' >"+
                            '   SAVE'+
                             ' </md-button>'+
                            
                           ' </md-dialog-actions>'+
                         ' </form>'+
                        '</md-dialog>',
                              controller: function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) {

                                                          //$scope.items = ["asd","sad",3,4,5,"asdsadas","asdsadsaassd",32,42,52,"asdsaadas","asdsadqsaasd",31,41,51,"asdesadas","asdsad2saasd"];
                                                         //new
                                                            $http.post('backend/loadProducts.php', datai)
                                                              .success(function(data, status, headers, config)
                                                              {
                                                                 // console.log(status + ' - ' +data );
                                                                 // console.log(data);
                                                                 $scope.loading = false;
                                                                  $scope.items =data;
                                                                  var validator =data;
                                                                  if($scope.items.validator == "fail"){
                                                                   

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
                                                                              /*   $scope.loginVerificationPrompt = function(ev) {

                                                                                 
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

                                                                         
*/
                                                                      }
                                                          

                                                              })
                                                              .error(function(data, status, headers, config)
                                                              {
                                                                  console.log('error');
                                                              });
                  
                                                         //new
                                                          $scope.selected = [];
                                                          $scope.toggle = function (item, list) {
                                                            var idx = list.indexOf(item);
                                                            if (idx > -1) {
                                                              list.splice(idx, 1);
                                                            }
                                                            else {
                                                              list.push(item);
                                                            }
                                                          };
                                                          $scope.exists = function (item, list) {
                                                            return list.indexOf(item) > -1;
                                                          };
                                                          $scope.removeItem = function(index){
                                                              $scope.selected.splice(index, 1);
                                                            };
                                                          $scope.hide = function() {
                                                              $mdDialog.hide();

                                                          };
                                                          $scope.skip = function() {

                                                              $mdDialog.cancel();

                                                               $location.path('/');

                                                          };
                                                          $scope.cancel = function() {
                                                           // console.log($scope.selected);
                                                            var senddata = {
                                                                    itemsselected : $scope.selected,
                                                                    userId : JSON.parse( localStorage.getItem("userId") ),
                                                                    userEmail : JSON.parse( localStorage.getItem("userEmail") )
                                                            };
                                                            //console.log(senddata);
                                                             //$rootScope.itemsselected =datareturn;
                                                                                             $http.post('backend/updatelist.php', senddata)
                                                                                              .success(function(data, status, headers, config)
                                                                                              {
                                                                                                  console.log(status + ' -sadsa ' +data );
                                                                                                  console.log(data);
                                                                                                 $scope.loading = false;
                                                                                                  $scope.items =data;
                                                                                                  var validator =data;
                                                                                                  if($scope.items.validator == "fail"){
                                                                                                   

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
                                                                                                  
                                                                                                                                $mdDialog.cancel();

                                                                                                                                $location.path('/');

                                                                                              })
                                                                                              .error(function(data, status, headers, config)
                                                                                              {
                                                                                                  console.log('error');
                                                                                              });
                                                            
                        

                                                          };

                                            },
                              parent: angular.element(document.body),
                              targetEvent: ev,
                              clickOutsideToClose:false,
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

                          $scope.loginCart();

                   

                }
                else{

                  //$scope.loading = false;
                  //login
                                                 localStorage.setItem("userId",JSON.stringify(data.id));
                    
                                                 localStorage.setItem("userValidator",JSON.stringify(data.validator));
                                                 localStorage.setItem("userEmail",JSON.stringify(data.email));
                                                 localStorage.setItem("userToken",JSON.stringify(data.token));
                                                 localStorage.setItem("userName",JSON.stringify(data.name));
                                                 
      localStorage.setItem("currentSubjectid",JSON.stringify(""));
            localStorage.setItem("currentSubjectName",JSON.stringify(""));

                                                 /*  $rootScope.userDetails={
                name : JSON.parse( localStorage.getItem("userName") ),
                token : JSON.parse( localStorage.getItem("userToken") )
                                                 };
                                                 console.log( $rootScope.userDetails);*/
                                             /*    $rootScope.userDetails={
                                                  name : JSON.parse( localStorage.getItem("userName") ),
                                                  token : JSON.parse( localStorage.getItem("userToken") )
                                                 };*/

                                                // console.log($rootScope.userDetails);


//console.log(data.email);
                            //prompt
                           $scope.loginCity = function(ev) {
                              $scope.showAlertWelcome = function(ev){
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Welcome back '+JSON.parse( localStorage.getItem("userName") ))
                    .textContent('')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('ok!')
                    .targetEvent(ev)
                );
             };
              $scope.showAlertWelcome();
                            
                             $location.path('/');
                          };
                            //prompt

                          $scope.loginCity();

                   

                }

    

        })
        .error(function(data, status, headers, config)
        {
            console.log('error');
        });

  };


$scope.gotToRegister = function (){
 $location.path('/register');
};
  })
 
 .config(['$routeProvider','$mdThemingProvider','$locationProvider', function($routeProvider,$mdThemingProvider,$locationProvider) {

	   $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  $routeProvider.when('/login', {
    templateUrl: './login/login.html',
    controller: 'loginCtrl'
  });
}])
