/**
 * @author vkallada
 */

"use strict";

var acssAResMod = angular.module("ACSSAResModuleInApp",[]);
acssAResMod.controller("ACSSAResCtrlInApp",["$scope","ACSSAResServiceInApp","$rootScope","$window",function($scope,ACSSAResServiceInApp,$rootScope,$window){
	$scope.loading=false;
	$scope.msgType = "ARes";
	$scope.selectedTestCase = '';
	$scope.testCaseName = '';
	$scope.pan = '';
	$scope.aResTemplateMsg	= '';
	$scope.testCases = [];
	$scope.selectedTestCaseObj = {};
	$scope.successorPAResTC = '';
	$scope.isExistingTC = false;
	$scope.isInApp = true;
	$scope.previousTestCase;

	/**
	 * Method to get the all the ARes test cases
	 */
	$scope.getTestCases = function(){
		ACSSAResServiceInApp.getTestCases($scope.msgType,$scope.isInApp).then(function(response){

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
				$scope.aResTemplateMsg = '';
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
			$scope.aResTemplateMsg	= vkbeautify.json(acsstestCase.templateMsg,1);
		}else{
			$scope.resetTCData();
		}
	}
	/*------------------End of setTestCaseData method-------------------*/

	/**
	 * method to reset all the inpust
	 */
	$scope.resetTCData = function(){
		$scope.selectedTestCase = '';
		$scope.testCaseName = '';
		$scope.pan = '';
		$scope.aResTemplateMsg	= '';
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

	/**
	 * method to create / update / delete a test case
	 * @param operationType (create / update / delete)
	 */
	$scope.submitTestCase = function(operationType){

		var data = {
				"operationType" : operationType,
				"selectedTestCase" : $scope.selectedTestCase,
				"testCaseId":$scope.selectedTestCase,
				"testCaseName" : $scope.testCaseName,
				"pan" : $scope.pan,
				"templateMsg" : $scope.aResTemplateMsg,
				"msgType" : $scope.msgType,
				"inAppTestCase" : $scope.isInApp
		}
		$scope.loading=true;
		ACSSAResServiceInApp.submit(data).then(function successCallback(response){
			$scope.loading=false;

			$rootScope.showErrorAlert = false;	
			$rootScope.showSuccessAlert = true;
			if(operationType == 'create')
				$rootScope.successMessage = "ACSS ARes InApp test case '"+$scope.testCaseName+"' created";
			else if(operationType == 'update'){
				$rootScope.successMessage = "ACSS ARes InApp test case '"+$scope.testCaseName+"' updated";
				$scope.previousTestCase = $scope.selectedTestCase;
			}
			else if(operationType == 'delete')
				$rootScope.successMessage = "ACSS ARes InApp test case '"+$scope.testCaseName+"' deleted";
			$window.scrollTo(0,0);

			$scope.getTestCases();
		},function errorCallback(response)
		{
			$scope.loading=false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if(response.data.errorMessage != null)
				$rootScope.errorMessage = response.error.errorMessage;
			else
				$rootScope.errorMessage = "Transaction Failed";
			$window.scrollTo(0,0);
		});
	}
	/*------------------End of submitTestCase method-------------------*/

	$scope.deleteConfirm = function(){
		if($window.confirm("Are you sure you want to delete '"+$scope.testCaseName+"' test case")) {
			$scope.submitTestCase('delete');
		}
	}

	$scope.jsonFormat = function(){
		var aResmsg=$scope.aResTemplateMsg;
		$scope.aResTemplateMsg = vkbeautify.json(aResmsg,1);
	}

	$scope.jsonUnformat = function(){
		var aResmsg=$scope.aResTemplateMsg;
		$scope.aResTemplateMsg = vkbeautify.jsonmin(aResmsg);
	}
}]);
