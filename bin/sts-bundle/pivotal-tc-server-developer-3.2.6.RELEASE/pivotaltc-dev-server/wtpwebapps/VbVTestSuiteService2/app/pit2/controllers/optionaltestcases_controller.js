/**
 *	@author vkallada 
 */
'use strict';

var runACSTestCtrlMod = angular.module('PIT2RunACSTestCtrlMod',[]);

runACSTestCtrlMod.controller("ACSTestCasesCtrl", ["$scope","$rootScope","PIT2RunACSTest","$state", function($scope,$rootScope,PIT2RunACSTest,$state) {
	
	$scope.isPageloading = false;
	$scope.acsTestcases = [];
	$scope.testCaseData = {};
	$scope.selectedTestCaseObj = {};
	$scope.isSeleted = false;
	
	/**
	 * @author vkallada
	 * Method to load all the test cases on page load.
	 */
	$scope.getTestCases = function() {
		console.log("$scope.getTestCases")
		$scope.isPageloading = true;
		PIT2RunACSTest.getTestCases().then(function successCallback(resData) {
			console.log("No of test cases fetched : "+resData.Testcaseslist.length);
			$scope.isPageloading = false;
			$scope.acsTestcases = resData.Testcaseslist;
			$scope.threeDSTestCases = resData.ThreeDSTestcaseslist;
			PIT2RunACSTest.acsTestcases=$scope.acsTestcases;
			PIT2RunACSTest.threeDSTestCases=$scope.threeDSTestCases;
			for(var i=0 ;i<$scope.acsTestcases.length;i++){
				var val = $scope.acsTestcases[i].tcName.lastIndexOf('-');
				var testId = $scope.acsTestcases[i].tcName.substring(0,val);
				var testName = $scope.acsTestcases[i].tcName.substring(val+1,$scope.acsTestcases[i].tcName.length).replace("-","");
				$scope.acsTestcases[i].tcName = testName.trim();
				$scope.acsTestcases[i].tcSerNum = testId.trim();
				
			}
			for(var i=0 ;i<$scope.threeDSTestCases.length;i++){
				var valMpi = $scope.threeDSTestCases[i].tcName.lastIndexOf('-');
				var testIdMpi = $scope.threeDSTestCases[i].tcName.substring(0,valMpi);
				var testNameMpi = $scope.threeDSTestCases[i].tcName.substring(valMpi+1,$scope.threeDSTestCases[i].tcName.length).replace("-","")
				$scope.threeDSTestCases[i].tcName = testNameMpi.trim();
				$scope.threeDSTestCases[i].tcSerNum = testIdMpi.trim();
				
			}
			console.log("resData.AcsUrl :: "+resData.AcsUrl);
			$scope.url = resData.AcsUrl;
			if ($rootScope.check == true) {
				var indexOfSelectedTC = $scope.acsTestcases.map(function(e) { return e.tcID; }).indexOf($rootScope.tcID);
				console.log("indexOfSelectedTC :: "+indexOfSelectedTC);
				$scope.selectedTestCaseObj = $scope.acsTestcases[indexOfSelectedTC];
				console.log("$scope.selectedTestCaseObj :: "+$scope.selectedTestCaseObj);
				$rootScope.check = false;
				$scope.testCaseSelected($scope.selectedTestCaseObj);
			}
		}, function errorCallback(errorResponse){
			$scope.isPageloading = false;
			console.log("No test cases found");
		});
	}

	/* Calling the Method on page load */
	$scope.getTestCases();
	
	/**
	 * Method to show the selected test case data in the integration ACS Test page.
	 */
	$scope.testCaseSelected = function(selectedTCObj) {
		console.log("selected Test case : "+selectedTCObj);
		$scope.onlyACS=true;
		PIT2RunACSTest.onlyACS=$scope.onlyACS;
		if(selectedTCObj != null) {
			$scope.isPageloading = false;
			PIT2RunACSTest.getAReq(selectedTCObj.tcID).then(function(resData){
				$scope.AReq = vkbeautify.json(resData.data.RequestMessage,2);
				$scope.testCaseData = {
					"acsUrl" : $scope.url,
					"testcaseName" : selectedTCObj.tcName,
					"AReq" : $scope.AReq,
					"testcaseId" : selectedTCObj.tcID 
				}
				PIT2RunACSTest.selectedTCData = $scope.testCaseData;
				$state.go("PIT2.PIT2runACSTest");
				$scope.isPageloading = false;
			});
		}else{
			$scope.AReq ="";
		}
	}

	/**
	 * Method to display test cases based on user role selected.
	 */
	$scope.getOptionalTestCases = function(userRole) {
		$scope.isACS = false;
		$scope.is3DS = false;
		$scope.onlyACS = false;
		PIT2RunACSTest.onlyACS = $scope.onlyACS;
		PIT2RunACSTest.acsUrl = $scope.url;
		if ("ACS" == userRole) {
			$scope.isACS = true;
			$scope.is3DS = false;
			PIT2RunACSTest.isACS = $scope.isACS;
			PIT2RunACSTest.is3DS = $scope.is3DS;
		} else {
			$scope.is3DS = true;
			$scope.isACS = false;
			PIT2RunACSTest.is3DS = $scope.is3DS;
			PIT2RunACSTest.isACS = $scope.isACS;
		}
				
		$state.go("PIT2.OptionalACS3DSTestCases");
	}
	
}])