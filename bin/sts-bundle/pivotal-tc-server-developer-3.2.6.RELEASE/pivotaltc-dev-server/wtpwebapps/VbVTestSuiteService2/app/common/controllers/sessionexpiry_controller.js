/*
 *	@author vkallada 
 */

'use strict';

var sessionExpiryMod = angular.module('SessionExpiryModule', []);

sessionExpiryMod.controller('SessionExpiredController', [ '$scope',
		'$rootScope', function($scope, $rootScope) {

	$scope.resetData = function() {
		$rootScope.logout();
		//$window.location.reload();		
	}
	
}]);