"use strict";

var acsCReqMod = angular.module("ACSCReqModule",[]);
acsCReqMod.controller("ACSCReqCtrl",["$scope","AdministerTestsServicePIT2","$rootScope","$window",function($scope,AdministerTestsServicePIT2,$rootScope,$window){
	
	$scope.loading=false;
	$scope.pageloaded=true;
	$scope.componentType = "ACS";
	$scope.applnId = "PIT2";
	$scope.msgType = "CReq";
	$scope.testCaseType = "02";
	$scope.selectedTestCase;
	$scope.testCaseName;
	$scope.expectedTCResult = [];
	$scope.pitAction;
	$scope.cReqTemplate;
	$scope.compliance;
	$scope.previousTestCase;
	$scope.pitActions = [ "None",
					"Include newlines in BASE64"];
	$scope.expectedResponses = [{
		"value":"3-D Secure Error Message",
		"selected":false
	},{
		"value":"Authentication Status = Y",
		"selected":false
	},{
		"value":"Authentication Status = A",
		"selected":false
	},{
		"value":"Authentication Status = N",
		"selected":false
	},{
		"value":"Transaction Status = Y",
		"selected":false
	},{
		"value":"Transaction Status = N",
		"selected":false
	}/*,{
		"value":"Transaction Status = U",
		"selected":false
	}*/,{
		"value":"Transaction Status = A",
		"selected":false
	},{
		"value":"Transaction Status = C",
		"selected":false
	},{
		"value":"Transaction Status = R",
		"selected":false
	}/*,{
		"value":"Authentication Status = U, IReq Code = 50",
		"selected":false
	},{
		"value":"Authentication Status = U, IReq Code = 51",
		"selected":false
	},{
		"value":"Authentication Status = U, IReq Code = 52",
		"selected":false
	},{
		"value":"Authentication Status = U, IReq Code = 53",
		"selected":false
	},{
		"value":"Authentication Status = U, IReq Code = 54",
		"selected":false
	},{
		"value":"Authentication Status = U, IReq Code = 55",
		"selected":false
	},{
		"value":"Authentication Status = U, IReq Code = 56",
		"selected":false
	},{
		"value":"Authentication Status = U, IReq Code = 57",
		"selected":false
	},{
		"value":"Authentication Status = U, IReq Code = 98",
		"selected":false
	},{
		"value":"Authentication Status = U, IReq Code = 99",
		"selected":false
	},{
		"value":"Authentication Status = U, No IReq expected",
		"selected":false
	}*/];
	
	$scope.selectedTestCaseObj = {};
	$scope.optionExpectedRes;
	$scope.actionTemplates = [];
	$scope.selectedExpResps = [];
	
	$scope.isExistingTC = false;
	
	$scope.jsonFormat= function(type){
		if(type=='CReq'){
		var cReqmsg=$scope.cReqTemplate;
		$scope.cReqTemplate = vkbeautify.json(cReqmsg,1);
	}
		if(type=='expCReqResp'){
			var expectedResponseAcs=$scope.expectedResMsg;
			$scope.expectedResMsg = vkbeautify.json(expectedResponseAcs,1);
		}
	}


	$scope.jsonUnformat= function(type){
		if(type=='CReq'){
		var cReqmsg=$scope.cReqTemplate;
		$scope.cReqTemplate = vkbeautify.jsonmin(cReqmsg);
		}
		if(type=='expCReqResp'){
			var expectedResponseAcs=$scope.expectedResMsg;
			$scope.expectedResMsg = vkbeautify.jsonmin(expectedResponseAcs);
		}
	}

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
				$scope.cReqTemplate = '';
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
		$scope.selectedExpResps = [];
		$scope.compliance=selectedTestCaseObj.compliance;
		$scope.selectedTestCase  = selectedTestCaseObj.testCaseId;
		$scope.testCaseName = selectedTestCaseObj.tcName;
		$scope.expectedResMsg = selectedTestCaseObj.expctdRespAcs;
		if(selectedTestCaseObj.tcActionTmpl.length > 0){
			$scope.pitAction =	selectedTestCaseObj.tcActionTmpl[0].actnTemplName;
		}
		if(selectedTestCaseObj.expectedMshg.length > 0){
			angular.forEach(selectedTestCaseObj.expectedMshg,function(expctdRes){
				$scope.selectedExpResps.push(expctdRes.exptRespDesc);
			})
		}
		$scope.cReqTemplate = selectedTestCaseObj.templeteMsg;
		$scope.pageloaded=false;
	}
	/* -------------------End of setData Method------------------------ */
	
	/* Method to update all the values based on the selected 
	 * test case value 
	 */
	$scope.changeTCReqData = function(tcId){
		$rootScope.showErrorAlert = false;
		var index = $scope.tcResData.map(function(e) { return e.testCaseId; }).indexOf(tcId);
		if(index != -1){
			$scope.isExistingTC = true;
			$scope.selectedTestCaseObj = $scope.tcResData[index];
			$scope.setData($scope.selectedTestCaseObj);
		}else{
			$scope.isExistingTC = false;
			$scope.selectedTestCase = '';
			$scope.testCaseName = '';
			$scope.pitAction = "None";
			$scope.actionTemplates = [];
			$scope.expectedResMsg = '';
			$scope.cReqTemplate = '';
			$scope.selectedExpResps = [];
		}
	}
	/* -------------------End of changeTCReqData Method------------------------ */
	
	/* Method to create/update/delete a ACSCReq Test Case */
	$scope.acsCReqSubmit = function(operationType,compliance){
		/*if(compliance){
			$scope.componentType = 'ACS_REQUIRED';
		}else{
			$scope.componentType = 'ACS';
		}*/
		if($scope.selectedExpResps == null || $scope.selectedExpResps == "" || $scope.selectedExpResps == undefined){
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			$rootScope.errorMessage = "Please select the Expected Test Case Result field";
			return;
		}
		$scope.actionTemplates = [];
		$scope.actionTemplates.push($scope.pitAction);
		var data = {
				"operationType":operationType,
				"testCaseId":$scope.selectedTestCase,
				"tcName":$scope.testCaseName,
				"templeteMsg":$scope.cReqTemplate,
				"actnTemplName":$scope.actionTemplates,
				"expctdRespAcs":$scope.expectedResMsg,
				"exptRespDesc":$scope.selectedExpResps,
				"componentType":$scope.componentType,
				"applnId":$scope.applnId,
				"msgType":$scope.msgType,
				"deviceChannel" : $scope.testCaseType,
				"compliance":$scope.compliance
		}
		$scope.loading=true;
		AdministerTestsServicePIT2.createNewTestCase(data).then(function successCallback(response){
			$scope.loading=false;
				$scope.getTestCases($scope.msgType,$scope.testCaseType);
				$rootScope.showErrorAlert = false;
				$rootScope.showSuccessAlert = true;
				if(operationType == 'create')
					$rootScope.successMessage = "ACS CReq Browser test case '"+$scope.testCaseName+"' created";
				else if(operationType == 'update'){
					$rootScope.successMessage = "ACS AReq Browser test case '"+$scope.testCaseName+"' updated";
				$scope.previousTestCase = $scope.selectedTestCase;
				}
				else if(operationType == 'delete')
					$rootScope.successMessage = "ACS CReq Browser test case '"+$scope.testCaseName+"' deleted";
				
				$window.scrollTo(0,0);
			
		},function errorCallback(response){
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
	/* -------------------End of createTestCase Method---------------------- */

	$scope.deleteConfirm = function(){
		if($window.confirm("Are you sure you want to delete '"+$scope.testCaseName+"' test case")) {
			$scope.acsCReqSubmit('delete');
		}
	}
	$scope.optionExpRes=function(){
		AdministerTestsServicePIT2.getUseTemplate().then(function(response){
			$scope.expectedResMsg=vkbeautify.json(response.data);
			
		})
	}
	$scope.expRespJsonFormat= function(){
		var expRespmsg=$scope.expectedResMsg;
		if($scope.expectedResMsg!="" && $scope.expectedResMsg!=null){
			$scope.expectedResMsg = vkbeautify.json(expRespmsg,1);
		}else{
			return;
		}
		
	}
	
	$scope.expRespJsonUnformat= function(){
		var expRespmsg=$scope.expectedResMsg;
		if($scope.expectedResMsg!="" && $scope.expectedResMsg!=null){
			$scope.expectedResMsg = vkbeautify.jsonmin(expRespmsg);
		}else{
			return;
		}
		
	}
}]);