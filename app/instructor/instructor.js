'use strict';

angular.module('myApp.instructor', ['ngRoute', 'myApp.peripheralShooter'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/instructor', {
    templateUrl: 'instructor/instructor.html',
    controller: 'instructorCtrl'
  });
}])

.controller('instructorCtrl', ['$scope', 'shooter', function($scope, shooter) {

        $scope.toggle = function(){
        $scope.runState = shooter.toggle();
    }



}]);