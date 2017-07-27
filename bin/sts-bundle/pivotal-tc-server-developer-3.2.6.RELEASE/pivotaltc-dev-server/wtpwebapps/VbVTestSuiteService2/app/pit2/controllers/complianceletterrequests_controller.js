/**
 *	@author vkallada 
 */
"use strict";

var complLetterMod = angular.module("ComplianceLetterModule", []);

complLetterMod.controller("ComplianceLetterRequestsCtrl", ["$scope", "$state", "ComplianceLetterService", function($scope, $state, ComplianceLetterService) {
	
	$scope.complLetterReqs = [];
	$scope.isPageLoading = false;
	
	$scope.getComplLetterReqs = function() {
		$scope.isPageLoading = true;
		ComplianceLetterService.getComplLetterReqs().then(function successCallback(resData) {
			console.log("Response Data :: "+resData.data[0].trackingNumber);
			$scope.complLetterReqs = resData.data;
			$scope.isPageLoading = false;
		}, function errorCallback(errorRes) {
			console.log("Error Response :: "+errorRes);
		})
	}
	
	$scope.getComplLetterReqs();
	
	$scope.generateComplLetter = function(index) {
		console.log("selected index :: "+index);
		$scope.selectedUserObj = $scope.complLetterReqs[index];
		ComplianceLetterService.selectedUserObj = $scope.selectedUserObj;
		$state.go("PIT2.GenCompLetter");
	}
	
}]);