'use strict';

var concludeTestingMod = angular.module('ConcludeTestingMod',[]);

concludeTestingMod.controller('ConcludeTestingController', ["$scope", "ConcludeTestingService", "$state","$rootScope", function($scope,ConcludeTestingService,$state,$rootScope) {

	$scope.service = ConcludeTestingService;
	
	$scope.sendEmail= function(){
		ConcludeTestingService.sendEmail().success(function(response){
			$state.go('PIT1.concludeTestingRes');
		})
	}
	
	/**
	 * @author vkallada
	 * Method to submit a request to the GCT Admin by the Vendor to generate a compliance
	 * letter for vendor testing.
	 */
	$scope.submitComplLetterReq = function() {
		var data = {
				"productName" : $scope.productName,
				"productVersion" : $scope.productVersion
		}
	}
	
}]);