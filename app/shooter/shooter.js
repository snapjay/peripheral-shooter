'use strict';

angular.module('myApp.shooter', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shooter', {
    templateUrl: 'shooter/shooter.html',
    controller: 'shooterCtrl'
  });
}])

.controller('shooterCtrl', ['$rootScope', function($rootScope) {

  $rootScope.$on('changeb', function(){
    console.log ('changeb');
  })
  $rootScope.$on('changee', function(){
    console.log ('changee');
  })

}]);