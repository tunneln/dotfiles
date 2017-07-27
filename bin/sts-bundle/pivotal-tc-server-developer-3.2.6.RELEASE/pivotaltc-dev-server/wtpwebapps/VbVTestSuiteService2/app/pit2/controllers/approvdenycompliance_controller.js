/**
 * 
 */

vendorLogMod.controller("ApproveDenyCOmplianceCtrl", ["$scope","$rootScope","$state","$localStorage","VendorLogService","$window", function($scope,$rootScope,$state,$localStorage,VendorLogService,$window) {

	$scope.vendorData = VendorLogService.vendorData;
	$scope.success = false;
	$scope.loading = false;
	$scope.showDenialForm = false;
	$scope.denyLoading = false;
	$scope.showApprovedSuccess = false;
	$scope.showDeniayedSuccess = false;
	$scope.isPageLoading = false;
	
	console.log("$rootScope.complApprovalThroughEmail :: "+$rootScope.complApprovalThroughEmail);
	if($rootScope.complApprovalThroughEmail == true) {
		var data = {
				"enrollmentUUIDToken" : $rootScope.token
		}
		$scope.isPageLoading = true;
		VendorLogService.getVendorDataForComplReqApproval(data).then(function(response) {
			$scope.vendorData = response.data;
			$scope.isPageLoading = false;
		}, function errorCallback(errorRes) {
			console.log("Failed to get the vendor Log data");
			$scope.isPageLoading = false;
		});
	}
	
	
	$scope.approveComplLetterReq = function() {
		if ($window
				.confirm("Are you sure you would like to approve this compliance request")) {
			//display a success message in this scenario on the same page and hide other things.
			//once we get success response for approval from back end, we display the success message to user.
			console.log("approving vendor first name :: "+$scope.vendorData.vendorFirstName);
			$scope.loading = true;
			VendorLogService.approveVendorComplLetterReq($scope.vendorData).then(function successCallback(response){
				console.log("Successfully approved the vendor compliance letter.");
				$scope.loading = false;
				$scope.showApprovedSuccess = true;
			}, function errorCallback(errorRes) {
				console.log("Failed to approve the vendor compliance letter.");
				$scope.showApprovedSuccess = false;
				$scope.loading = false;
			})
//			$scope.success = true;
		} 

	}

	$scope.confirmDeny = function() {
		if($window.confirm("Are you sure you would like to deny this compliance request."+
				"Please provide reason for denial(Notes section will be updated)"+
		"(Eg: Denied as test cases are not complete or screenshots are not received")) {
//			$state.go('PIT2.gctDenialNotes');
			$scope.showDenialForm = true;
		} else {
			$scope.showDenialForm = false;
		}
	}
	
	$scope.denyComplLetterReq = function() {
		$scope.denyLoading = true;
		VendorLogService.denyVendorComplLetterReq($scope.vendorData).then(function successCallback(response) {
			console.log("Successfully Denied the vendor compl Request.");
			$scope.showDenialForm = false;
			$scope.showDeniayedSuccess = true;
		}, function errorCallback(errorCallback) {
			$scope.denyLoading = false;
			$scope.showDeniayedSuccess = false;
			console.log("Failed to Deny the vendor compl Request.");
		});
	}
	
	$scope.cancelDeny = function() {
		$scope.vendorData.denialNotes = "";
		$scope.showDenialForm = false;
	}

// if user clicks on cancel button take him to the vendor log page.
	$scope.backtoVendorLogScreen = function() {
		$state.go('PIT2.vendorLog');
	}

}]);