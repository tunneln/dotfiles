'use strict';

footerMod.controller('FooterCtrl', [
		'$scope',
		'FooterService',
		function($scope, FooterService) {

	$scope.getCopyright = function() {
		FooterService.getCopyright().then(
				function successCallback(response){
					$scope.buildNo = response.data;
				},function errorCallback(error){
					$scope.buildNo = "0.0.0, Dec 31, 2000";
				})
	}

	$scope.getCopyright();
}]);
