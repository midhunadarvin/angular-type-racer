(function(){
	'use strict';

	angular.module('myApp.home').config(['$routeProvider', function($routeProvider) {

	  $routeProvider.when('/home', {
	    templateUrl: 'home/home.html',
	    controller: 'HomeController'
	  });

	}]);

})();

