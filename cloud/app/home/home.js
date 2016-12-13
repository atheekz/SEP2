'use strict';

angular.module('myApp.home', ['ngRoute','ngMaterial', 'ui.tree','ui.bootstrap','ngMessages',
  'ng-fusioncharts','angular.filter','flow','ngSanitize','oitozero.ngSweetAlert'/*'ngQuill'*/])


.config(['$routeProvider','$mdThemingProvider','flowFactoryProvider', function($routeProvider,$mdThemingProvider,flowFactoryProvider) {
 
$mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  $routeProvider.when('/', {
    templateUrl: './home/home.html',
    controller: 'homeCtrl'
  });

    flowFactoryProvider.defaults = {
      target: 'http://localhost:3000/api/upload',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Flow.js
    //flowFactoryProvider.factory = fustyFlowFactory;
}])

.controller('homeCtrl', function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location,filterFilter,SweetAlert, $sce,$interval) {


  /*
  *
  *chat interval update   'userId': JSON.parse( localStorage.getItem("userId") subject_id : $rootScope.itemForAnnouncement.productId
  */
var global_config ="pc";
$rootScope.messages_question =[];
$rootScope.messages_question_count =0;
 $scope.date = new Date();
/*
*
*gert results
*
*/
$rootScope.return_question_id = [];
$rootScope.answersr = [];

$scope.getResults =function(item)   {
  
 var datai={qid :  item.return_question_id.question_ID};

  
      $http.post('http://'+global_config+':3000/get/getsanswers', datai)
                    .success(function(datai, status, headers, config)
                    {
                           //console.log("student test");
                     // $rootScope.messages_question.push(data);
                    // $rootScope.answersr.push(data);
                   //  console.log(datai);

var x;
for(x = 0 ;x<datai.length;x++ ){
  datai[x].value =datai[x].value +'';
}
 $rootScope.dataForgraph = [];
 $rootScope.dataForgraph = datai;
                    $rootScope.myDataSource = {
    chart: {
        caption: item.questionNo,
        subCaption:"Report Summary",
        numbersuffix: " Students",
        theme: "ocean"
    },
    data: $rootScope.dataForgraph
};

$rootScope.myDataSource2 = {
    chart: {
        caption: item.questionNo,
        subCaption: "Report Summary",
        startingangle: "120",
        showlabels: "0",
        showlegend: "1",
        enablemultislicing: "0",
        slicingdistance: "15",
        showpercentvalues: "1",
        showpercentintooltip: "0",
        plottooltext: "$label Total Students : $datavalue",
        theme: "ocean"
    },
    data: $rootScope.dataForgraph
}
            $rootScope._graph_show= true;         
                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
//  }


};
   $rootScope.myDataSource = {
    chart: {
        caption: "Question 1",
        subCaption: "greatest club?",
        numbersuffix: " Students",
        theme: "ocean"
    },
    data: $rootScope.dataForgraph
};

$rootScope.myDataSource2 = {
    chart: {
        caption: "Question 1",
        subcaption: "greatest club?",
        startingangle: "120",
        showlabels: "0",
        showlegend: "1",
        enablemultislicing: "0",
        slicingdistance: "15",
        showpercentvalues: "1",
        showpercentintooltip: "0",
        plottooltext: "$label Total Students : $datavalue",
        theme: "ocean"
    },
    data: $rootScope.dataForgraph
}

/*
*
*notify user 
*
*/
var var_1=$interval(function(){
    var datai={sid :  (localStorage.getItem("currentSubjectid")).replace(/\"/g, "")};
   // console.log(datai);
      $http.post('http://'+global_config+':3000/get/squestion', datai)
                    .success(function(data, status, headers, config)
                    {
                      //console.log("student test");
                     // $rootScope.messages_question.push(data);
                     $rootScope.messages_question =data;
                      $rootScope.messages_question_count = $rootScope.messages_question.length;
                     // console.log($rootScope.messages_question);
                     
                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
},15000);




 $scope.questions=[];

  $scope.testhttp =function(){
    var datai={empName : "dasdasdasd",roleId : 1 ,deptId : 2};
      $http.post('http://localhost:3000/add/v1/createEmployee', datai)
                    .success(function(data, status, headers, config)
                    {
                      console.log(data);
                     
                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
  //  }
  };



$scope.data={};
$scope.search='';
$rootScope.userDetailsforCheckout=[];
//$scope.data.cb2 = true;
//$scope.userLogedIn = false;
//$rootScope.userDetails;
$scope.userLogedIn= false;
$scope.userList;
$scope.userListCatergoryChecked ={
  selected : {}
};
$scope.productList =[];
$scope.userCartList = [];

//$scope.userLogedIn = false;
   $scope.user={
                name : '',
                token : '' 
                                                 };


/**
*
*show_stuent_messages
*
*/
$scope.show_stuent_messages = function(x){  
    $scope.load = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({
 clickOutsideToClose:false,
                              template: ''+
                              '<md-toolbar md-scroll-shrink>'+
    '<div class="md-toolbar-tools">New Question From '+x.username+'</div>'+
  '</md-toolbar>'+

  '<md-content style="height: 200px;" md-theme="altTheme">'+

   ' <section>'+
      '<center><md-subheader class="md-primary">'+x.question+'</md-subheader></center>'+
 
                     /*     ' <md-input-container class="md-block" > '+
                            '<label>Search</label>  '+
                            '<input  ng-model="searchss"> '+
                         ' </md-input-container>'+ 
                         ' <md-input-container class="md-block" > '+
                          '<center><md-checkbox class="md-secondary" ng-model="select_All" ng-click="SelectAll()">Select All</md-checkbox></center>'+*/
                       /*  ' </md-input-container>'+
         '<md-input-container class="md-block">'+
          '<label>reply</label>'+
          '<textarea ng-model="user.biography" md-maxlength="150" rows="8" md-select-on-focus></textarea>'+
        '</md-input-container>'+
        '<md-button class="md-raised md-primary" style="    float:left" ng-click="Savelist()">Reply</md-button>'+*/
/*
      '<md-subheader class="md-primary"> <input type="button"  ng-model="SAVE"> SAVE</md-subheader>'+*/
    '</section>'+


  '</md-content>',
                              controller: function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) {


  var dataeei={question :  x.question };
   // console.log(datai);
      $http.post('http://'+global_config+':3000/add/readsquestion', dataeei)
                    .success(function(data, status, headers, config)
                    {
                      //console.log("student test");
                     // $rootScope.messages_question.push(data);
                  console.log("read");
                     // console.log($rootScope.messages_question);
                     
                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });


    var datai={sid :  (localStorage.getItem("currentSubjectid")).replace(/\"/g, "")};
            $http.post('http://'+global_config+':3000/get/squestion', datai)
                    .success(function(data, status, headers, config)
                    {
                      //console.log("student test");
                     // $rootScope.messages_question.push(data);
                     $rootScope.messages_question =data;
                      $rootScope.messages_question_count = $rootScope.messages_question.length;
                     // console.log($rootScope.messages_question);
                     
                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

$scope.select_All == false;
  var imagePath = 'logo-pd-2.png';
   

    $scope.SelectAll =function(){
      var objects = $scope.messages;

        for (var i = 0; i < objects.length; i++) {
          if($scope.select_All == false){
            if (objects[i].enabled === false) {
                objects[i].enabled = true;
                
            }
        }
        else{
        if (objects[i].enabled === true) {
                objects[i].enabled = false;
                
            }
      }
      }

    };      

        $scope.Savelist = function() {
                                                           // console.log($scope.selected);
                          $rootScope.users_announcements = $scope.messages;    
                          $rootScope.itemForAnnouncement =item;    
                           console.log( $rootScope.users_announcements); 
                           console.log(  $rootScope.itemForAnnouncement);                        
                              $mdDialog.cancel();
                        

                                                          };                                              
                                                         
                                     /*
                                            get cart list 
                                            */
                                            $scope.loadCartList2=function(){
                                                var senddata = {
                                                                        
                                                                        userId : JSON.parse( localStorage.getItem("userId") )
                                                                };
                                               
                                                $http.post('backend/loadCartList.php',senddata)
                                                                .success(function(data, status, headers, config)
                                                                {
                                                                    $scope.userCartList = data;
                                                                    console.log(status + ' loadCartList loaded - '  );
                                                              if($scope.userCartList.validator == "fail"){
                                                                  //if(data.validator == undefined){
                                                                    $scope.userCartList=[];
                                                                     console.log(data);
                                              
                                                                  }
                                                                    else{
                                                                   
                                                                  
                                                                   // console.log(data);
                                                                    //console.log( $scope.userList.validator);
                                                                   
                                                                        //prompt
                                                                     
                                                                      }
                                                                  

                                                                })
                                                                .error(function(data, status, headers, config)
                                                                {
                                                                    console.log('error');
                                                                });

                                            };

                                            $scope.loadCartList2();
                                            $scope.check =function(value,model){
                                              //console.log(value);
                                             // console.log(model);
                                              if(value == 'true'){
                                                //$scope.data.model =true;
                                                $scope.userListCatergoryChecked.selected[model] = true;
                                              //  console.log($scope.userListCatergoryChecked.selected[model]);
                                              }

                                            };

                                         
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
                                                          
                                                            $mdDialog.cancel();
                        

                                                          };

                                            },
                              parent: angular.element(document.body),
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
                        
                            //prompt

         }
           $scope.load();

};
  


/*
*
*
*right click list of courses
*
*/
    /*$scope.otherMenuOptions = [
          ['Favorite Color', function ($itemScope, $event, color) {
              alert(color);
          }]
      ]*/

      // With a custom static string:
var customHtml = '<div  onMouseOver="this.style.color=\'#D32F2F\'"  onMouseOut="this.style.color=\'#000000\'" style="cursor: pointer;">' +
                 '  <i class="fa fa-trash" aria-hidden="true"></i>   Remove from list</div>';
var customHtmlActive = '<div  onMouseOver="this.style.color=\'#D32F2F\'"  onMouseOut="this.style.color=\'#000000\'" style="cursor: pointer;">' +
                 '  <i class="fa fa-play" aria-hidden="true"></i>  Commence Lecture</div>';

var customHtmlConclude = '<div  onMouseOver="this.style.color=\'#D32F2F\'"  onMouseOut="this.style.color=\'#000000\'" style="cursor: pointer;">' +
                 '  <i class="fa fa-stop" aria-hidden="true"></i>  Conclude Lecture</div>';
var customHtmlquestionnaire = '<div  onMouseOver="this.style.color=\'#D32F2F\'"  onMouseOut="this.style.color=\'#000000\'" style="cursor: pointer;">' +
                 '  <i class="fa fa-question-circle" aria-hidden="true"></i>   Create a questionnaire</div>';
var customHtmlShareFile = '<div  onMouseOver="this.style.color=\'#D32F2F\'"  onMouseOut="this.style.color=\'#000000\'" style="cursor: pointer;">' +
                 '  <i class="fa fa-share-alt" aria-hidden="true"></i>   Share files</div>';
var customHtmlannouncement = '<div  onMouseOver="this.style.color=\'#D32F2F\'"  onMouseOut="this.style.color=\'#000000\'" style="cursor: pointer;">' +
                 '  <i class="fa fa-bullhorn" aria-hidden="true"></i>   Make an announcement</div>';

var customItem = {
    html: customHtml,
    enabled: function() {return true},
    click: function ($itemScope, $event, value,item) {
       // alert("custom html");
       var item = $itemScope.item;
        console.log($itemScope.item);
        console.log($itemScope.item.productName);
       $scope.loading = true;
        $scope.loadingPromt = function(ev) {

                           if($scope.loading == true){
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak  >'+
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
                               ' </md-button></center></div>'+             
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
       
 $scope.loadingPromt();
        var datai =  
        {
            'userId': JSON.parse( localStorage.getItem("userId") ),
            'userEmail': JSON.parse( localStorage.getItem("userEmail") ),
                
            'item' :item
            
        };
                    $http.post('backend/removefromCart.php', datai)
                    .success(function(data, status, headers, config)
                    {
                        $scope.loading = false;
                        $scope.loadingPromt();
                       // console.log(status + ' - ' +data );
                        //console.log(data);
                            //prompt

                            if( localStorage.getItem("currentSubjectid") == item.productId  ){
          SweetAlert.swal(localStorage.getItem("currentSubjectName") +" Successfully Concluded ", "", "success");  }
          else{
            SweetAlert.swal(item.productName +" Successfully Removed ", "", "success");  
          }              
      localStorage.setItem("currentSubjectid",JSON.stringify(""));
      
      localStorage.setItem("currentSubjectName",JSON.stringify(""));

                          
                           $scope.showlist(); 
                         $rootScope.loadCartList();
                         $rootScope.loadProductList();
                          $scope.loadCartList();
                           $mdDialog.cancel();

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
        
    }};

//create a quiz
var customQuiz = {
    html: customHtmlquestionnaire,
    enabled: function() {return true},
    click: function ($itemScope, $event, value,item) {
       // alert("custom html");

        console.log($itemScope.item);
        console.log($itemScope.item.productName);
     $scope.questionnaire($itemScope.item);
        
    }};

//announcements
var customAnnouncement = {
    html: customHtmlannouncement,
    enabled: function() {return true},
    click: function ($itemScope, $event, value,item) {
       // alert("custom html");

        console.log($itemScope.item);
        console.log($itemScope.item.productName);
       $scope.popAnnouncements($itemScope.item);
     // $scope.test($itemScope.item);
        
    }};

//Share files
var customShare = {
    html: customHtmlShareFile,
    enabled: function() {return true},
    click: function ($itemScope, $event, value,item) {
       // alert("custom html");

        console.log($itemScope.item);
        console.log($itemScope.item.productName);
       $scope.ShareFiles($itemScope.item);
       
        
    }};
//active lecture
var customActive = {
    html: customHtmlActive,
    enabled: function() {return true},
    click: function ($itemScope, $event, value,item) {
       // alert("custom html");

        console.log($itemScope.item);
        console.log($itemScope.item.productName);
       $scope.SetLecture($itemScope.item);
       
        
    }};

//conclude lecture 

var customdisable = {
    html: customHtmlConclude,
    enabled: function() {return true},
    click: function ($itemScope, $event, value,item) {
       // alert("custom html");

        console.log($itemScope.item);
        console.log($itemScope.item.productName);
       if(localStorage.getItem("currentSubjectid") == '"'+$itemScope.item.productId+'"' ){
  localStorage.setItem("currentSubjectid",JSON.stringify(""));
      
      localStorage.setItem("currentSubjectName",JSON.stringify(""));

SweetAlert.swal( " Successfully Concluded!", "", "success");
       }
       else{

SweetAlert.swal("Please make sure you have Commenced a lecture to conclude ", "", "error");
       }
       
        
    }};
// With a custom function returning a string:
var customItem2 = {
    html: function($itemScope) {
        return $itemScope.lastname + ' ' + $itemScope.firstname;
    },
    enabled: function() {return true},
    click: function ($itemScope, $event, value) {
        alert("custom html");
    }
};

$scope.otherMenuOptions = [customActive,customdisable,customItem, customQuiz,customShare,customAnnouncement/*,
    ['Example 1', function ($itemScope, $event, value) {
        alert("Example 1" +value);
    }]*/]
/*$scope.otherMenuOptions = [
    [function ($itemScope, $event, modelValue, text, $li) {
        return $item.name;
        productId
:
"1"
productName
:
"SPDC"
    }, function ($itemScope, $event) {
        // Action
    }, function($itemScope, $event, modelValue, text, $li) {
        // Enable or Disable
        return true; // enabled = true, disabled = false
    }]
];*/

  /*  $scope.otherMenuOptions = [
    ['Select', function ($itemScope, $event, modelValue, text, $li) {
        $scope.selected = $itemScope.item.name;
    }],
    null, // Dividier
    ['Remove', function ($itemScope, $event, modelValue, text, $li) {
        $scope.items.splice($itemScope.$index, 1);
    }]
];*/
/*$scope.otherMenuOptions = function (item) {
    if (item.name == 'SPDC') { return []; }
    return [
        [function ($itemScope) {
            console.log(item);
        }, function ($itemScope) {
            // Action
        }]
    ];
};*/
/*
*
*Add to CArt
*
*/
$scope.valueitem ={
  selected :{}
};

$scope.addToCart = function(item,quantity){
console.log(item);
console.log(quantity);
 $scope.loading = true;
        $scope.loadingPromt = function(ev) {

                           if($scope.loading == true){
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak  >'+
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
                               ' </md-button></center></div>'+             
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
       
 $scope.loadingPromt();
        var datai =  
        {
            'userId': JSON.parse( localStorage.getItem("userId") ),
            'userEmail': JSON.parse( localStorage.getItem("userEmail") ),
                
            'item' :item,
            'quantity' : quantity
            
        };
                    $http.post('backend/addToCart.php', datai)
                    .success(function(data, status, headers, config)
                    {
                        $scope.loading = false;
                        $scope.loadingPromt();
                       // console.log(status + ' - ' +data );
                        //console.log(data);
                            //prompt
                          
                          
                           $scope.showlist(); 
             $rootScope.loadCartList();
             $rootScope.loadProductList();
              $scope.loadCartList();
               $mdDialog.cancel();

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
};
/*
*remove from cart
*/
$scope.removefromCart = function(item,quantity){
console.log(item);
console.log(quantity);
//alert("sad");
 $scope.loading = true;
        $scope.loadingPromt = function(ev) {

                           if($scope.loading == true){
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak  >'+
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
       
 $scope.loadingPromt();
        var datai =  
        {
            'userId': JSON.parse( localStorage.getItem("userId") ),
            'userEmail': JSON.parse( localStorage.getItem("userEmail") ),
                
            'item' :item,
            'quantity' : quantity
            
        };
                    $http.post('backend/removefromCart.php', datai)
                    .success(function(data, status, headers, config)
                    {
                        $scope.loading = false;
                        $scope.loadingPromt();
                       // console.log(status + ' - ' +data );
                        //console.log(data);
                            //prompt
                               if( localStorage.getItem("currentSubjectid") == item.productId  ){
          SweetAlert.swal(localStorage.getItem("currentSubjectName") +" Successfully Concluded ", "", "success");  }
          else{
            SweetAlert.swal(item.productName +" Successfully Removed ", "", "success");  
          }  
                          localStorage.setItem("currentSubjectid",JSON.stringify(""));
      
      localStorage.setItem("currentSubjectName",JSON.stringify(""));

                           $scope.showlist(); 
                         $rootScope.loadCartList();
                         $rootScope.loadProductList();
                          $scope.loadCartList();
                           $mdDialog.cancel();

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
};
//
/*
*editCart
*/
$scope.editCart = function(item,quantity){
console.log(item);
console.log(quantity);
//alert("sad");
 $scope.loading = true;
        $scope.loadingPromt = function(ev) {

                           if($scope.loading == true){
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak  >'+
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
       
 $scope.loadingPromt();
        var datai =  
        {
            'userId': JSON.parse( localStorage.getItem("userId") ),
            'userEmail': JSON.parse( localStorage.getItem("userEmail") ),
                
            'item' :item,
            'quantity' : quantity
            
        };
                    $http.post('backend/editCart.php', datai)
                    .success(function(data, status, headers, config)
                    {
                        $scope.loading = false;
                        $scope.loadingPromt();
                       // console.log(status + ' - ' +data );
                        //console.log(data);
                            //prompt
                          
                          
                           $scope.showlist(); 
                         $rootScope.loadCartList();
                         $rootScope.loadProductList();
                          $scope.loadCartList();
                           $mdDialog.cancel();

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
};
/*
*
*Search
*/

 // pagination controls
  $scope.currentPage ;
  $scope.totalItems;
  $scope.entryLimit ; // items per page
  $scope.noOfPages;


  $scope.search = '';

  $scope.$watch('search', function (newVal, oldVal) {
/* console.log($scope.items);*/
    $scope.filtered = filterFilter($scope.productList, newVal);  
    console.log(newVal);
    $scope.totalItems = $scope.filtered.length;
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    $scope.currentPage = 1;
  }, true);
$scope.filterSearch = function(searchVariable){
  $scope.search ='';
  $scope.search =searchVariable;
};
  $scope.resetFilters = function () {
    // needs to be a function or it won't trigger a $watch
    $scope.search = '';
  };
var loadcount = true;
     $scope.random = function() {
    console.log(loadcount);
      if(loadcount == true){
       
    var x = 0.5 - Math.random();
     loadcount = false;
     return x;
}
else{
  return 0;
}
  };


/*
get product list 
*/
$rootScope.loadProductList=function(){
   
    $http.post('backend/loadProducts.php')
                    .success(function(data, status, headers, config)
                    {
                        $scope.productList = data;
                        console.log(status + ' products loaded - ' +data );
                        //console.log(data);
                            //prompt
                         
 // pagination controls
              $scope.currentPage = 1;
              $scope.totalItems = $scope.productList.length;
              $scope.entryLimit = 6; // items per page
              $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                      

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

};
/*
get cart list 
*/
$rootScope.loadCartList=function(){
    var senddata = {
                            
                            userId : JSON.parse( localStorage.getItem("userId") )
                    };
   
    $http.post('backend/loadCartList.php',senddata)
                    .success(function(data, status, headers, config)
                    {
                        $scope.userCartList = data;
                        console.log(status + ' loadCartList loaded - '  );
                  if($scope.userCartList.validator == "fail"){
                      //if(data.validator == undefined){
                        $scope.userCartList=[];
                         console.log(data);
  
                      }
                        else{
                       
                      
                       // console.log(data);
                        //console.log( $scope.userList.validator);
                       
                            //prompt
                         
                          }
                      

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

};

/*
*checkWhetherAddedToTheCart
*/
$scope.checkWhetherAddedToTheCart =function(item){
  var returnx= false;
   angular.forEach($scope.userCartList, function(value, key){

         if(value.productId == item.id){
          // console.log("item added");
           returnx = true;
          
         }
       
         
         
         });
   return returnx;
};
$scope.getAddedItem =function(item){
 var returnx= [];
   angular.forEach($scope.userCartList, function(value, key){

         if(value.productId == item.id){
           
           returnx = value;
          
         }
       
         
         
         });
   //console.log(returnx);
   return returnx;
};
/*
get product list 
*/
          //User list 
$scope.userListCatergoryChecked ={
  selected : {}
};

$scope.check =function(value,model){
  //console.log(value);
 // console.log(model);
  if(value == 'true'){
    //$scope.data.model =true;
    $scope.userListCatergoryChecked.selected[model] = true;
  //  console.log($scope.userListCatergoryChecked.selected[model]);
  }

};
//User list 
$rootScope.showlist = function(){
  var senddata = {
                            
                            userId : JSON.parse( localStorage.getItem("userId") )
                    };
                    $http.post('backend/getList.php', senddata)
                    .success(function(data, status, headers, config)
                    {
                       $scope.userList = data;
                      if($scope.userList.validator == "fail"){
                      //if(data.validator == undefined){
                        $scope.userList=[];
                         console.log(data);
  
                      }
                        else{
                       
                        console.log(status + ' list- ' +data );
                       // console.log(data);
                        //console.log( $scope.userList.validator);
                       
                            //prompt
                         
                          }
                      

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

};
$rootScope.getUserDetails = function(){
  var senddata = {
                            
                            userId : JSON.parse( localStorage.getItem("userId") )
                    };
                    $http.post('backend/getUserDetails.php', senddata)
                    .success(function(data, status, headers, config)
                    {
                       $rootScope.userDetailsforCheckout = data;
                      if($rootScope.userDetailsforCheckout.validator == "fail"){
                      //if(data.validator == undefined){
                        $rootScope.userDetailsforCheckout=[];
                   
  
                      }
                        else{
                       
                        //console.log(status + ' user- ' +data );
                       //console.log(data);
                        //console.log( $scope.userList.validator);
                       
                            //prompt
                         
                          }
                      

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

};
//
//User list 
/*
*
*prompt notification 
*/
$scope.showPromptCity = function(ev) {
    
  //  console.log(localStorage.getItem("userName"));
   //  $location.path('/');
   /*  $rootScope.userDetails={
                name : JSON.parse( localStorage.getItem("userName") ),
                token : JSON.parse( localStorage.getItem("userToken") )
                                                 };
                                                 console.log( $rootScope.userDetails);*/
   
      if( localStorage.getItem("userName") != null || localStorage.getItem("userToken") != null ){
                                                 $scope.user={
                name : JSON.parse( localStorage.getItem("userName") ),
                token : JSON.parse( localStorage.getItem("userToken") )
                                                 };
                                                 console.log( $scope.user);
             $scope.userLogedIn = true;
             $rootScope.showlist(); 
             $rootScope.loadCartList();
             $rootScope.loadProductList();
              $scope.loadCartList();
               $rootScope.getUserDetails();
             

                  
                                              
  }


  };

   $scope.states = ('Kandy ( Zip Code :20801 ) & Kantugastota( Zip:20800 ) & Colombo ').split('&').map(function(state) {
        return {abbrev: state};


      });

/*   $scope.pagination=function(){
    // pagination controls
              $scope.currentPage = 1;
              $scope.totalItems = $scope.productList.length;
              $scope.entryLimit = 6; // items per page
              $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
   };*/
  /*
  *
  *finish user destination
  *
  */
//console.log("sad");
$scope.logout = function(){
  
  $scope.userList = [];
localStorage.clear();
$scope.showAlert = function(ev){
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Successfully Logged-Out')
                    .textContent(' ')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('ok!')
                    .targetEvent(ev)
                );
             };
              $scope.showAlert();
                 $rootScope.showlist(); 
             $rootScope.loadCartList();
             $rootScope.loadProductList();
              $scope.loadCartList();
               $rootScope.getUserDetails();
$location.path('/');
     $scope.userLogedIn = false;

};


$scope.goToLogin = function(){
  $location.path('/login');
};
$scope.goToRegister = function(){
  $location.path('/register');
};



/*
*
*Active lecture
*
*/
     
    $scope.SetLecture=function(item){
      //SetLecture pproductId prouctName
    if( localStorage.getItem("currentSubjectid") == '""'  ){
      localStorage.setItem("currentSubjectid",JSON.stringify(item.productId));
      
      localStorage.setItem("currentSubjectName",JSON.stringify(item.productName));

  SweetAlert.swal(item.productName+" Successfully Commenced!", "", "success");
    }
    else {
  SweetAlert.swal("Please conclude the current lecture "+localStorage.getItem("currentSubjectName"), "", "error");
    }
    };
/*
*
*share fils
*
*/

$scope.testfile = function(files){
console.log(files);
 angular.forEach(files, function(flowFile, i){
       var fileReader = new FileReader();
          fileReader.onload = function (event) {
            var uri = event.target.result;
            //  $scope.imageStrings[i] = uri;   
            var datai={
              url : uri,
            sid :  (localStorage.getItem("currentSubjectid")).replace(/\"/g, "") ,
             mname : "test" 
          };
                $http.post('http://'+global_config+':3000/add/smaterial', datai)
                    .success(function(data, status, headers, config)
                    {
                      //console.log("student test");
                     // $rootScope.messages_question.push(data);
                    console.log("finally");
                     // console.log($rootScope.messages_question);
                     
                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
          };
          fileReader.readAsDataURL(flowFile.file);
    });
};    

$rootScope._Share_files_show=false;
$scope.ShareFiles=function(item){
$rootScope._Announcements_show=false;
//$rootScope._Announcements_show=false;
                                                                    $rootScope._quiz_show_answers =true;
                                                                    $rootScope._quiz_show_answers_ongoing=true;
                                                                    $rootScope._quiz_show=false;
                         $rootScope._Share_files_show=true;
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({
 clickOutsideToClose:false,
                              template: ''+
                              '<md-toolbar md-scroll-shrink>'+
    '<div class="md-toolbar-tools">Select Students</div>'+
  '</md-toolbar>'+

  '<md-content style="height: 600px;" md-theme="altTheme">'+

   ' <section>'+
      '<md-subheader class="md-primary">Enrolled Strudents         <md-button class="md-raised md-primary" style="    margin-left: 175px;" ng-click="Savelist()">SAVE</md-button></md-subheader>'+
 
                          ' <md-input-container class="md-block" > '+
                            '<label>Search</label>  '+
                            '<input  ng-model="searchss"> '+
                         ' </md-input-container>'+ 
                         ' <md-input-container class="md-block" > '+
                          '<center><md-checkbox class="md-secondary" ng-model="select_All" ng-click="SelectAll()">Select All</md-checkbox></center>'+
                         ' </md-input-container>'+
      '<md-list layout-padding>'+
        '<md-list-item class="md-3-line" ng-repeat="message in messages |filter :searchss">'+
        ' <md-switch class="md-secondary" ng-model="message.enabled"></md-switch>'+
            '<img ng-src="{{message.face}}" class="md-avatar" alt="{{message.who}}">'+
            '<div class="md-list-item-text">'+
              '<h3>{{message.what}}</h3>'+
              '<h4>{{message.who}}</h4>'+
              '<p>'+
                '{{message.notes}}'+
              '</p>'+
            '</div>'+
        '</md-list-item>'+
      '</md-list>'+
/*
      '<md-subheader class="md-primary"> <input type="button"  ng-model="SAVE"> SAVE</md-subheader>'+*/
    '</section>'+


  '</md-content>',
                              controller: function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) {




$scope.select_All == false;
  var imagePath = 'logo-pd-2.png';
    $scope.messages = [
      {
        face : imagePath,
        what: 'Basdasdekend?',
        who: 'Atheek',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Bruwqwnd?',
        who: 'Nipun',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunwqdwweekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
    ];

    $scope.SelectAll =function(){
      var objects = $scope.messages;

        for (var i = 0; i < objects.length; i++) {
          if($scope.select_All == false){
            if (objects[i].enabled === false) {
                objects[i].enabled = true;
                
            }
        }
        else{
        if (objects[i].enabled === true) {
                objects[i].enabled = false;
                
            }
      }
      }

    };      

        $scope.Savelist = function() {
                                                           // console.log($scope.selected);
                          $rootScope.users_announcements = $scope.messages;    
                          $rootScope.itemForAnnouncement =item;    
                           console.log( $rootScope.users_announcements); 
                           console.log(  $rootScope.itemForAnnouncement);                        
                              $mdDialog.cancel();
                        

                                                          };                                              
                                                         
                                     /*
                                            get cart list 
                                            */
                                            $scope.loadCartList2=function(){
                                                var senddata = {
                                                                        
                                                                        userId : JSON.parse( localStorage.getItem("userId") )
                                                                };
                                               
                                                $http.post('backend/loadCartList.php',senddata)
                                                                .success(function(data, status, headers, config)
                                                                {
                                                                    $scope.userCartList = data;
                                                                    console.log(status + ' loadCartList loaded - '  );
                                                              if($scope.userCartList.validator == "fail"){
                                                                  //if(data.validator == undefined){
                                                                    $scope.userCartList=[];
                                                                     console.log(data);
                                              
                                                                  }
                                                                    else{
                                                                   
                                                                  
                                                                   // console.log(data);
                                                                    //console.log( $scope.userList.validator);
                                                                   
                                                                        //prompt
                                                                     
                                                                      }
                                                                  

                                                                })
                                                                .error(function(data, status, headers, config)
                                                                {
                                                                    console.log('error');
                                                                });

                                            };

                                            $scope.loadCartList2();
                                            $scope.check =function(value,model){
                                              //console.log(value);
                                             // console.log(model);
                                              if(value == 'true'){
                                                //$scope.data.model =true;
                                                $scope.userListCatergoryChecked.selected[model] = true;
                                              //  console.log($scope.userListCatergoryChecked.selected[model]);
                                              }

                                            };

                                         
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
                                                          
                                                            $mdDialog.cancel();
                        

                                                          };

                                            },
                              parent: angular.element(document.body),
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
                        
                            //prompt

                         
};
/* $scope.test=function(item){

   $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'textEditor/testEditoe.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
$scope.showAdvanced();

 }
 ;
  function DialogController($scope,$rootScope, $mdDialog) {

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
     
   
  };*/
//popAnnouncements


/*var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block','image'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];
if($rootScope.coount_id_quiz == 0){
$rootScope.quill = new Quill('#'+x, {
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Compose ',
  theme: 'snow' // or 'bubble'
});
$rootScope.coount_id_quiz=$rootScope.coount_id_quiz+1;  






}*/
 /*Announcements 
 */
//share Add lect name , id , dep, lec hall and ect

$rootScope.coount_id_quiz = 0;
$rootScope._Announcements_show=false;
var x = 'object-quiz';

  $scope.SaveAnnouncement = function(){
//alert("sad");   //console.log($rootScope.quill.root.innerHTML);
var length= $rootScope.quill.getText().trim().length;
  if(length == 0){
     
      $scope.checkBodyAnnouncements =true;
  
  }
  else{

      $scope.checkBodyAnnouncements =false;
     console.log($rootScope.quill.root.innerHTML);
     SweetAlert.swal("Successfully saved!", "", "success");
     
     $scope.Announcements_title="";
    $rootScope.quill.setText('');
    $rootScope._Announcements_show=false;
  }

 };

/*$scope.checkBodyAnnouncements=function(){
  var length= $rootScope.quill.getText().trim().length;
  if(length == 0){
     angular.element(document.getElementById('SaveAnnouncements'))[0].disabled = true;
     
  
  }
  return true;
};*/
$scope.popAnnouncements=function(item){

$rootScope._Share_files_show=false;
$rootScope._Announcements_show=true;
                           $rootScope.itemForAnnouncement =item;
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({
 clickOutsideToClose:false,
                              template: ''+
                              '<md-toolbar md-scroll-shrink>'+
    '<div class="md-toolbar-tools">Select Students</div>'+
  '</md-toolbar>'+

  '<md-content style="height: 600px;" md-theme="altTheme">'+

   ' <section>'+
      '<md-subheader class="md-primary">Enrolled Strudents         <md-button class="md-raised md-primary" style="    margin-left: 175px;" ng-click="Savelist()">SAVE</md-button></md-subheader>'+
 
                          ' <md-input-container class="md-block" > '+
                            '<label>Search</label>  '+
                            '<input  ng-model="searchss"> '+
                         ' </md-input-container>'+ 
                         ' <md-input-container class="md-block" > '+
                          '<center><md-checkbox class="md-secondary" ng-model="select_All" ng-click="SelectAll()">Select All</md-checkbox></center>'+
                         ' </md-input-container>'+
      '<md-list layout-padding>'+
        '<md-list-item class="md-3-line" ng-repeat="message in messages |filter :searchss">'+
        ' <md-switch class="md-secondary" ng-model="message.enabled"></md-switch>'+
            '<img ng-src="{{message.face}}" class="md-avatar" alt="{{message.who}}">'+
            '<div class="md-list-item-text">'+
              '<h3>{{message.what}}</h3>'+
              '<h4>{{message.who}}</h4>'+
              '<p>'+
                '{{message.notes}}'+
              '</p>'+
            '</div>'+
        '</md-list-item>'+
      '</md-list>'+
/*
      '<md-subheader class="md-primary"> <input type="button"  ng-model="SAVE"> SAVE</md-subheader>'+*/
    '</section>'+

/*    '<section>'+
      '<md-subheader class="md-warn">Late Messages</md-subheader>'+
      '<md-list layout="column" layout-padding>'+
        '<md-list-item class="md-3-line" ng-repeat="message in messages">'+
         '<img ng-src="{{message.face}}" class="md-avatar" alt="{{message.who}}">'+
          '<div class="md-list-item-text">'+
            '<h3>{{message.what}}</h3>'+
            '<h4>{{message.who}}</h4>'+
            '<p>'+
              '{{message.notes}}'+
            '</p>'+
          '</div>'+
        '</md-list-item>'+
      '</md-list>'+
    '</section>'+

    '<section>'+
      '<md-subheader>Read Messages</md-subheader>'+
      '<md-list layout="column" layout-padding>'+
        '<md-list-item class="md-3-line" ng-repeat="message in messages">'+
         ' <img ng-src="{{message.face}}" class="md-avatar" alt="{{message.who}}">'+
          '<div class="md-list-item-text">'+
           ' <h3>{{message.what}}</h3>'+
            '<h4>{{message.who}}</h4>'+
            '<p>'+
             ' {{message.notes}}'+
            '</p>'+
          '</div>'+
        '</md-list-item>'+
      '</md-list>'+
    '</section>'+

    '<section>'+
      '<md-subheader class="md-accent">Archived messages</md-subheader>'+
      '<md-list layout="column" layout-padding>'+
        '<md-list-item class="md-3-line" ng-repeat="message in messages">'+
         ' <img ng-src="{{message.face}}" class="md-avatar" alt="{{message.who}}">'+
          '<div class="md-list-item-text">'+
           ' <h3>{{message.what}}</h3>'+
            '<h4>{{message.who}}</h4>'+
            '<p>'+
             ' {{message.notes}}'+
            '</p>'+
          '</div>'+
        '</md-list-item>'+
      '</md-list>'+
    '</section>'+*/

  '</md-content>',
                              controller: function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) {


var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block','image'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];
if($rootScope.coount_id_quiz == 0){
$rootScope.quill = new Quill('#'+x, {
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Compose ',
  theme: 'snow' // or 'bubble'
});
$rootScope.coount_id_quiz=$rootScope.coount_id_quiz+1;  
}
$scope.select_All == false;
  var imagePath = 'logo-pd-2.png';
    $scope.messages = [
      {
        face : imagePath,
        what: 'Basdasdekend?',
        who: 'Atheek',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Bruwqwnd?',
        who: 'Nipun',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunwqdwweekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        enabled : false,
        notes: " I'll be in your neighborhood doing errands"
      },
    ];

    $scope.SelectAll =function(){
      var objects = $scope.messages;

        for (var i = 0; i < objects.length; i++) {
          if($scope.select_All == false){
            if (objects[i].enabled === false) {
                objects[i].enabled = true;
                
            }
        }
        else{
        if (objects[i].enabled === true) {
                objects[i].enabled = false;
                
            }
      }
      }

    };      

        $scope.Savelist = function() {
                                                           // console.log($scope.selected);
                          $rootScope.users_announcements = $scope.messages;    
                          $rootScope.itemForAnnouncement =item;    
                           console.log( $rootScope.users_announcements); 
                           console.log(  $rootScope.itemForAnnouncement);                        
                              $mdDialog.cancel();
                        

                                                          };                                              
                                                         
                                     /*
                                            get cart list 
                                            */
                                            $scope.loadCartList2=function(){
                                                var senddata = {
                                                                        
                                                                        userId : JSON.parse( localStorage.getItem("userId") )
                                                                };
                                               
                                                $http.post('backend/loadCartList.php',senddata)
                                                                .success(function(data, status, headers, config)
                                                                {
                                                                    $scope.userCartList = data;
                                                                    console.log(status + ' loadCartList loaded - '  );
                                                              if($scope.userCartList.validator == "fail"){
                                                                  //if(data.validator == undefined){
                                                                    $scope.userCartList=[];
                                                                     console.log(data);
                                              
                                                                  }
                                                                    else{
                                                                   
                                                                  
                                                                   // console.log(data);
                                                                    //console.log( $scope.userList.validator);
                                                                   
                                                                        //prompt
                                                                     
                                                                      }
                                                                  

                                                                })
                                                                .error(function(data, status, headers, config)
                                                                {
                                                                    console.log('error');
                                                                });

                                            };

                                            $scope.loadCartList2();
                                            $scope.check =function(value,model){
                                              //console.log(value);
                                             // console.log(model);
                                              if(value == 'true'){
                                                //$scope.data.model =true;
                                                $scope.userListCatergoryChecked.selected[model] = true;
                                              //  console.log($scope.userListCatergoryChecked.selected[model]);
                                              }

                                            };

                                         
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
                                                          
                                                            $mdDialog.cancel();
                        

                                                          };

                                            },
                              parent: angular.element(document.body),
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
                        
                            //prompt

                         
};








//quiz function

$rootScope.coount_id_quiz_questionnaire = 0;

$rootScope.x=[];
$rootScope._quiz_show = false;
$rootScope._SelectAnswer= false;
$rootScope._quiz_show_answers= false;

/*var question = 'quiz_qustion_';*/
  $scope.quiz = function(){
//alert("sad");   //console.log($rootScope.quill.root.innerHTML);
var length= $rootScope.quill2.getText().trim().length;
  if(length == 0){
     
      $scope.checkBodyquiz =true;
  
  }
  else{

      $scope.checkBodyquiz =false;
     console.log($rootScope.quill.root.innerHTML);
     SweetAlert.swal("Successfully saved!", "", "success");
     
     $scope.Announcements_title="";
    $rootScope.quill.setText('');
    $rootScope._Announcements_show=false;
  }

 };

//checkbox

  $scope.items_checkbox = [1,2,3,4];
      $scope.selected_checkbox = [];

      $scope.toggle_checkbox = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      };

      $scope.exists_checkbox = function (item, list) {
        return list.indexOf(item) > -1;
      };



$scope.thisCanBeusedInsideNgBindHtml =function(data){

  var x =$sce.trustAsHtml(data);
console.log(data);
 return x; 
} 
/*$scope.checkBodyAnnouncements=function(){
  var length= $rootScope.quill.getText().trim().length;
  if(length == 0){
     angular.element(document.getElementById('SaveAnnouncements'))[0].disabled = true;
     
  
  }
  return true;
};*/
/*  '<div flex="50"  ng-repeat="item in items| filter:search:name">'+
              '<md-checkbox ng-checked="exists(item, selected_questions)" ng-click="toggle(item, selected_questions)">'+
              '  {{ item.name }} <span ng-if="exists(item, selected_questions)"><span style="color:#009688" >selected_questions</span></span>'+
             ' </md-checkbox>'+
             '</div>'+*/
/*
old
 $scope.selected_questions = [{"question_No":1,"qustion":"","answer_1":"","answer_2":"","answer_3":"","answer_4":"","correct_answer":""}];
                                                          $scope.toggle_selected_questions = function (item, list) {
                                                            var idx = list.indexOf(item);
                                                            if (idx > -1) {
                                                              list.splice(idx, 1);
                                                            }
                                                            else {
                                                              list.push(item);
                                                              console.log("asdsad");
                                                              console.log(list);
                                                            }
                                                          };
                                                          $scope.selected_questions_exists = function (item, list) {
                                                            return list.indexOf(item) > -1;
                                                          };
                                                          $scope.remove_selected_questions = function(index){
                                                              $scope.selected_questions.splice(index, 1);
                                                            };*/
                                                           //$scope.selected_questions = [{"question_No":"1","qustion":"","answer_1":"","answer_2":"","answer_3":"","answer_4":"","correct_answer":""}];
                                                             $scope.selected_questions = [];
                                                              $scope.selected_questions2 = [{}];
                                                             
                                                          $scope.toggle_selected_questions = function (item, list,id) {

                                                            var length= $rootScope.quill2.getText().trim().length;
                                                             if($scope.selected_checkbox.length == 0){
                                                              
                                                                $rootScope._SelectAnswer= true;
                                                             }
                                                             else if(length == 0){
                                                                 
                                                                  $scope.checkBodyquiz =true;
                                                              
                                                              }
                                                             else {
                                                                    $scope.checkBodyquiz =false;
                                                                     $rootScope._SelectAnswer= false;

                                                            var idx = $scope.selected_questions.indexOf(list);
                                                             //$rootScope.quizw(id);
                                                            console.log(idx);


                                                            //       console.log($rootScope.quill2.root.innerHTML);

//http dbhttp://localhost:8080/phpmyadmin/
// To Be saved
/*var senddata ={question :  JSON.stringify(object_question) , subject_id : $rootScope.itemForAnnouncement.productId}
                                    $http.post('http://pc:3000/add/question',senddata)
                                                                .success(function(data, status, headers, config)
                                                                {
                                                                   console.log("question addedsadsad");
                                                                  

                                                                })
                                                                .error(function(data, status, headers, config)
                                                                {
                                                                    console.log('error');
                                                                });*/

var db_sent_question = {
  sid    : (localStorage.getItem("currentSubjectid")).replace(/\"/g, ""),
  question : $rootScope.quill2.root.innerHTML,
  canswer  : ""+$scope.selected_checkbox,
  answer1 : list.answer_1,
  answer2 : list.answer_2,
  answer3 :list.answer_3,
  answer4 :list.answer_4
} 

                        $http.post('http://'+global_config+':3000/add/lquestion',db_sent_question)
                                                                .success(function(data, status, headers, config)
                                                                {
                                                                   //console.log("question added");
                                                                  $rootScope.return_question_id.push(data);


                                                                  var object_question = {
  questionNo : $rootScope.coount_id_quiz_questionnaire,
  qustion : $rootScope.quill2.root.innerHTML,
  answers : list,
  correct_answers :  $scope.selected_checkbox,
  Lec_Id : JSON.parse( localStorage.getItem("userId") ),
  Lec_Email : JSON.parse( localStorage.getItem("userEmail") ),
  Lec_Ename : JSON.parse( localStorage.getItem("userName") ),
  subject :  $rootScope.itemForAnnouncement,
  return_question_id : data
}
                                                           $scope.selected_questions.push(object_question);
                                                              console.log("asdsad");
                                                              console.log(object_question);

                                                                })
                                                                .error(function(data, status, headers, config)
                                                                {
                                                                    console.log('error');
                                                                });

                                                                     SweetAlert.swal("Successfully Added!", "", "success");
                                                                     
                                                                     $scope.Announcements_title="";

document.getElementById("answer_1").value = '';
document.getElementById("answer_2").value = '';
document.getElementById("answer_3").value = '';
document.getElementById("answer_4").value = '';
                                                                    $rootScope.quill2.setText('');
                                                                    $scope.selected_checkbox = [];
                                                                    $rootScope._Announcements_show=false;
                                                                    $rootScope._quiz_show_answers =true;
   $rootScope.coount_id_quiz_questionnaire =$rootScope.coount_id_quiz_questionnaire +1;//reset

                                                           /*   console.log("objecr sadasdsa");
                                                              console.log(  $scope.selected_questions);*/

                                                             }
                                                                                                                        // var idx = $scope.selected_questions.indexOf(list);
                                                                                                                        //  //$rootScope.quizw(id);
                                                                                                                        // console.log(idx);
                                                         /*   if(item== 0){*/
                                                           /* $scope.selected_questions[0].question_No="1";
                                                            $scope.selected_questions[0].qustion="qustion";
                                                            $scope.selected_questions[0].answer_1="a1";
                                                            $scope.selected_questions[0].answer_2="a2";
                                                            $scope.selected_questions[0].answer_3="a3";
                                                            $scope.selected_questions[0].answer_4="a4";
                                                            $scope.selected_questions[0].correct_answer="a";*/
                                                          /*  $scope.selected_questions.push(list);
                                                            console.log($scope.selected_questions);
                                                            }else{*/
                                                       /*     if (idx > -1) {
                                                              $scope.selected_questions.splice(idx, 1);
                                                            }
                                                            else {*/
                                                                                                                    //    $scope.selected_questions.push(list);
                                                                                                                    // console.log("asdsad");
                                                                                                                    // console.log(list);
                                                                                                                    //      console.log($rootScope.quill2.root.innerHTML);
                                                           // }
                                                          
                                                          };


    $scope.toggle_selected_questions_http = function (item, list,id) {

                                                            var length= $scope.selected_questions.length;
                                                             if($scope.selected_checkbox.length != 0 && $scope.selected_checkbox.length >= 0){
                                                              SweetAlert.swal("Please add a question ");
                                                             }
                                                      
                                                             else {
                                                              console.log("http");
                                                                    $scope.checkBodyquiz =false;
                                                                     $rootScope._SelectAnswer= false;

                                                            //var idx = $scope.selected_questions.indexOf(list);  'userId': JSON.parse( localStorage.getItem("userId") subject_id : $rootScope.itemForAnnouncement.productId)

var senddata ={question :  JSON.stringify($scope.selected_questions) , subject_id : $rootScope.itemForAnnouncement.productId}
                              /*      $http.post('http://pc:3000/add/question',senddata)
                                                                .success(function(data, status, headers, config)
                                                                {
                                                                   console.log("question addedsadsad");
                                                                  

                                                                })
                                                                .error(function(data, status, headers, config)
                                                                {
                                                                    console.log('error');
                                                                });*/


                                                                     SweetAlert.swal("Successfully Published!", "", "success");
                                                                     
                                                                     $scope.Announcements_title="";

document.getElementById("answer_1").value = '';
document.getElementById("answer_2").value = '';
document.getElementById("answer_3").value = '';
document.getElementById("answer_4").value = '';
                                                                    $rootScope.quill2.setText('');
                                                                    $scope.selected_checkbox = [];
                                                                    $rootScope._Announcements_show=false;
                                                                    $rootScope._quiz_show_answers =true;
                                                                    $rootScope._quiz_show_answers_ongoing=true;
                                                                    $scope.show_ongoing=$rootScope.itemForAnnouncement.productName;
                                                                    $rootScope._quiz_show=false;
   $rootScope.coount_id_quiz_questionnaire =$rootScope.coount_id_quiz_questionnaire +1;

                                                             }
                                                          
                                                          };



                                                          $scope.selected_questions_exists = function (item, list) {
                                                            return list.indexOf(item) > -1;
                                                          };
                                                          $scope.remove_selected_questions = function(index){
                                                              $scope.selected_questions.splice(index, 1);
                                                            };
$scope.questionnaire=function(item){

$rootScope._Share_files_show=false;
$rootScope._Announcements_show=false;
$rootScope._quiz_show = true;
                           $rootScope.itemForAnnouncement =item;
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({
 clickOutsideToClose:false,
                              template: ''+
                              '<md-toolbar md-scroll-shrink>'+
    '<div class="md-toolbar-tools">Select Students</div>'+
  '</md-toolbar>'+

  '<md-content style="height: 600px;" md-theme="altTheme">'+

   ' <section>'+
      '<md-subheader class="md-primary">Enrolled Strudents         <md-button class="md-raised md-primary" style="    margin-left: 175px;" ng-click="Savelist()">SAVE</md-button></md-subheader>'+
 
                          ' <md-input-container class="md-block" > '+
                            '<label>Search</label>  '+
                            '<input  ng-model="searchss"> '+
                         ' </md-input-container>'+ 
                         ' <md-input-container class="md-block" > '+
                          '<center><md-checkbox class="md-secondary" ng-model="select_All" ng-click="SelectAll()">Select All</md-checkbox></center>'+
                         ' </md-input-container>'+
      '<md-list layout-padding>'+
        '<md-list-item class="md-3-line" ng-repeat="message in messages |filter :searchss">'+
        ' <md-switch class="md-secondary" ng-model="message.enabled"></md-switch>'+
            '<img ng-src="./student.png" class="md-avatar" alt="{{message.who}}">'+
            '<div class="md-list-item-text">'+
              '<h3>{{message.username}}</h3>'+
              '<h4>{{message.s_id}}</h4>'+
              '<p>'+
                '{{message.notes}}'+
              '</p>'+
            '</div>'+
        '</md-list-item>'+
      '</md-list>'+
    '</section>'+



  '</md-content>',
                              controller: function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) {


var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block','image'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

var question = ['quiz_qustion_0'];
if($rootScope.coount_id_quiz_questionnaire == 0){
$rootScope.quill2 = new Quill('#'+question[0], {
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Question ',
  theme: 'snow' 
});
$rootScope.coount_id_quiz_questionnaire=$rootScope.coount_id_quiz_questionnaire+1;  
}


/*  $rootScope.quizw = function( id){
     question.push(id);
     console.log("qustion" + id);
     console.log("qustion" + question);

if($rootScope.coount_id_quiz_questionnaire == $rootScope.coount_id_quiz_questionnaire){
var x = id;
$rootScope.x = new Quill('#'+id, {
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Question ',
  theme: 'snow' 
});
$rootScope.coount_id_quiz_questionnaire=$rootScope.coount_id_quiz_questionnaire+1;  
}
   };
*/





    var datai={sid :  (localStorage.getItem("currentSubjectid")).replace(/\"/g, "")};
   // console.log(datai);
      $http.post('http://'+global_config+':3000/get/enrolledstudents', datai)
                    .success(function(data, status, headers, config)
                    {
                      $scope.messages = data;
                     
                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });


    $scope.SelectAll =function(){
      var objects = $scope.messages;

        for (var i = 0; i < objects.length; i++) {
          if($scope.select_All == false){
            if (objects[i].enabled == "false") {
                objects[i].enabled = true;
                
            }
        }
        else{
        if (objects[i].enabled == true) {
                objects[i].enabled = false;
                
            }
      }
      }

    };      

        $scope.Savelist = function() {
                                                           // console.log($scope.selected);
                          $rootScope.users_announcements = $scope.messages;    
                          $rootScope.itemForAnnouncement =item;    
                           console.log( $rootScope.users_announcements); 
                           console.log(  $rootScope.itemForAnnouncement);                        
                              $mdDialog.cancel();
                        

                                                          };                                              
                                                         
                                 
                                            $scope.check =function(value,model){
                                              //console.log(value);
                                             // console.log(model);
                                              if(value == 'true'){
                                                //$scope.data.model =true;
                                                $scope.userListCatergoryChecked.selected[model] = true;
                                              //  console.log($scope.userListCatergoryChecked.selected[model]);
                                              }

                                            };

                                         
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
                                                          
                                                            $mdDialog.cancel();
                        

                                                          };

                                            },
                              parent: angular.element(document.body),
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
                        
                            //prompt

                         
};



});
