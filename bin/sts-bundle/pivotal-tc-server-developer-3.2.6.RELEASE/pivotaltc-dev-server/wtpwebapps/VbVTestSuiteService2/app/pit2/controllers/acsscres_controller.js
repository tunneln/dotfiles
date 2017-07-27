/**
 * 
 */

"use strict";

var acssCResMod = angular.module("ACSSCResModule",[]);
acssCResMod.controller("ACSSCResCtrl",["$scope","ACSSCResService","$rootScope","$window",function($scope,ACSSCResService,$rootScope,$window){
	$scope.msgType = "CRes";
	$scope.testCases = [];
	$scope.selectedTestCaseObj = {};
	$scope.reqPwdCnfrmScreen = false;
	$scope.reqADSScreen = false;
	$scope.reqPwdScreen = false;
	$scope.isExistingTC = false;
	$scope.selectedReqScreen = '';
	$scope.loading=false;	
	$scope.isInApp = false;
	$scope.pageloaded=true;
	$scope.previousTestCase;
	/**
	 * Method to get the all the CRes test cases
	 */
	$scope.getTestCases = function(){
		ACSSCResService.getTestCases($scope.msgType,$scope.isInApp).then(function(response){
			
			$scope.testCases = response.data;
			if($scope.testCases.length > 0){
				$scope.isExistingTC = true;
				if($scope.previousTestCase>0 || $scope.previousTestCase!=null){
					var index = $scope.testCases.map(function(e) { return e.testCaseId; }).indexOf($scope.previousTestCase);
					$scope.selectedTestCaseObj = $scope.testCases[index];
					$scope.setTestCaseData($scope.selectedTestCaseObj);
					$scope.previousTestCase = null;
				}else{
					$scope.selectedTestCaseObj = $scope.testCases[0];
					$scope.setTestCaseData($scope.selectedTestCaseObj);
				}
			}else if($scope.testCases.length == 0){
				$scope.isExistingTC = false;
				$scope.pageloaded=false;
				$scope.cResTemplateMsg = '';
			}else{
				$scope.isExistingTC = false;
			}
		});
	}
	/*------------------End of getTestCases method-------------------*/
	
	/**
	 * On controller load calling the getTestCases method.
	 */
	$scope.getTestCases();
	
	/**
	 * method to bind the selected test case data.
	 */
	$scope.setTestCaseData = function(acsstestCase){
		if(acsstestCase != undefined){
			$scope.resetTCData();
			$scope.isExistingTC = true;
			$scope.selectedTestCase = acsstestCase.testCaseId;
			$scope.testCaseName = acsstestCase.testCaseName;
			$scope.pan = acsstestCase.pan;
			$scope.cResTemplateMsg	= vkbeautify.json(acsstestCase.templateMsg,2);
			if(acsstestCase.requiredPwdScreen == true)
				$scope.selectedReqScreen = "PCS";
			else if(acsstestCase.requiredADSScreen == true)
				$scope.selectedReqScreen = "ADS";
			$scope.reqPwdScreen = acsstestCase.requiredPwdScreen;
			$scope.reqADSScreen = acsstestCase.requiredADSScreen;
			$scope.reqPwdCnfrmScreen = acsstestCase.requiredPwdConfirmScreen;
		}else{
			$scope.resetTCData();
		}
		$scope.pageloaded=false;
	}
	/*------------------End of setTestCaseData method-------------------*/
	
	/**
	 * method to reset all the input
	 */
	$scope.resetTCData = function(){
		$scope.selectedTestCase = '';
		$scope.testCaseName = '';
		$scope.pan = '';
		$scope.cResTemplateMsg	= '';
		$scope.reqPwdCnfrmScreen = false;
		$scope.reqADSScreen = false;
		$scope.reqPwdScreen = false;
		$scope.selectedReqScreen = '';
		$scope.selectedTestCaseObj = {};
		$scope.isExistingTC = false;
	}
	/*------------------End of resetTCData method-------------------*/
	
	/**
	 * method to bind the selectedTestCaseObj with the selected Test Case
	 * @param index value of the selected test case 
	 */
	$scope.setSelectedTCData = function(selectedTestCase){
		var index = $scope.testCases.map(function(e) { return e.testCaseId; }).indexOf(selectedTestCase);
		if(index != -1){
			$scope.selectedTestCaseObj = $scope.testCases[index];
			$scope.setTestCaseData($scope.selectedTestCaseObj);
		}else{
			$scope.resetTCData();
		}
	}
	/*------------------End of setSelectedTCData method-------------------*/
	
	$scope.submitTestCase = function(operationType){
		
		$scope.reqPwdScreen = false;
		$scope.reqADSScreen = false;
		if($scope.selectedReqScreen == "PCS")
			$scope.reqPwdScreen = true;
		else if($scope.selectedReqScreen == "ADS")
			$scope.reqADSScreen = true;
		var data = {
				"operationType" : operationType,
				"selectedTestCase" : $scope.selectedTestCase,
				"testCaseId":$scope.selectedTestCase,
				"testCaseName" : $scope.testCaseName,
				"pan" : $scope.pan,
				"templateMsg" : $scope.cResTemplateMsg,
				"requiredPwdConfirmScreen" : $scope.reqPwdCnfrmScreen,
				"requiredADSScreen" : $scope.reqADSScreen,
				"requiredPwdScreen" : $scope.reqPwdScreen,
				"msgType" : $scope.msgType,
				"inAppTestcase" : $scope.isInApp
		}
		$scope.loading=true;
		ACSSCResService.submit(data).then(function successCallback(response){
			$scope.loading=false;
			
			$rootScope.showErrorAlert = false;	
			$rootScope.showSuccessAlert = true;
			if(operationType == 'create')
				$rootScope.successMessage = "ACSS CRes Browser test case '"+$scope.testCaseName+"' created";
			else if(operationType == 'update'){
				$rootScope.successMessage = "ACSS CRes Browser test case '"+$scope.testCaseName+"' updated";
				$scope.previousTestCase = $scope.selectedTestCase;
			}
			else if(operationType == 'delete')
				$rootScope.successMessage = "ACSS CRes Browser test case '"+$scope.testCaseName+"' deleted";
			$window.scrollTo(0,0);
			
			$scope.getTestCases();
		},function errorCallback(response)
		{
			$scope.loading=false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if (response.data.errorMessage != null
					&& response.data.errorMessage != undefined)
				$rootScope.errorMessage = response.data.errorMessage;
			else
				$rootScope.errorMessage = "Transaction Failed";
			$window.scrollTo(0,0);
		});
	}
	
	$scope.deleteConfirm = function(){
		if($window.confirm("Are you sure you want to delete '"+$scope.testCaseName+"' test case")) {
			$scope.submitTestCase('delete');
		}
	}
	
	$scope.jsonFormat= function(){
		var cResmsg=$scope.cResTemplateMsg;
		$scope.cResTemplateMsg = vkbeautify.json(cResmsg,1);
	}

	$scope.jsonUnformat= function(){
		var cResmsg=$scope.cResTemplateMsg;
		$scope.cResTemplateMsg = vkbeautify.jsonmin(cResmsg);
	}
}]);
