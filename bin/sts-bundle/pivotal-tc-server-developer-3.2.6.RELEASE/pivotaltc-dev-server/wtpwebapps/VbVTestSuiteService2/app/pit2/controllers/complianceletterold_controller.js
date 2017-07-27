/**
 *	@author vkallada 
 */
"use strict";

complLetterMod.controller("ComplianceLetterOldCtrl", ["$scope", "ComplianceLetterService", "$state", function($scope, ComplianceLetterService, $state){
	
	$scope.service = ComplianceLetterService;
	$scope.selectedUserObj = $scope.service.selectedUserObj;
	$scope.visaRefNumber = "";
	$scope.productName = "";
	$scope.productVersion = "";
	$scope.threeDSecureComplVer = "";
	$scope.currentDate = new Date();
	
	$scope.previewComplLetter = function() {
		var data = {
				currentDate : $scope.currentDate,
				visaRefNumber : $scope.visaRefNumber,
				productName : $scope.productName,
				productVersion : $scope.productVersion,
				threeDSecureComplVer : $scope.threeDSecureComplVer
		}
		$scope.service.complLetterData = data;
		$state.go("PIT2.PreviewCompLetter");
	}
	
}]);