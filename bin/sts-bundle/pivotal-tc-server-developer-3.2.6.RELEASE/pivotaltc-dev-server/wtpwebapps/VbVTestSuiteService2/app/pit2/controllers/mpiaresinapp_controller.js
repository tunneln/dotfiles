
"use strict";

var mpiAResInAppMod = angular.module("MPIAResInAppModule",[]);
mpiAResInAppMod.controller("MPIAResInAppCtrl",["$scope","AdministerTestsServiceInappPIT2","$rootScope","$window",function($scope,AdministerTestsServiceInappPIT2,$rootScope,$window){

	$scope.loading=false;
	$scope.pageloaded=true;
	$scope.componentType = "MPI";
	$scope.applnId = "PIT2";
	$scope.msgType = "ARes";
	$scope.testCaseType = "01";
	$scope.selectedTestCase;
	$scope.testCaseName;
	$scope.requiredByRegion;
	$scope.pan;
	$scope.pitAction;
	$scope.aResTemplate;
	$scope.compliance;
	$scope.previousTestCase;
	$scope.selectedRegions = [];
	$scope.actionTemplates = [];
	$scope.successorCResTC = [];
	$scope.aResTemplate = {};
	$scope.aReqMandFields;
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

	$scope.pitActions = [ "None","No Response From Visa Directory Server"];
	$scope.selectedTestCaseObj = {};
	$scope.isExistingTC = false;
	$scope.cResSuccessorIdTCs = [];

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
					$scope.aResTemplate = '';
					$scope.aReqMandFields = '';
					$scope.cResSuccessorIdTCs = $scope.tcResData[0].successorIdTCs;
				}
			}else if($scope.tcResData.length == 0){
				$scope.isExistingTC = false;
				$scope.pageloaded=false;
				$scope.pitAction = "None";
				$scope.aResTemplate = '';
				$scope.aReqMandFields = '';
			}
			else{
				$scope.isExistingTC = false;
			}
		})
	}
	/* -------------------End of getTestCases Method------------------------ */

	/* On Controller Load calling the 'getTestCases' method to get the test cases */
	$scope.getTestCases($scope.msgType,$scope.testCaseType);

	/* Method to set the selected test case object data */
	$scope.setData = function(selectedTestCaseObj){
		$scope.selectedTestCase  = selectedTestCaseObj.testCaseId;
		$scope.testCaseName = selectedTestCaseObj.tcName;
		$scope.compliance=selectedTestCaseObj.compliance;
		$scope.aReqMandFields = selectedTestCaseObj.expctdMpiReqFields;
		console.log("successor CRes :: "+selectedTestCaseObj.successorIdTCs);
		console.log("successor CRes length :: "+selectedTestCaseObj.successorIdTCs.length);
		if(selectedTestCaseObj.tcActionTmpl.length > 0)
			$scope.pitAction =	selectedTestCaseObj.tcActionTmpl[0].actnTemplName;
		else
			$scope.pitAction = "None";
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
		$scope.cResSuccessorIdTCs = selectedTestCaseObj.successorIdTCs; //list of all successor test cases
		$scope.successorCResTC = selectedTestCaseObj.selectedSuccIdTCs; //list of selected successor test cases
		//$scope.requiredByRegion = selectedTestCaseObj.;
		$scope.pan = selectedTestCaseObj.pan;
		$scope.aResTemplate = vkbeautify.json(selectedTestCaseObj.templeteMsg,1);
		$scope.pageloaded=false;
	}
	/* -------------------End of setData Method------------------------ */

	/* Method to update all the values based on the selected 
	 * test case value('TC' in the method name is Test Case) 
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
			$scope.successorCResTC = [];
			//$scope.requiredByRegion = selectedTestCaseObj.;
			$scope.pan = '';
			$scope.pitAction = "None";
			$scope.aResTemplate = '';
			$scope.aReqMandFields = '';
			$scope.selectedRegions = [];
			angular.forEach($scope.regions,function(value){ // Loop to keep the value unchecked
				value.flag = false;
			})
		}
	}
	/* -------------------End of changeTCReqData Method------------------------ */
	$scope.jsonFormat = function(type){
		if(type=='ARes'){
			var aResmsg=$scope.aResTemplate;
			$scope.aResTemplate = vkbeautify.json(aResmsg,1);
		}
		if(type=='expAResResp'){
			var expectedResponseAcs=$scope.expectedResMsg;
			$scope.expectedResMsg = vkbeautify.json(expectedResponseAcs,1);
		}
	}

	$scope.jsonUnformat = function(type){
		if(type=='ARes'){
			var aResmsg=$scope.aResTemplate;
			$scope.aResTemplate = vkbeautify.jsonmin(aResmsg);
		}
		if(type=='expAResResp'){
			var expectedResponseAcs=$scope.expectedResMsg;
			$scope.expectedResMsg = vkbeautify.jsonmin(expectedResponseAcs);
		}
	}

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

	/* Method to create/update/delete a MPIARes Test Case */
	$scope.mpiAResSubmit = function(operationType,compliance){
		console.log("selected CRes tcs ====== "+$scope.successorCResTC);
		//console.log("selected CRes tcs length ====== "+$scope.successorCResTC.length);
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
				"successorIdTCs":$scope.successorCResTC,
				"pan":$scope.pan,
				"templeteMsg":$scope.aResTemplate,
				"regnCds":$scope.selectedRegions,
				"actnTemplName":$scope.actionTemplates,
				"componentType":$scope.componentType,
				"applnId":$scope.applnId,
				"msgType":$scope.msgType,
				"deviceChannel":$scope.testCaseType,
				"compliance":$scope.compliance,
				"expctdMpiReqFields":$scope.aReqMandFields
		}

		console.log("selected successorids in data object :: "+data.successorIdTCs);
		$scope.loading=true;
		AdministerTestsServiceInappPIT2.createNewTestCase(data).then(function successCallback(response){
			$scope.loading=false;
			console.log("Status of the test case txn : "+response.status);
			console.log("Test case created successfully");
			$scope.getTestCases($scope.msgType,$scope.testCaseType);
			$rootScope.showErrorAlert = false;
			$rootScope.showSuccessAlert = true;
			if(operationType == 'create')
				$rootScope.successMessage = "3DS ARes InApp test case '"+$scope.testCaseName+"' created";
			else if(operationType == 'update'){
				$rootScope.successMessage = "3DS ARes InApp test case '"+$scope.testCaseName+"' updated";
				$scope.previousTestCase = $scope.selectedTestCase;
			}
			else if(operationType == 'delete')
				$rootScope.successMessage = "3DS ARes InApp test case '"+$scope.testCaseName+"' deleted";
			$window.scrollTo(0,0);

		},function errorCallback(response)
		{
			$scope.loading=false;
			console.log("Test case creation Failed");
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if(response.data.errorMessage != null)
				$rootScope.errorMessage = response.data.errorMessage;
			else
				$rootScope.errorMessage = "Transaction Failed";
			$window.scrollTo(0,0);
		})
	}
	/* -------------------End of createTestCase Method---------------------- */

	$scope.deleteConfirm = function(){
		if($window.confirm("Are you sure you want to delete '"+$scope.testCaseName+"' test case")) {
			$scope.mpiAResSubmit('delete');
		}
	}


}]);
