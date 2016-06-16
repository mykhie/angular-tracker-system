/*  user log in module initialzed here *******/

var login = angular.module('login', []);
login
        .constant('serverAPIURL', 'http://172.16.10.16:1212/userLogin')//declares the api url as a constant//string
        .controller('loginCntrl', function ($scope, $rootScope, serverAPIURL, $http,$location) {
            $scope.data = {};
            $scope.data.userLogin = {};
            //change password field from password to text,in plain text///
            $scope.data.changeDisplayPassword = function (showPassword) {
                if (showPassword == true) {
                    $scope.data.userLogin.inputType = 'text';
                } else {

                    $scope.data.userLogin.inputType = 'password';
                }
            }
            //switches between login panel and password retrieval panel//////
            $scope.data.changeLoginpanel = function (showPassswordRetrival) {
                $scope.data.showPassswordRetrival = (!showPassswordRetrival);//changes value,but can also return
            }

            //connects to the server to check user credentials for validity////;/
            $scope.data.userLoginFxn = function (userLogin) {
                try {
                    if (angular.isObject(userLogin)) {
                           window.location ='index.html';

                    } else {
                        console.log('Invalid data type passed' + typeof (userLogin)); //write to console for bad datatype
                    }
                } catch (e) {
                    console.log('function terminnated due to some errors' + e);
                }
            }
            ///send url password retrieval link//

            $scope.data.functionReturnURL = function (url) {
                return serverAPIURL + url;
            }
            $scope.data.requestResetCode = function (userEmailData) {


                try {
                    if (angular.isObject(userEmailData)) {
                        $http
                                .post($scope.data.functionReturnURL('getUserResetLink'), userEmailData)
                                .success(function (data) {

                                })
                                .error(function (data, callback) {

                                })
                    } else {

                    }
                } catch (e) {

                }
            }

        })
        .directive('onlineStatus',function(){
            
            return {
                template: "<div ng-hide='online' class='alert alert-danger col-md-12'>please check your internet connection</div>"
            }
        })
        .run(function ($window, $rootScope) {
            $rootScope.online = navigator.onLine;
            $window.addEventListener("offline", function () {
                $rootScope.$apply(function () {
                    $rootScope.online = false;
                });
            }, false);

            $window.addEventListener("online", function () {
                $rootScope.$apply(function () {
                    $rootScope.online = true;
                });
            }, false);
        })