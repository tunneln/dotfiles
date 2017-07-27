/**
 * @author pvulupal 
 */

"use strict";

var reviewCResMod = angular.module("ReviewCResModule",[]);

reviewCResMod.controller("RevewCResCtrl",["$scope","CResService","$rootScope","$state","$window","PIT2ReviewService","ValidateCAVVService",function($scope,CResService,$rootScope,$state,$window,PIT2ReviewService,ValidateCAVVService){

	$scope.service = CResService;
	$scope.submitBtn = true;
	$scope.tcBtn = true;
	$scope.runAcsBtn = true;
	$scope.isPageLoading = false;
	$scope.showVIPBtn = false;
	$scope.isACS = false;
	$scope.noCResMsg = false;
	/* Method to get the CRes */
	$scope.getCRes = function(cResTxnId){
		console.log("transId "+cResTxnId);
		$scope.isPageLoading = true;
		CResService.getCRes(cResTxnId).success(function(response,status){
			$scope.isPageLoading = false;
			$scope.testCase = response.testCase;
			console.log("$scope.testCase",+$scope.testCase);
			$scope.testCaseResults = response.testCaseResults;
			$scope.cmpType = response.compType;
			if($scope.cmpType == 'ACS' || $scope.cmpType == 'ACS_REQUIRED'){
				$scope.isACS = true;
			}
			$scope.cResMessage = vkbeautify.json(response.cResMessage, 2);
			$scope.cResMessageObj = angular.fromJson($scope.cResMessage);
			if($scope.cResMessageObj.transStatus == 'Y' || $scope.cResMessageObj.transStatus == 'A'){
				$scope.showVIPBtn = true;
			}
			
			$scope.rReqMsg = vkbeautify.json(response.rReqMsg, 2);
			if($scope.rReqMsg != null && $scope.rReqMsg != undefined){
				$scope.rReqMsgObj = angular.fromJson($scope.rReqMsg);
			}
			$scope.panNum = response.panNo;
			$scope.expDate = response.expDate;
			
			$scope.payerAuthUrl = response.payerAuthUrl; 
			var respEl = angular.element( document.querySelector( '#respinfoId' ) );
			respEl.html(response.validationRespMsg);
			$scope.allowVIPsubmit=response.allowVIPsubmit;
			$scope.transactionID=response.transactionId;
			
			if(response.expectedResponse!=null)
				$scope.expectedResponse = vkbeautify.json(response.expectedResponse, 2);
			if(response.errResponseMsg!=null){
				var errmsg=response.errResponseMsg;
			var errRespmsg=errmsg.substring(0,errmsg.length-1);
			$scope.errResponseMsg=errRespmsg;
			}
		}).error(function(response,status){
			$scope.isPageLoading = false;
			console.log("error blk");
			$scope.noCResMsg = true;
			//$state.go('PIT2.PIT2runACSTest');
		})
	} 

	/*
	 * On controller load calling the getPARes method
	 * @param pa response transaction id 
	 */ 
	$scope.getCRes($rootScope.txnId);

	$scope.jsonFormat= function(){
		var cresmsg=$scope.cResMessage;
		$scope.cResMessage = vkbeautify.json(cresmsg,1);
	}

	$scope.jsonUnformat= function(){
		var cresmsg=$scope.cResMessage;
		$scope.cResMessage = vkbeautify.jsonmin(cresmsg);
	}

	$scope.expjsonFormat= function(){
		var expRespmsg=$scope.expectedResponse;
		$scope.expectedResponse = vkbeautify.json(expRespmsg,1);
	}

	$scope.expjsonUnformat= function(){
		var expRespmsg=$scope.expectedResponse;
		$scope.expectedResponse = vkbeautify.jsonmin(expRespmsg);
	}

	$scope.showAcsScrn = function() {
		$scope.runAcsBtn = false;
		$scope.showVIPBtn = false;
		$scope.loading = true;
//		$state.go('PIT2.PIT2runACSTest');
		$state.go("PIT2.OptionalTestCases");
	}

	$scope.tcDetails = function(){
		$scope.submitBtn=false;
		$scope.runAcsBtn=false;
		$scope.tcBtn=false;
		$scope.showVIPBtn = false;
		$scope.loading=true;
		var id= $scope.transactionID;
		var component=$scope.cmpType;
		PIT2ReviewService.reviewTestCase(id,component).success(function(response,status,headers){
			PIT2ReviewService.data = response;
			PIT2ReviewService.backBtn = true;
			if(component=='ACS' || component=='ACS_REQUIRED'){
				$state.go('PIT2.reviewACS');
			}else{
				PIT2ReviewService.acsBtnForMPI = true;
				$state.go('PIT2.reviewMPI');
			}
		}).error(function(response,status){
			console.log("error blk");
			//$state.go('PIT2.PIT2runACSTest');
			$state.go("PIT2.OptionalTestCases");
		})		
	}
	$scope.submitToVip = function() {

			var data = {
				"Pan" : $scope.panNum,
				"ExpiryDate" : $scope.expDate,
				"eci" : "05"/*$scope.rReqMsgObj.eci*/,
				"Cavv" : $scope.rReqMsgObj.authenticationValue
			}
			$scope.submitBtn=false;
			$scope.runAcsBtn=false;
			$scope.tcBtn=false;
			$scope.showVIPBtn = false;
			$scope.loading = true;
		/*
		 * Angular service call to submit the user
		 * enrollment data
		 */
		ValidateCAVVService
				.submitVIPRequest(data)
				.then(
						function successCallback(
								response) {
							$scope.loading = false;
							ValidateCAVVService.VIPResponseData = response.data;
							$state.go("PIT2.VIPResults");
						},
						function errorCallback(response) {
							$scope.loading = false;
							$scope.submitBtn = true;
							$scope.tcBtn = true;
							$scope.runAcsBtn = true;
							$scope.showVIPBtn = true;
							$rootScope.showSuccessAlert = false;
							$rootScope.showErrorAlert = true;
							if (response.data.errorMessage != undefined
									&& response.data.errorMessage != null)
								$rootScope.errorMessage = response.data.errorMessage;
							else
								$rootScope.errorMessage = "Error getting results from VIP";
							$window.scrollTo(0, 0);
						});
	}

}]);
