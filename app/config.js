(function(){
	'use strict';

	angular.module('myApp')
		.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
		  $locationProvider.hashPrefix('!');

		  $routeProvider.otherwise({redirectTo: '/home'});
	}]);

})();
	