'use strict';

angular.module('myApp.instructor', ['ngRoute', 'myApp.peripheralShooter'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/instructor', {
    templateUrl: 'instructor/instructor.html',
    controller: 'instructorCtrl'
  });
}])

.controller('instructorCtrl', ['$rootScope', '$scope', 'shooter', function($rootScope, $scope, shooter) {

    $scope.opts = {
        delay: 5,
        interval: 2,
        screens: 2,
        targets: 5,
        shots:5

    };

    $scope.toggle = function(){
        $scope.runState = shooter.toggle($scope.opts);
    };


    $rootScope.$on('dataChange', function(ev, data){
        $scope.data = data;
    });
    $rootScope.$on('runState', function(ev, data){
        $scope.runState = data;
    });




}]);