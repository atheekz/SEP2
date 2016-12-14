'use strict';

angular.module('myApp.register', ['ngRoute','ngMaterial', 'ngMessages'])




.controller('registerCtrl', function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) {

$scope.Redirect=function(){
  //console.log(localStorage.getItem("userName"));
  if( localStorage.getItem("userName") != null || localStorage.getItem("userToken") != null ){
    console.log(localStorage.getItem("userName"));
     $location.path('/');
  }
};
  //$scope.showDialog = showDialog;
  $rootScope.items = [1,2,3];
  $scope.status = '  ';


   $scope.showPromptCity = function(ev) {
   

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
   '<center><h2 >Please Select Your City</h2></center>'+
        ' </md-input-container>'+
         '            <md-input-container class="md-block" flex-gt-sm>'+
          '            <label><i class="fa fa-map-signs" aria-hidden="true"></i> City</label>'+
           '           <md-select ng-model="user.state" ng-change=" "  required>'+
            '            <md-option ng-repeat="state in states" value="{{state.abbrev}}">'+
             '             {{state.abbrev}}'+
              '          </md-option>'+
               '       </md-select>'+
                '    </md-input-container>'+
                             /* ' <md-autocomplete'+
                        ' ng-disabled="isDisabled"'+
                        ' md-no-cache="noCache"'+
                        ' md-selected-item="selectedItem"'+
                        ' md-search-text-change="searchTextChange(searchText)"'+
                        ' md-search-text="searchText"'+
                        ' md-selected-item-change="selectedItemChange(item)"'+
                        ' md-items="item in querySearch(searchText)"'+
                        ' md-item-text="item.display"'+
                        ' md-min-length="0"'+
                        ' placeholder="What is your favorite US state?">'+
                      ' <md-item-template>'+
                       ' <span md-highlight-text="searchText" md-highlight-flags="^i">{{item.display}}</span>'+
                      ' </md-item-template>'+
                      ' <md-not-found>'+
                        ' No states matching "{{searchText}}" were found.'+
                        ' <a ng-click="newState(searchText)">Create a new one!</a>'+
                      ' </md-not-found>'+
                      ' </md-autocomplete>'+*/
   ' </md-dialog-content>'+
   ' <md-dialog-actions layout="row">'+
    '  <span flex></span>'+
    "  <md-button ng-click='update(user.state)' ng-disabled='!user.state' >"+
    '   OK'+
     ' </md-button>'+
    
   ' </md-dialog-actions>'+
 ' </form>'+
'</md-dialog>',
      
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
  
//new
  $scope.update = function(state) {
    $scope.user.state_selected = state;
   // alert($scope.user.state);
    $mdDialog.hide();
}

  $scope.errorconfirmpassword = true;
   $scope.user = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmpassword: '',
      state: '',
      address: ''
    };

    $scope.states = ('Kandy ( Zip Code :20801 ) & Kantugastota( Zip:20800 ) & Colombo ').split('&').map(function(state) {
        return {abbrev: state};
      });

  $scope.checkPassword = function(){
    if($scope.user.password == $scope.user.confirmpassword){
      $scope.errorconfirmpassword = true;
    }
    else
    {
      
      $scope.errorconfirmpassword = false;
    }
    return $scope.errorconfirmpassword ;
  };


  $scope.clearConfirmPassword = function(){

    $scope.user.confirmpassword = '';
  };
  //loading 
  $scope.loading = false;

  $scope.register = function() {
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
            'name' : $scope.user.name,
            'email' : $scope.user.email,
            'phone' : $scope.user.phone,
            'password' : $scope.user.password,
            'state' : $scope.user.state,
            'address' : $scope.user.address
        };
        //register_validation
         $http.post('backend/register_validation.php', datai)
        .success(function(data, status, headers, config)
        {

            console.log(status + ' - ' +data );
            console.log(data);
            var validator =JSON.parse(data);
            if(validator == "phoneNumberfalse"){
             // alert("phoneNumberfalse");

             $scope.showAlert = function(ev){
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Sorry')
                    .textContent('This phone number already exists.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('ok!')
                    .targetEvent(ev)
                );
             };
              $scope.showAlert();
            }
            else if(validator == "emailfalse"){
              //alert("emailfalse");
                $scope.showAlert = function(ev){
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Sorry')
                    .textContent('This email already exists.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('ok!')
                    .targetEvent(ev)
                );
             };
              $scope.showAlert();
            }
            else{
                  //register
                    $http.post('backend/register.php', datai)
                    .success(function(data, status, headers, config)
                    {
                        $scope.loading = false;
                        $scope.loadingPromt();
                        console.log(status + ' - ' +data );
                        console.log(data);
                            //prompt
                           $scope.registerPrompt = function(ev) {

                           
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
                           '<center><h2 >Congratulations you have successfully registered.</h2></center>'+
                           '<p>A verification email has been sent to your email address.If you do not receive the email please check your spam filter.</p>'+
                                                 
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

                          $scope.registerPrompt();

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

                }
    

        })
        .error(function(data, status, headers, config)
        {
            console.log('error');
        });
                    
    };
//test
/*function DemoCtrl ($timeout, $q, $log) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;
    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }
  
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    *
     * Build `states` list of key/value pairs
     
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  };
*/
//test




  })
 
 .config(['$routeProvider','$mdThemingProvider','$locationProvider', function($routeProvider,$mdThemingProvider,$locationProvider) {

	   $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  $routeProvider.when('/register', {
    templateUrl: './register/register.html',
    controller: 'registerCtrl'
  });
}])
