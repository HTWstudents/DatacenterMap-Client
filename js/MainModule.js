var app = angular.module('app', ['app.dir'])
    .controller("AppCtrl", function ($scope) {
        $scope.datacenters = [
            {name: "nametest", capacity: 123},
            {name: "testename23", capacity: 23774}
        ];
    })
    .run(function ($rootScope, $log) {
        $log.log('run app');
    });