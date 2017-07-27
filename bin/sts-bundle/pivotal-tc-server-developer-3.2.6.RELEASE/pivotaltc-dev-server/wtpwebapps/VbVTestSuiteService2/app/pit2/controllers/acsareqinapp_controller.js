"use strict"; 

var acsAReqMod = angular.module("ACSAReqModuleInApp",[]);
acsAReqMod.controller("ACSAReqCtrlInApp",["$scope","AdministerTestsServiceInappPIT2","$rootScope","$window",function($scope,AdministerTestsServiceInappPIT2,$rootScope,$window){

	$scope.loading=false;
	$scope.pageloaded=true;
	$scope.componentType = "ACS";
	$scope.applnId = "PIT2";
	$scope.msgType = "AReq";
	$scope.testCaseType = "01";
	$scope.selectedTestCase;
	$scope.testCaseName;
	$scope.successorCReqTC=[];
	$scope.requiredByRegion;
	$scope.pitAction;
	$scope.aReqTemplate;
	$scope.aReqTemplate={};
	$scope.compliance;
	$scope.previousTestCase;
	$scope.selectedRegions = [];
	$scope.regions = [{
		"value" : "U.S.A",
		"rgnCd" : "01",
		"flag" : false
	}, {
		"value" : "CANADA",
		"rgnCd" : "02",
		"flag" : false
	}, {
		"value" : "E.U.",
		"rgnCd" : "03",
		"flag" : false
	}, {
		"value" : "ASIAPAC",
		"rgnCd" : "04",
		"flag" : false
	}, {
		"value" : "LAT.AM.",
		"rgnCd" : "05",
		"flag" : false
	}, {
		"value" : "C.E.M.E.A.",
		"rgnCd" : "06",
		"flag" : false
	} ];
	$scope.pitActions = [ "None",
	                      "Directory server uses invalid client certificate",
	                      "Use E-Commerce client SSL/TLS Cert"
	                      ];
	$scope.expectedResponses = [{
		"value":"3-D Secure Error Message",
		"selected":false
	},{
		"value":"Invalid Certificate Error",
		"selected":false
	},/*{
		"value":"PAN Authentication Available = Y",
		"selected":false
	},{
		"value":"PAN Authentication Available = N",
		"selected":false
	},{
		"value":"PAN Authentication Available = U",
		"selected":false
	},{
		"value":"PAN Authentication Available = R",
		"selected":false
	},*/
	{
		"value":"Transaction Status = N",
		"selected":false
	},{
		"value":"Transaction Status = C",
		"selected":false
	},{
		"value":"Transaction Status = Y",
		"selected":false
	},{
		"value":"Transaction Status = R",
		"selected":false
	},{
		"value":"Transaction Status = A",
		"selected":false
	}/*,{
		"value":"Transaction Status = U",
		"selected":false
	}*/];


	$scope.selectedTestCaseObj = {};
	$scope.optionExpectedRes;
	$scope.actionTemplates = [];
	$scope.selectedExpResps = [];
	$scope.cReqSuccessorIdTCs = [];
	$scope.successorCReqTC = [];
	$scope.isExistingTC = false;

	/* Method to get the Test Cases */ 
	$scope.getTestCases = function(msgType,testCaseType){
		$scope.tcResData = [];
		$scope.testCases = [];
		AdministerTestsServiceInappPIT2.getTestCases(msgType,testCaseType).then(function(response){
			$scope.tcResData = response.data;
			if($scope.tcResData.length > 0){
				if(response.data[0].testCaseId != null && response.data[0].testCaseId != undefined && response.data[0].testCaseId != ""){
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
				}else{
					$scope.isExistingTC = false;
					$scope.pageloaded=false;
					$scope.pitAction = "None";
					$scope.aReqTemplate = '';
					$scope.cReqSuccessorIdTCs = $scope.tcResData[0].successorIdTCs;
				}
				
			}else if($scope.tcResData.length == 0){
				$scope.isExistingTC = false;
				$scope.pageloaded=false;
				$scope.pitAction = "None";
				$scope.aReqTemplate = '';
			}else{
				$scope.isExistingTC = false;
			}

		})
	} // End of getTestCases Method.

	/* On Controller Load calling the method to get the test cases */
	$scope.getTestCases($scope.msgType,$scope.testCaseType);

	/* Method to set the selected test case object data */
	$scope.setData = function(selectedTestCaseObj){
		$scope.successorCReqTC = [];
		$scope.expectedResMsg = [];
		$scope.selectedExpResps = [];
		$scope.selectedTestCase  = selectedTestCaseObj.testCaseId;
		$scope.compliance=selectedTestCaseObj.compliance;
		$scope.testCaseName = selectedTestCaseObj.tcName;
		//$scope.successorCReqTC = selectedTestCaseObj.selectedSuccessorId;
		$scope.expectedResMsg = selectedTestCaseObj.expctdRespAcs;
		if(selectedTestCaseObj.tcActionTmpl.length > 0){
			$scope.pitAction =	selectedTestCaseObj.tcActionTmpl[0].actnTemplName;
		}
		// Logic to keep the selected regions checked for the existing test cases.
		if(selectedTestCaseObj.region.length > 0){
			$scope.selectedRegions = [];
			angular.forEach(selectedTestCaseObj.region,function(value){
				$scope.selectedRegions.push(value.regnCd);
			})
			angular.forEach($scope.regions,function(value){ // Loop to keep the values checked
				if($scope.selectedRegions.indexOf(value.rgnCd) != -1){
					value.flag = true;
				}else{
					value.flag = false;
				}
			})
		}else{
			$scope.selectedRegions = [];
			angular.forEach($scope.regions,function(value){ // Loop to keep the value unchecked
				value.flag = false;
			})
		}
		if(selectedTestCaseObj.expectedMshg.length > 0){

			angular.forEach(selectedTestCaseObj.expectedMshg,function(expctdRes){
				$scope.selectedExpResps.push(expctdRes.exptRespDesc);
			})
		}

		$scope.cReqSuccessorIdTCs = selectedTestCaseObj.successorIdTCs;
		if(selectedTestCaseObj.selectedSuccIdTCs != null){
			if(selectedTestCaseObj.selectedSuccIdTCs.length > 0){
				/*angular.forEach(selectedTestCaseObj.successorIdTCs,function(successorId){
				$scope.successorCReqTC.push(successorId);
			})*/
				$scope.successorCReqTC = selectedTestCaseObj.selectedSuccIdTCs;
			}
		}
		//$scope.cResSuccessorIdTCs = selectedTestCaseObj.successorIdTCs;


		//$scope.requiredByRegion = selectedTestCaseObj.;
		$scope.aReqTemplate = vkbeautify.json(selectedTestCaseObj.templeteMsg,1);
		$scope.pageloaded=false;

	}

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
			$scope.aReqTemplate = '';
			$scope.selectedRegions = [];
			$scope.expectedResMsg = '';
			$scope.selectedExpResps = [];
			$scope.successorCReqTC = [];
			angular.forEach($scope.regions,function(value){ // Loop to keep the value unchecked
				value.flag = false;
			})
		}
	}
	/* -------------------End of changeTCReqData Method------------------------ */

	/* Method to add the selected regions to the list */
	$scope.selectedRegion = function(region){
		if($scope.selectedRegions.length > 0){
			var index;
			angular.forEach($scope.selectedRegions,function(value){
				if(value === region)
					index = $scope.selectedRegions.indexOf(value);
			})
			if(index != undefined)
				$scope.selectedRegions.splice(index,1);
			else
				$scope.selectedRegions.push(region);
		}else{ // Adding the selected value when length is '0'
			$scope.selectedRegions.push(region);
		}
	}
	/* -------------------End of selectedRegion Method----------------------- */
	$scope.jsonFormat= function(type){
		if(type=='AReq'){
			var aReqmsg=$scope.aReqTemplate;
			$scope.aReqTemplate = vkbeautify.json(aReqmsg,1);
		}
		if(type=='expAReqResp'){
			var expectedResponseAcs=$scope.expectedResMsg;
			$scope.expectedResMsg = vkbeautify.json(expectedResponseAcs,1);
		}
	}


	$scope.jsonUnformat= function(type){
		if(type=='AReq'){
			var aReqmsg=$scope.aReqTemplate;
			$scope.aReqTemplate = vkbeautify.jsonmin(aReqmsg);
		}
		if(type=='expAReqResp'){
			var expectedResponseAcs=$scope.expectedResMsg;
			$scope.expectedResMsg = vkbeautify.jsonmin(expectedResponseAcs);
		}
	}

	/* Method to create/update/delete a ACSVEReq Test Case */
	$scope.acsAReqSubmit = function(operationType,compliance){
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
				"operationType": operationType,
				"testCaseId": $scope.selectedTestCase,
				"tcName": $scope.testCaseName,
				"templeteMsg": $scope.aReqTemplate,
				"regnCds": $scope.selectedRegions,
				"actnTemplName": $scope.actionTemplates,
				"expctdRespAcs": $scope.expectedResMsg,
				"exptRespDesc": $scope.selectedExpResps,
				"successorIdTCs": $scope.successorCReqTC,
				"componentType": $scope.componentType,
				"applnId": $scope.applnId,
				"msgType": $scope.msgType,
				"deviceChannel": $scope.testCaseType,
				"compliance":$scope.compliance

		}
		$scope.loading=true;
		AdministerTestsServiceInappPIT2.createNewTestCase(data).then(function(response){
			$scope.loading=false;
			$scope.getTestCases($scope.msgType,$scope.testCaseType);
			$rootScope.showErrorAlert = false;
			$rootScope.showSuccessAlert = true;
			if(operationType == 'create')
				$rootScope.successMessage = "ACS AReq InApp test case '"+$scope.testCaseName+"' created";
			else if(operationType == 'update'){
				$rootScope.successMessage = "ACS AReq InApp test case '"+$scope.testCaseName+"' updated";
				$scope.previousTestCase = $scope.selectedTestCase;
			}
			else if(operationType == 'delete')
				$rootScope.successMessage = "ACS AReq InApp test case '"+$scope.testCaseName+"' deleted";

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
	/* -------------------End of createTestCase Method---------------------- */

	$scope.deleteConfirm = function(){
		if($window.confirm("Are you sure you want to delete '"+$scope.testCaseName+"' test case")) {
			$scope.acsAReqSubmit('delete');
		}
	}
	
	$scope.optionExpRes = function(){
		AdministerTestsServiceInappPIT2.getUseTemplate().then(function(response){
			$scope.expectedResMsg=vkbeautify.json(response.data);

		})
	}
	
	$scope.expRespJsonFormat = function(){
		var expRespmsg = $scope.expectedResMsg;
		if($scope.expectedResMsg != "" && $scope.expectedResMsg!=null){
			$scope.expectedResMsg = vkbeautify.json(expRespmsg,1);
		}else{
			return;
		}
	}

	$scope.expRespJsonUnformat = function(){
		var expRespmsg=$scope.expectedResMsg;
		if($scope.expectedResMsg!="" && $scope.expectedResMsg!=null){
			$scope.expectedResMsg = vkbeautify.jsonmin(expRespmsg);
		}else{
			return;
		}
	}
}]);