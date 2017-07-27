/**
 * @author pvulupala	
 */

'use strict';

cthModule.controller('CTHinAppCResController',['$scope','$rootScope','$state','$window','CTHRunACSTest','$location','PIT2ReviewService','ValidateCAVVService','$sce',function($scope,$rootScope,$state,$window,CTHRunACSTest,$location,PIT2ReviewService,ValidateCAVVService,$sce){

	$scope.showCReqDiv=true;
	$scope.showVIPBtn = false;
	$scope.isACS = false;
	$scope.service = CTHRunACSTest;
	$scope.reqUrl = $scope.service.data.AcsUrl;
	$scope.cResMessage = vkbeautify.json($scope.service.data.ResponseMessage, 2);
	$scope.cResMessageObj = angular.fromJson($scope.cResMessage);
	$scope.isDecode = false;
	$scope.showACSHtmlDecode = false;
	$scope.challengeDataEntry = "";
	$scope.updateSuccMsg = "";
	
	if ($scope.cResMessageObj != undefined
			&& $scope.cResMessageObj.challengeCompletionInd == 'Y') {
		$scope.showVIPBtn = true;
		$scope.rReqMsg = vkbeautify.json($scope.service.data.RReqMsg, 2);
		if($scope.rReqMsg != null && $scope.rReqMsg != undefined){
			$scope.rReqMsgObj = angular.fromJson($scope.rReqMsg);
		}
		$scope.panNum = $scope.service.data.panNo;
		$scope.expDate = $scope.service.data.expDate;
	}
	
	$scope.showACSHtml = function(){
		if ($scope.cResMessageObj != undefined
			&& $scope.cResMessageObj.acsHTML != undefined
			&& $scope.cResMessageObj.acsHTML != "") {
			$scope.showACSHtmlDecode = true;
		} else {
			$scope.showACSHtmlDecode = false;
		}
	}
	
	$scope.showACSHtml();
	
	$scope.reqTestCase = $scope.service.data.TestcaseNme;
	$scope.cmpType = $scope.service.data.ComponentType;
	if($scope.cmpType == 'ACS' || $scope.cmpType == 'ACS_REQUIRED'){
		$scope.isACS = true;
	}
	
	var respEl = angular.element( document.querySelector( '#respinfoId' ) );
	respEl.html($scope.service.data.ResponseInfo);

	if($scope.service.data.AResErrorXmlMsg!=null){
		$scope.aresErrorMsg = vkbeautify.json($scope.service.data.AResErrorXmlMsg, 2);
	}

	if($scope.service.data.ExpectedResponse!=null){
		$scope.expectedResponse = vkbeautify.json($scope.service.data.ExpectedResponse, 2);
	}

	if($scope.service.data.CReqMessage!=null){
		$scope.cReqMessage = vkbeautify.json($scope.service.data.CReqMessage,2);
	}

	$scope.cRequrl=$scope.service.data.TermUrl;

	$scope.cReqName=$scope.service.data.CReqtcNme;
	if($scope.service.data.CReqtcNme==null || $scope.service.data.CReqtcNme==""){
		$scope.showCReqDiv=false;
		$scope.submitBtn=false;
	}else{
		$scope.submitBtn=true;
	}
	$scope.tcBtn=true;
	$scope.runAcsBtn=true;



	$scope.submitCReq = function(){
		$scope.updateSuccMsg = "";
		$scope.submitBtn=false;
		$scope.tcBtn=false;
		$scope.runAcsBtn=false;
		$scope.loading=true;
		$scope.challengeDataEntry = "";
		$scope.challengeHtmlDataEntry = "";

		var cReqData = {
				"CreqACSURL":$scope.cRequrl,
				"CreqText":$scope.cReqMessage,
				"TransactionID":$scope.service.data.TransactionID,
				"SelectedTestCase":	$scope.service.data.CReqTcId
		}

		CTHRunACSTest
		.processInappCReq(cReqData)
		.success(
				function(resData) {
					$scope.service.data = resData;

					$scope.reqUrl = $scope.service.data.AcsUrl;
					$scope.cResMessage = vkbeautify
							.json(
									$scope.service.data.ResponseMessage,
									2);
					$scope.reqTestCase = $scope.service.data.TestcaseNme;
					$scope.cResMessageObj = angular.fromJson($scope.cResMessage);
					if($scope.cResMessageObj.challengeCompletionInd == 'Y'){
						$scope.showVIPBtn = true;
						
						$scope.rReqMsg = vkbeautify.json($scope.service.data.RReqMsg, 2);
						if($scope.rReqMsg != null && $scope.rReqMsg != undefined){
							$scope.rReqMsgObj = angular.fromJson($scope.rReqMsg);
						}
						$scope.panNum = $scope.service.data.panNo;
						$scope.expDate = $scope.service.data.expDate;
					}
					var respEl = angular
							.element(document
									.querySelector('#respinfoId'));
					respEl
							.html($scope.service.data.ResponseInfo);

					if ($scope.service.data.AResErrorXmlMsg != null) {
						$scope.aresErrorMsg = vkbeautify
								.json(
										$scope.service.data.AResErrorXmlMsg,
										2);
					}

					if ($scope.service.data.ExpectedResponse != null) {
						$scope.expectedResponse = vkbeautify
								.json(
										$scope.service.data.ExpectedResponse,
										2);
					}

					if ($scope.service.data.CReqMessage != null) {
						$scope.cReqMessage = vkbeautify
								.json(
										$scope.service.data.CReqMessage,
										2);
					}

					$scope.cRequrl = $scope.service.data.TermUrl;

					$scope.cReqName = $scope.service.data.CReqtcNme;
					if ($scope.service.data.CReqtcNme == null
							|| $scope.service.data.CReqtcNme == "") {
						$scope.showCReqDiv = false;
						$scope.submitBtn = false;
						$scope.showVIPBtn = true;
					} else {
						$scope.submitBtn = true;
					}
					$scope.loading = false;
					$scope.tcBtn = true;
					$scope.runAcsBtn = true;
					$scope.showACSHtml();
				})
		.error(
				function(response, status) {
					$state
							.go('PIT2.CTHrunACSTestRes');
					$scope.loading = false;
					$scope.submitBtn = true;
				})
	}


	$scope.showAcsScrn=function(){
		//$state.go('PIT2.CTHrunACSTest');
		$state.go('PIT2.RequiredTestCases');
	}

	$scope.tcDetails = function(){
		$scope.submitBtn=false;
		$scope.runAcsBtn=false;
		$scope.tcBtn=false;
		$scope.loading=true;

		var id= $scope.service.data.TransactionID;
		var component=$scope.cmpType;
		PIT2ReviewService.reviewTestCase(id,component).success(function(response,status,headers){
			PIT2ReviewService.data = response;
			PIT2ReviewService.cthBckBtn = true;
			if (component == 'ACS'
				|| component == 'ACS_REQUIRED') {
			$state
					.go('PIT2.reviewACS');
		} else {
			PIT2ReviewService.acsBtnForMPI = true;
			$state
					.go('PIT2.reviewMPI');
		}

		}).error(function(response,status){
			console.log("error blk");
			//$state.go('PIT2.CTHrunACSTest');
			$state.go('PIT2.RequiredTestCases');
		})		
	} 
	$scope.jsonFormat= function(type){
		if(type=="CRes"){
			var aRes=$scope.cResMessage;
			$scope.cResMessage = vkbeautify.json(aRes,1);
		}
		if(type=="expCRes"){
			var expctdcRes=$scope.expectedResponse;
			$scope.expectedResponse = vkbeautify.json(expctdcRes,1);
		}
		if(type=="CReq"){
			var cReq=$scope.cReqMessage;
			$scope.cReqMessage = vkbeautify.json(cReq,1);
		}
	}

	$scope.jsonUnformat= function(type){
		if(type=="CRes"){
			var aRes=$scope.cResMessage;
			$scope.cResMessage = vkbeautify.jsonmin(aRes);
		}
		if(type=="expCRes"){
			var expctdcRes=$scope.expectedResponse;
			$scope.expectedResponse = vkbeautify.jsonmin(expctdcRes);
		}
		if(type=="CReq"){
			var cReq=$scope.cReqMessage;
			$scope.cReqMessage = vkbeautify.jsonmin(cReq);
		}
	}
	$scope.submitToVip = function() {

		var data = {
			"Pan" : $scope.panNum,
			"ExpiryDate" : $scope.expDate,
			"eci" : "05"/*$scope.rReqMsgObj.eci*/,
			"Cavv" : $scope.rReqMsgObj.authenticationValue
		}
		$scope.submitBtn = false;
		$scope.tcBtn = false;
		$scope.runAcsBtn = false;
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
							$state
									.go("PIT2.VIPResults");
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
	
	$scope.encodeOrDecodeACSHtml = function() {
		$scope.cresJsonObj = angular.fromJson($scope.cResMessage);
		$scope.acsHtml = $scope.cresJsonObj.acsHTML;
		var data = {
				"acsHtml" : $scope.acsHtml,
				"decodeACSHtml" : $scope.isDecode 
		}
		CTHRunACSTest.decodeACSHtml(data).then(function successCallback(responseData){
			$scope.acsHtmlVal = $sce.trustAsHtml(responseData.data);
		}, function errorCallback(errorRes) {
			$scope.cResMessage = vkbeautify.json(JSON.stringify($scope.cresJsonObj), 2);
		})
	}
	
	$scope.closeModal = function() {
		$scope.isDecode = false;
	}
	$scope.showChallengeDataEntryEditable = false;
	$scope.challengeDataEntryField = false;
	$scope.challengeHTMLDataEntryField = false;
	$scope.challengeHtmlDataEntry = "";
	
	$scope.cReqMessageObj = angular.fromJson($scope.cReqMessage);
	
	if($scope.cReqMessageObj != undefined && $scope.cReqMessageObj.challengeDataEntry != undefined && $scope.cReqMessageObj.challengeDataEntry != ""){
		$scope.showChallengeDataEntryEditable = true;
		$scope.challengeDataEntryField = true;
	} else {
		$scope.challengeDataEntryField = false;
	}
	
	if($scope.cReqMessageObj != undefined && $scope.cReqMessageObj.challengeHTMLDataEntry != undefined && $scope.cReqMessageObj.challengeHTMLDataEntry != ""){
		$scope.showChallengeDataEntryEditable = true;
		$scope.challengeHTMLDataEntryField = true;
	} else {
		$scope.challengeHTMLDataEntryField = false;
	}
	
	$scope.updateTemplateMessage = function(challengeDataEntryVal,challengeHtmlDataEntryVal) {
		$scope.updateSuccMsg = "";
		// Condition to update the challengeDataEntry field in the template message
		if($scope.challengeDataEntryField) {
			if(challengeDataEntryVal == undefined || challengeDataEntryVal == ""){
				$scope.updateSuccMsg = "";
				return;
			}
			if($scope.cReqMessageObj.challengeDataEntry != undefined && $scope.cReqMessageObj.challengeDataEntry != ""){
				$scope.cReqMessageObj.challengeDataEntry = challengeDataEntryVal;
				$scope.cReqMessage = vkbeautify.json(JSON.stringify($scope.cReqMessageObj), 2);
				$scope.updateSuccMsg = "Challenge Data Entry value updated successfully";
			} else {
				$scope.cReqMessage = vkbeautify.json(JSON.stringify($scope.cReqMessageObj), 2);
				$scope.updateSuccMsg = "";
			}
		} else if($scope.challengeHTMLDataEntryField) {
			if(challengeHtmlDataEntryVal == undefined || challengeHtmlDataEntryVal == ""){
				$scope.updateSuccMsg = "";
				return;
			}
			if($scope.cReqMessageObj.challengeHTMLDataEntry != undefined && $scope.cReqMessageObj.challengeHTMLDataEntry != ""){
				$scope.cReqMessageObj.challengeHTMLDataEntry = challengeHtmlDataEntryVal;
				$scope.cReqMessage = vkbeautify.json(JSON.stringify($scope.cReqMessageObj), 2);
				$scope.updateSuccMsg = "Challenge HTML Data Entry value updated successfully";
			} else {
				$scope.cReqMessage = vkbeautify.json(JSON.stringify($scope.cReqMessageObj), 2);
				$scope.updateSuccMsg = "";
			}
		}
	}
	
}]);