'use strict';

angular.module('myApp.shooter', ['ngRoute', 'myApp.peripheralShooter'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shooter/:id', {
    templateUrl: 'shooter/shooter.html',
    controller: 'shooterCtrl'
  });
}])

.controller('shooterCtrl', [
    '$rootScope', '$scope', '$routeParams', 'shooter', function(
     $rootScope,  $scope,   $routeParams,    shooter) {

    $rootScope.$on('dataChange', function(ev, data){
        $scope.data = data;
        $scope.$apply();
    });


  $scope.screen = $routeParams.id;


}]);