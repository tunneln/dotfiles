'use strict';
footerMod.service('FooterService', [
		'$http',
		'$rootScope',
		function($http, $rootScope) {
	this.getCopyright = function() {
		return $http.get($rootScope.contextPath + '/pit2/buildNumber').then(function(response){
			return response;
		});
	}
}]);