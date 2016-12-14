'use strict';

var admin = angular.module('myApp.admin', ['ngRoute','ngMaterial', 'ngMessages'])




admin.controller('adminCtrl', function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) 
{
/*   $rootScope.userDetails={
                name : 'null',
                token : 'null'
                                                 };*/

               
              $scope.gotoAddLec= function()
              {
                $location.path('/addLec');
              }


              $scope.gotoManageCourses=function()
              {
                $location.path('/manageCourses');
              }

                       // $http.post('backend/RegisterLecturer.php', datai)`
              
                    
                    
                    
                       $scope.insert=function()
                       {

                       
                          var  newlec = 
                          {
                            'name' : $scope.name,
                            'email' : $scope.email,
                            'password' : $scope.password
                            
                          };

                          $http.post('backend/RegisterLecturer.php', newlec)
                                                      

                           .success(function(data, status, headers, config)
                              {
                                   $scope.status = '  ';
                                   $scope.customFullscreen = false;

                                       $scope.showAlert = function(ev) 
                                       {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                      // Modal dialogs should fully cover application
                                      // to prevent interaction outside of dialog
                                            $mdDialog.show(
                                            $mdDialog.alert()
                                            .parent(angular.element(document.querySelector('#popupContainer')))
                                            .clickOutsideToClose(true)
                                           .title('Details of Lecturer Succefully Stored')
                                            // .textContent('You can specify some description text in here.')
                                          .ariaLabel('Success')
                                           .ok('Got it!')
                                            .targetEvent(ev)
                                          );
                                        };

                                      $scope.showAlert();

                              })
                              .error(function(data, status, headers, config)
                              {
                                          console.log('error');

                                     $scope.showAlert = function(ev) 
                                      {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                     // Modal dialogs should fully cover application
                                  // to prevent interaction outside of dialog
                                          $mdDialog.show(
                                            $mdDialog.alert()
                                          .parent(angular.element(document.querySelector('#popupContainer')))
                                          .clickOutsideToClose(true)
                                          .title('Something went Wrong ! ')
                                          // .textContent('You can specify some description text in here.')
                                         .ariaLabel('Error')
                                         .ok('Got it!')
                                          .targetEvent(ev)
                                        );
                                      };

                                    $scope.showAlert();   


                           //    });

                                  $scope.name='';
                                  $scope.email='';
                                  $scope.dept='';



                          console.log("details " + newlec.email);

                          
                       })

                     };


                       $scope.search=function()
                       {
                          var searchkey = 
                          {
                           'key' :$scope.name
                          };
                          console.log("search " + searchkey.key);

                           $http.post('backend/SearchLec.php',searchkey)

                           .success(function(data, status, headers, config){
                            $scope.lecturers = data;

                            console.log(data);
                           })
                           .error(function(data, status, headers, config){

                            console.log("error "+data);
                           })


                       }

                       

                       $scope.select=function(lecturer)
                       {

                          $rootScope.lec = {
                            'lecId': lecturer.lecId,
                            'lecName' : lecturer.lecName,
                            'email' : lecturer.email,
                            'pw' : lecturer.lecPassword,
                             };

                        // $rootScope.lec = lecturer;
                           
                        
                          console.log("data "+ $rootScope.lec.lecId);


                            $location.path('/singleLec');
                       }


                       $scope.edit=function(lecturer)
                       {
                            var newdetails = {
                                'lecId' : lecturer.lecId,
                                'nlecName' : null,
                                'nemail' : null,
                                'ndept' : null
                            };

                        

                                  if($scope.newname!=null)
                                  {
                                        newdetails.nlecName = $scope.newname;
                                  }
                                  else
                                  {
                                    newdetails.nlecName = lecturer.lecName;
                                  }

                                  if($scope.newemail!=null)
                                  {
                                        newdetails.nemail = $scope.newemail;
                                  }
                                  else
                                  {
                                    newdetails.nemail = lecturer.email;
                                  }

                                  if($scope.newdept!=null)
                                  {
                                        newdetails.ndept = $scope.newdept;
                                  }
                                  else
                                  {
                                    newdetails.ndept = lecturer.dept;
                                  }

                                  console.log("new name is " + newdetails.lecId); 
                                  console.log("new name is " + newdetails.nlecName);
                                  console.log("new name is " + newdetails.nemail);
                                  console.log("new name is " + newdetails.ndept);



                                   $http.post('backend/updateLecturer.php',newdetails)
                                   .success(function(data, status, headers, config)
                                  {
                                   $scope.status = '  ';
                                   $scope.customFullscreen = false;

                                       $scope.showAlert = function(ev) 
                                       {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                      // Modal dialogs should fully cover application
                                      // to prevent interaction outside of dialog
                                            $mdDialog.show(
                                            $mdDialog.alert()
                                            .parent(angular.element(document.querySelector('#popupContainer')))
                                            .clickOutsideToClose(true)
                                           .title('Details of Lecturer Updated Succefully')
                                            // .textContent('You can specify some description text in here.')
                                          .ariaLabel('Success')
                                           .ok('Okay!')
                                            .targetEvent(ev)
                                          );
                                        };

                                      $scope.showAlert();

                                  })
                                   .error(function(data, status, headers, config)
                                 {
                                          console.log('error');

                                     $scope.showAlert = function(ev) 
                                      {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                     // Modal dialogs should fully cover application
                                  // to prevent interaction outside of dialog
                                          $mdDialog.show(
                                          $mdDialog.alert()
                                          .parent(angular.element(document.querySelector('#popupContainer')))
                                          .clickOutsideToClose(true)
                                          .title('Something went Wrong ! ')
                                          // .textContent('You can specify some description text in here.')
                                         .ariaLabel('Error')
                                         .ok('Got it!')
                                          .targetEvent(ev)
                                        );
                                      };

                                    $scope.showAlert();   


                                 });





                                  

                       };


                       //delete the selected lecturer from database
                       $scope.delete=function(lecturer)
                       {

                            var del ={
                              'lecId' : lecturer.lecId
                            };

                            console.log("delete " +del.lecId);

                            $http.post('backend/deleteLecturer.php',del)
                            .success(function(data, status, headers, config){


                              $scope.status = '  ';
                                   $scope.customFullscreen = false;

                                       $scope.showAlert = function(ev) 
                                       {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                      // Modal dialogs should fully cover application
                                      // to prevent interaction outside of dialog
                                            $mdDialog.show(
                                            $mdDialog.alert()
                                            .parent(angular.element(document.querySelector('#popupContainer')))
                                            .clickOutsideToClose(true)
                                           .title('Details of Lecturer Deleted Succefully')
                                            // .textContent('You can specify some description text in here.')
                                          .ariaLabel('Success')
                                           .ok('Okay!')
                                            .targetEvent(ev)
                                          );
                                        };

                                      $scope.showAlert();

                            })
                            .error(function(data, status, headers, config){

                                console.log('error');

                                     $scope.showAlert = function(ev) 
                                      {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                     // Modal dialogs should fully cover application
                                  // to prevent interaction outside of dialog
                                          $mdDialog.show(
                                          $mdDialog.alert()
                                          .parent(angular.element(document.querySelector('#popupContainer')))
                                          .clickOutsideToClose(true)
                                          .title('Something went Wrong ! ')
                                          // .textContent('You can specify some description text in here.')
                                         .ariaLabel('Error')
                                         .ok('Got it!')
                                          .targetEvent(ev)
                                        );
                                      };

                                    $scope.showAlert();   


                            })

                       }



 
       
   
});



admin.controller('courseCtrl', function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) 
{

    $scope.insert=function()
    {
       var  newcourse = 
                          {
                            'sid' : $scope.sid,
                            'sname' : $scope.sname,
                            'year' : $scope.year,
                            'semester' : $scope.semester,
                            'enrollmentkey' : $scope.enrollmentkey,
                            'time' : $scope.time , 
                            'location' : $scope.location 
                          };

                          $scope.sid=null;
                          $scope.sname=null;
                          $scope.year=null;
                          $scope.semester=null;
                          $scope.enrollmentkey = null;
                          $scope.time = null;
                          $scope.location = null;

                          // console.log('new is' + newcourse.sid);
                          // console.log('new is' + newcourse.sname);
                          // console.log('new is' + newcourse.year);
                          // console.log('new is' + newcourse.semester);
                          // console.log('new is' + newcourse.enrollmentkey);
                          // console.log('new is' + newcourse.time);
                          // console.log('new is' + newcourse.location);



                          $http.post('backend/saveCourse.php', newcourse)
                          .success(function(data, status, headers, config){

                            $scope.status = '  ';
                                   $scope.customFullscreen = false;

                                       $scope.showAlert = function(ev) 
                                       {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                      // Modal dialogs should fully cover application
                                      // to prevent interaction outside of dialog
                                            $mdDialog.show(
                                            $mdDialog.alert()
                                            .parent(angular.element(document.querySelector('#popupContainer')))
                                            .clickOutsideToClose(true)
                                           .title('Course Details Saved')
                                            // .textContent('You can specify some description text in here.')
                                          .ariaLabel('Success')
                                           .ok('Okay!')
                                            .targetEvent(ev)
                                          );
                                        };

                                      $scope.showAlert();
                          })
                          .error(function(data, status, headers, config){
                            console.log('error');

                                     $scope.showAlert = function(ev) 
                                      {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                     // Modal dialogs should fully cover application
                                  // to prevent interaction outside of dialog
                                          $mdDialog.show(
                                          $mdDialog.alert()
                                          .parent(angular.element(document.querySelector('#popupContainer')))
                                          .clickOutsideToClose(true)
                                          .title('Something went Wrong ! ')
                                          // .textContent('You can specify some description text in here.')
                                         .ariaLabel('Error')
                                         .ok('Got it!')
                                          .targetEvent(ev)
                                        );
                                      };

                                    $scope.showAlert(); 

                          })


    }



          $scope.search=function()
          {

                                var searchkey = {
                                 'key' :$scope.name
                                };
                                console.log("search " + searchkey.key);

                                 $http.post('backend/searchCourse.php',searchkey)

                                 .success(function(data, status, headers, config){
                                  $scope.courses = data;

                                  console.log(data);
                                 })
                                 .error(function(data, status, headers, config){

                                  console.log("error "+data);
                                 })




          }

          $scope.select=function(course)
          {


              $rootScope.c ={ 
                'id' : course.id,
                'name' : course.name,
                'year' :course.year,
                'semester' : course.semester,
                'time' : course.time,
                'location' : course.location,
                'enrollmentkey' : course.enrollmentkey

              };


              console.log("selected couse is " + $rootScope.c.cName);

              $location.path('/singleCourse');


          }

          $scope.edit=function(course)
          {
              var newdetails = {
                                'cId' : course.cId,
                                'ncName' : $scope.newcname,
                                'lic' : $scope.newlic,
                                'ndept' : $scope.newdept
                            };

                        

                                  if($scope.newcname!=null)
                                  {
                                        newdetails.ncName = $scope.newcname;
                                  }
                                  else
                                  {
                                    newdetails.ncName = course.cName;
                                  }

                                  if($scope.newlic!=null)
                                  {
                                        newdetails.lic = $scope.newlic;
                                  }
                                  else
                                  {
                                    newdetails.lic = course.lic;
                                  }

                                  if($scope.newdept!=null)
                                  {
                                        newdetails.ndept = $scope.newdept;
                                  }
                                  else
                                  {
                                    newdetails.ndept = course.dept;
                                  }


                                  console.log("new "+newdetails.cId + " "+ newdetails.ncName+" "+newdetails.lic+" "+newdetails.ndept  ); 


                                  $http.post('backend/editCourse.php',newdetails)
                                  .success(function(data, status, headers, config){

                            $scope.status = '  ';
                                   $scope.customFullscreen = false;

                                       $scope.showAlert = function(ev) 
                                       {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                      // Modal dialogs should fully cover application
                                      // to prevent interaction outside of dialog
                                            $mdDialog.show(
                                            $mdDialog.alert()
                                            .parent(angular.element(document.querySelector('#popupContainer')))
                                            .clickOutsideToClose(true)
                                           .title('Course Details Updated')
                                            // .textContent('You can specify some description text in here.')
                                          .ariaLabel('Success')
                                           .ok('Okay!')
                                            .targetEvent(ev)
                                          );
                                        };

                                      $scope.showAlert();
                          })
                          .error(function(data, status, headers, config){
                            console.log('error');

                                     $scope.showAlert = function(ev) 
                                      {
                                     // Appending dialog to document.body to cover sidenav in docs app
                                     // Modal dialogs should fully cover application
                                  // to prevent interaction outside of dialog
                                          $mdDialog.show(
                                          $mdDialog.alert()
                                          .parent(angular.element(document.querySelector('#popupContainer')))
                                          .clickOutsideToClose(true)
                                          .title('Something went Wrong ! ')
                                          // .textContent('You can specify some description text in here.')
                                         .ariaLabel('Error')
                                         .ok('Got it!')
                                          .targetEvent(ev)
                                        );
                                      };

                                    $scope.showAlert(); 

                          }) 

          }


          $scope.delete=function(course)
          {

                var key={
                  'cid' : course.cId
                };

                console.log("delete this"+key.cid);


                $http.post('backend/deleteCourse.php',key)
                .success(function(data, status, headers, config){

                        $scope.status = '  ';
                                       $scope.customFullscreen = false;

                                           $scope.showAlert = function(ev) 
                                           {
                                         // Appending dialog to document.body to cover sidenav in docs app
                                          // Modal dialogs should fully cover application
                                          // to prevent interaction outside of dialog
                                                $mdDialog.show(
                                                $mdDialog.alert()
                                                .parent(angular.element(document.querySelector('#popupContainer')))
                                                .clickOutsideToClose(true)
                                               .title('Course Deleted')
                                                // .textContent('You can specify some description text in here.')
                                              .ariaLabel('Success')
                                               .ok('Okay!')
                                                .targetEvent(ev)
                                              );
                                            };

                                          $scope.showAlert();

                    })
                .error(function(data, status, headers, config){
                                console.log('error');

                                         $scope.showAlert = function(ev) 
                                          {
                                         // Appending dialog to document.body to cover sidenav in docs app
                                         // Modal dialogs should fully cover application
                                      // to prevent interaction outside of dialog
                                              $mdDialog.show(
                                              $mdDialog.alert()
                                              .parent(angular.element(document.querySelector('#popupContainer')))
                                              .clickOutsideToClose(true)
                                              .title('Something went Wrong ! ')
                                              // .textContent('You can specify some description text in here.')
                                             .ariaLabel('Error')
                                             .ok('Got it!')
                                              .targetEvent(ev)
                                            );
                                          };

                                        $scope.showAlert(); 
                        })
              }



});