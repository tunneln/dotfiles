
"use strict";

var mpiCResMod = angular.module("MPICResModule",[]);
mpiCResMod.controller("MPICResCtrl",["$scope","AdministerTestsServicePIT2","$rootScope","$window",function($scope,AdministerTestsServicePIT2,$rootScope,$window){

	$scope.loading=false;
	$scope.pageloaded=true;
	$scope.componentType = "MPI";
	$scope.applnId = "PIT2";
	$scope.msgType = "CRes";
	$scope.testCaseType = "02";
	$scope.selectedTestCase;
	$scope.testCaseName;
	$scope.requiredByRegion;
	$scope.pan;
	$scope.pitAction;
	$scope.cResTemplate;
	$scope.compliance;
	$scope.previousTestCase;
	$scope.actionTemplates = [];
	$scope.pitActions = [ "None", "Generate Invalid ACS Signature",
	                      "Use Expired ACS Signing Certificate",
	                      "Include newlines in BASE64",
	                      "Use ECommerce Signing Certificate" ];

	$scope.selectedTestCaseObj = {};
	$scope.isExistingTC = false;
	$scope.cResTemplate ={};
	$scope.cReqMandFields;

	/* Method to get the Test Cases */ 
	$scope.getTestCases = function(msgType,testCaseType){
		$scope.testCases = [];
		$scope.tcResData = [];
		$scope.actionTemplates = [];
		AdministerTestsServicePIT2.getTestCases(msgType,testCaseType).then(function(response){
			$scope.tcResData = response.data;
			if($scope.tcResData.length > 0){
				$scope.isExistingTC = true;
				angular.forEach($scope.tcResData,function(value){
					$scope.testCases.push({"tcId":value.testCaseId,"tcDesc":value.tc_desc});
				})
				if($scope.previousTestCase>0 || $scope.previousTestCase!=null){
					var index = $scope.tcResData.map(function(e) { return e.testCaseId; }).indexOf($scope.previousTestCase);
					$scope.selectedTestCaseObj = $scope.tcResData[index];
					$scope.setData($scope.selectedTestCaseObj);
					$scope.previousTestCase = null;
				}else{
					$scope.selectedTestCaseObj = $scope.tcResData[0];
					$scope.setData($scope.selectedTestCaseObj);
				}
			}else if($scope.tcResData.length == 0){
				$scope.isExistingTC = false;
				$scope.pageloaded=false;
				$scope.pitAction = "None";
				$scope.cResTemplate = '';
				$scope.cReqMandFields = '';
			}else{
				$scope.isExistingTC = false;
			}
		})
	}
	/* -------------------End of getTestCases Method------------------------ */

	/* On Controller Load calling the method to get the test cases */
	$scope.getTestCases($scope.msgType,$scope.testCaseType);

	/* Method to set the selected test case object data */
	$scope.setData = function(selectedTestCaseObj){

		$scope.selectedTestCase  = selectedTestCaseObj.testCaseId;
		$scope.testCaseName = selectedTestCaseObj.tcName;
		$scope.compliance=selectedTestCaseObj.compliance;
		$scope.cReqMandFields = selectedTestCaseObj.expctdMpiReqFields;
		$scope.pan = selectedTestCaseObj.pan;
		if(selectedTestCaseObj.tcActionTmpl.length > 0){
			$scope.pitAction =	selectedTestCaseObj.tcActionTmpl[0].actnTemplName;
		}
		$scope.cResTemplate = selectedTestCaseObj.templeteMsg;
		$scope.pageloaded=false;
		console.log("template :: "+selectedTestCaseObj.tcActionTmpl[0].actnTemplName);
	}
	/* -------------------End of setData Method------------------------ */
	$scope.jsonFormat = function(type){
		if(type=='CRes'){
			var cResmsg=$scope.cResTemplate;
			$scope.cResTemplate = vkbeautify.json(cResmsg,1);
		}
		if(type=='expCResResp'){
			var expectedResponseAcs=$scope.expectedResMsg;
			$scope.expectedResMsg = vkbeautify.json(expectedResponseAcs,1);
		}
	}


	$scope.jsonUnformat = function(type){
		if(type=='CRes'){
			var cResmsg=$scope.cResTemplate;
			$scope.cResTemplate = vkbeautify.jsonmin(cResmsg);
		}
		if(type=='expCResResp'){
			var expectedResponseAcs=$scope.expectedResMsg;
			$scope.expectedResMsg = vkbeautify.jsonmin(expectedResponseAcs);
		}
	}


	/* Method to update all the values based on the selected 
	 * test case value 
	 */
	$scope.changeTCReqData = function(tcId){
		var index = $scope.tcResData.map(function(e) { return e.testCaseId; }).indexOf(tcId);
		if(index != -1){
			$scope.isExistingTC = true;
			$scope.selectedTestCaseObj = $scope.tcResData[index];
			$scope.setData($scope.selectedTestCaseObj);
		}else{
			$scope.isExistingTC = false;
			$scope.selectedTestCase = '';
			$scope.testCaseName = '';
			$scope.pan = '';
			$scope.pitAction = 'None';
			$scope.cResTemplate = '';
			$scope.actionTemplates = [];
			$scope.cReqMandFields = '';
		}
	}
	/* -------------------End of changeTCReqData Method------------------------ */

	/* Method to create/update/delete a MPICRes Test Case */
	$scope.mpiCResSubmit = function(operationType,compliance){
		/*if(compliance){
			$scope.componentType = 'MPI_REQUIRED';
		}else{
			$scope.componentType = 'MPI';
		}*/
		$scope.actionTemplates = [];
		$scope.actionTemplates.push($scope.pitAction);
		var data = {
				"operationType":operationType,
				"testCaseId":$scope.selectedTestCase,
				"tcName":$scope.testCaseName,
				"pan":$scope.pan,
				"templeteMsg":$scope.cResTemplate,
				"actnTemplName":$scope.actionTemplates,
				"componentType":$scope.componentType,
				"applnId":$scope.applnId,
				"msgType":$scope.msgType,
				"deviceChannel" : $scope.testCaseType,
				"compliance":$scope.compliance,
				"expctdMpiReqFields":$scope.cReqMandFields
		}
		console.log("action tempalte :: "+$scope.actionTemplates);
		$scope.loading=true;
		AdministerTestsServicePIT2.createNewTestCase(data).then(function successCallback(response){
			$scope.loading=false;
			$scope.getTestCases($scope.msgType,$scope.testCaseType);
			$rootScope.showErrorAlert = false;
			$rootScope.showSuccessAlert = true;
			if(operationType == 'create')
				$rootScope.successMessage = "3DS CRes Browser test case '"+$scope.testCaseName+"' created";
			else if(operationType == 'update'){
				$rootScope.successMessage = "3DS CRes Browser test case '"+$scope.testCaseName+"' updated";
				$scope.previousTestCase = $scope.selectedTestCase;
			}
			else if(operationType == 'delete')
				$rootScope.successMessage = "3DS CRes Browser test case '"+$scope.testCaseName+"' deleted";

			$window.scrollTo(0,0);

		},function errorCallback(response)
		{
			$scope.loading=false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if(response.data.errorMessage != null)
				$rootScope.errorMessage = response.data.errorMessage;
			else
				$rootScope.errorMessage = "Transaction Failed";

			$window.scrollTo(0,0);

		});
	}
	/* -------------------End of mpiPAResSubmit Method---------------------- */

	$scope.deleteConfirm = function(){
		if($window.confirm("Are you sure you want to delete '"+$scope.testCaseName+"' test case")) {
			$scope.mpiCResSubmit('delete');
		}
	}

}]);
