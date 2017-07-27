/**
 *	@author vkallada 
 */
'use strict';

var cthModule = angular.module('CTHModule',[]);

cthModule.controller("RequiredTestCasesCtrl", ["$scope","$rootScope","CTHRunACSTest","$state", function($scope,$rootScope,CTHRunACSTest,$state) {
	
	$scope.isPageloading = false;
	$scope.acsTestcases = [];
	$scope.testCaseData = {};
	$scope.selectedTestCaseObj = {};
	$scope.noTestCases = false;
	
	/**
	 * @author vkallada
	 * Method to load all the test cases on page load.
	 */
	$scope.getTestCases = function() {

		CTHRunACSTest.getTestCases().then(function successCallback(resData){
			if(resData.Testcaseslist != null && resData.Testcaseslist.length > 0){
				$scope.acsTestcases = resData.Testcaseslist;
				$scope.threeDStestCases=resData.ThreeDSTestcaseslist;
				CTHRunACSTest.acsTestcases=$scope.acsTestcases;
				CTHRunACSTest.threeDStestCases=$scope.threeDStestCases;
				for(var i=0 ;i<$scope.acsTestcases.length;i++){
					var val = $scope.acsTestcases[i].tcName.lastIndexOf('-');
					var testId = $scope.acsTestcases[i].tcName.substring(0,val);
					var testName = $scope.acsTestcases[i].tcName.substring(val+1,$scope.acsTestcases[i].tcName.length).replace("-","");
					$scope.acsTestcases[i].tcName = testName.trim();
					$scope.acsTestcases[i].tcSerNum = testId.trim();
					
				}
				for(var i=0 ;i<$scope.threeDStestCases.length;i++){
					var valMpi = $scope.threeDStestCases[i].tcName.lastIndexOf('-');
					var testIdMpi = $scope.threeDStestCases[i].tcName.substring(0,valMpi);
					var testNameMpi = $scope.threeDStestCases[i].tcName.substring(valMpi+1,$scope.threeDStestCases[i].tcName.length).replace("-","")
					$scope.threeDStestCases[i].tcName = testNameMpi.trim();
					$scope.threeDStestCases[i].tcSerNum = testIdMpi.trim();
					
				}
			} else {
				$scope.noTestCases = true;
			}
			$scope.url = resData.AcsUrl;
			if($rootScope.check == true)  {
				console.log("Test case id of not tested :: "+$rootScope.tcID);
				var indexOfSelectedTC = $scope.acsTestcases.map(function(e) { return e.tcID; }).indexOf($rootScope.tcID);
				console.log("indexOfSelectedTC :: "+indexOfSelectedTC);
				$scope.selectedTestCaseObj = $scope.acsTestcases[indexOfSelectedTC];
				console.log("$scope.selectedTestCaseObj :: "+$scope.selectedTestCaseObj);
//				$scope.change($scope.selectedTestCase);
				$rootScope.check = false;
				$scope.testCaseSelected($scope.selectedTestCaseObj);
			}
			$scope.isPageloading = false;
		}, function errorCallback(errorResponse){
			$scope.isPageloading = false;
			$scope.noTestCases = true;
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
		$scope.onlyACS = true;
		CTHRunACSTest.onlyACS = $scope.onlyACS;
		if(selectedTCObj != null && selectedTCObj != undefined) {
			$scope.isPageloading = true;
			CTHRunACSTest.getAReq(selectedTCObj.tcID).then(function(resData){
				$scope.AReq = vkbeautify.json(resData.data.RequestMessage,2);
				$scope.testCaseData = {
					"acsUrl" : $scope.url,
					"testcaseName" : selectedTCObj.tcName,
					"AReq" : $scope.AReq,
					"testcaseId" : selectedTCObj.tcID 
				}
				CTHRunACSTest.selectedTCData = $scope.testCaseData;
				$state.go("PIT2.CTHrunACSTest");
				$scope.isPageloading = false;
			});
		}else{
			$scope.AReq ="";
		}
	}
	
	$scope.getTestCases1 = function(userRole) {
		$scope.isACS = false;
		$scope.is3DS = false;
		$scope.onlyACS = false;
		CTHRunACSTest.onlyACS = $scope.onlyACS;
		CTHRunACSTest.acsUrl=$scope.url;
		if ("ACS" == userRole) {
			$scope.isACS = true;
			$scope.is3DS = false;
			CTHRunACSTest.isACS = $scope.isACS;
			CTHRunACSTest.is3DS = $scope.is3DS;
		} else {
			$scope.is3DS = true;
			$scope.isACS = false;
			CTHRunACSTest.is3DS = $scope.is3DS;
			CTHRunACSTest.isACS = $scope.isACS;
		}
				
		$state.go("PIT2.RequiredACS3DSTestCases");

	}
	
}])