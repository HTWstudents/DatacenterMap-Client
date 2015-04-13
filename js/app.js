/**
 * App entry point.
 * @type {Runner|*}
 */
var app = angular.module('benchmarkApp', ['ngRoute', 'ngResource']).run(function($http, $rootScope) {
    $rootScope.authenticated = false;
    $rootScope.current_user = 'Guest';

    $rootScope.signout = function(){
        $http.get('auth/signout');
        $rootScope.authenticated = false;
        $rootScope.current_user = 'Guest';
    };
});

/**
 * Defines in app view routing. Even though different html pages will be rendered this is a
 * single page application approach. These pages are partials which will be inserted into a
 * container html page.
 */
app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'authController'
        })
        .when('/admin', {
            templateUrl: 'admin.html',
            controller: 'authController'
        });
});


/**
 * Service considered with Rest-API calls for Datacenter models
 */
app.factory('datacenterService', function($resource){
    return $resource('/api/datacenters/:id');
});

/**
 * Service considered with Rest-API calls for User models
 */
app.factory('userService', function($resource){
    return $resource('/api/users/:id');
});

/**
 * Service considered with Rest-API calls for Survey models
 */
app.factory('surveyService', function($resource){
    return $resource('/api/survey/:id');
});

/**
 * Controller considered with the interactions with the landing page.
 */
app.controller('mainCtrl', function($scope){
    // TODO left & right clicking on a carousell -> change images & texts
});

/**
 * Controller considered with User Authentication
 * User are either registered or join app as guest
 * User can not register by theirselves. Only an admin can register or delete User
 */
app.controller('authCtrl', function($scope, $http, $rootScope, $location){
    $scope.user = {username: '', password: ''};
    $scope.error_message = '';

    // TODO Login in with given Credentials
    $scope.login = function(){
        $http.post('/auth/login', $scope.user).success(function(data){
            if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
        });
    };

    // TODO registered Users can change their password
    $scope.changePassword = function(){
        $http.post('/auth/login', $scope.user).success(function(data){
            if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
        });
    };

    // TODO only Admins can register or delete User
    $scope.register = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
        });
    };
});

/**
 * Controller considered with map interactions
 * TODO adapt marker clustering here
 * TODO adapt flyIn information onMarkerClick
 * TODO advanced statistics with angular graph elements
 */
app.controller('mapCtrl', function($scope, $rootScope, surveyService){
    $scope.surveys = surveyService.query();

    $scope.post = function() {
        $scope.newPost.created_by = $rootScope.current_user;
        $scope.newPost.created_at = Date.now();

        surveyService.save($scope.newPost, function () {
            $scope.posts = surveyService.query();
            $scope.newPost = {created_by: '', text: '', created_at: ''};
        });
    };

    $scope.delete = function(post)	{
        surveyService.delete({id: post._id});
        $scope.posts = postService.query();
    };
});

/**
 * Controller considered with reading, validating and evaluating the values in a survey
 */
app.controller('surveyCtrl', function($scope, $rootScope, surveyService){
    $scope.surveys = surveyService.query();

    $scope.post = function() {
        $scope.newPost.created_by = $rootScope.current_user;
        $scope.newPost.created_at = Date.now();

        surveyService.save($scope.newPost, function () {
            $scope.posts = surveyService.query();
            $scope.newPost = {created_by: '', text: '', created_at: ''};
        });
    };

    // TODO workflow to change certain fields in a survey
    $scope.put = function(post)	{
        surveyService.delete({id: post._id});
        $scope.posts = postService.query();
    };
});

/**
 * Controller considered with reading and creating appointments for audits
 * TODO statistics on audits per time
 * TODO graphical information about done audits, canceled, rescheduled and missed audits
 */
app.controller('calendarCtrl', function($scope, $rootScope, surveyService){
    $scope.surveys = surveyService.query();

    $scope.post = function() {
        $scope.newPost.created_by = $rootScope.current_user;
        $scope.newPost.created_at = Date.now();

        surveyService.save($scope.newPost, function () {
            $scope.posts = surveyService.query();
            $scope.newPost = {created_by: '', text: '', created_at: ''};
        });
    };

    // TODO workflow to change certain fields in a survey
    $scope.put = function(post)	{
        surveyService.delete({id: post._id});
        $scope.posts = surveyService.query();
    };
});