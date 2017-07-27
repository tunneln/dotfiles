/**
 * 
 */

'use strict';

var concludeTestingMod = angular.module('ConcludeTestingMod', []);

concludeTestingMod.controller("ConcludeTestingCtrl", ["$scope","$rootScope","$state","$localStorage","ConcludeTestingService","$window", function($scope,$rootScope,$state,$localStorage,ConcludeTestingService,$window) {

	//ConcludeTestingService
	$scope.userDetails = $localStorage.userData;
	$scope.isComplRequested = false;
	$scope.isPageloading = false;
	$scope.loading = false;
	$scope.complianceDetails = [];
	$scope.selectedComplDetail = {};


	/**
	 * @author manish 
	 * Method to fetch the vendors conclude testing details to
	 * request for compliance letter
	 */
	$scope.getComplianceStatus = function() {
		var data = {
				"UserName" : $scope.userDetails.username
		};
		$scope.isPageloading = true;
		ConcludeTestingService.getComplianceStatus(data).then(
				function successCallback(resData) {
					console.log("The vendor conclude testing response data :: "+resData.data);
					$scope.complianceDetails = resData.data;
					angular.forEach($scope.complianceDetails, function(complDetail) {
						if(complDetail.ProductType == "MPI")
							complDetail.ProductType = "3DSS";
						console.log("Ref num :: "+complDetail.RefNum);
					});
					console.log("$scope.complianceDetails length :: "+$scope.complianceDetails.length);
					$scope.isPageloading = false;
				}, function errorCallback(errorResponse) {
					$scope.complianceDetails = [];
					$scope.isPageloading = false;
					console.log("No Results found");
				});
	}

	/* On load method call */
	$scope.getComplianceStatus();

	/**
	 * @author vkallada
	 * Method to show the compliance request table
	 */
	$scope.showComplRequestTable = function(index, compTypeComplReq) {
		/*
		 * Updating the boolean value to true to show the
		 * compliance letter request table.
		 */
		$scope.isComplRequested = true;
		$scope.selectedProdIndex = index;
		/*
		 * Setting all the user details for compliance
		 * request form from the selected product type object.
		 */
		$scope.companyName = compTypeComplReq.CompanyName;
		$scope.productType = compTypeComplReq.ProductType;
		$scope.threeDSVersion = "3DS 2.0";
		$scope.prodName = "";
		$scope.productVersion = "";
		$scope.emvcoRefNo = compTypeComplReq.RefNum;
		if ($scope.productType == "3DSS") {
			$scope.isMPI = true;
		} else {
			$scope.isMPI = false;
		}
	}

	/**
	 * @author vkallada
	 * Method to submit a request to the GCT Admin by the Vendor to generate a compliance
	 * letter for vendor testing.
	 */
	$scope.submitComplLetterReq = function() {
		if($scope.productType == "3DSS")
			$scope.productType1 = "MPI";
		else
			$scope.productType1 = $scope.productType;
		var data = {
				"UserName" : $scope.userDetails.username,
				"CompanyName" : $scope.companyName, // Manufacturer in UI
				"ProductType" : $scope.productType1,
				"RefNum" : $scope.emvcoRefNo,
				"ProductName" : $scope.prodName, // Input value
				"ProductVersion" : $scope.productVersion // Input value
		}
		$scope.loading = true;
		ConcludeTestingService.submitComplLetterReq(data).then(function successCallback(responseData) {
			$scope.complianceDetails[$scope.selectedProdIndex].ComplianceStatus = responseData.data.ComplianceStatus;
			$rootScope.showSuccessAlert = true;
			$rootScope.showErrorAlert = false;
			$scope.isComplRequested = false;
			$rootScope.successMessage = "Your compliance letter request has been submitted and is currently being reviewed by"+
			" Visa GCT team. You should be receiving the compliance letter in 2 Business days."+
			" Please contact gctv3dsts@visa.com if you have any questions.";
			$scope.loading = false;
			$window.scrollTo(0,0);
		}, function errorCallback(errorRes) {
			$scope.loading = false;
			console.log("failed to submit the request for compliance letter");
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if(response.data.errorMessage != undefined && response.data.errorMessage != null)
				$rootScope.errorMessage = response.data.errorMessage;
			else
				$rootScope.errorMessage = "Request for compliance letter has failed, please contact system administrator.";
			$window.scrollTo(0,0);
		});
	}

	/**
	 * @author vkallada
	 * Method to cancel the request for the compliance letter
	 */
	$scope.cancelComplLetterReq = function() {
		$scope.isComplRequested = false;
		$scope.selectedProdIndex = -1;
		$scope.companyName = "";
		$scope.productType = "";
		$scope.emvcoRefNo = "";
		$scope.prodName = "";
		$scope.productVersion = "";
	}

}])