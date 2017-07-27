 
 'use strict';
 
 runACSTestCtrlMod.controller('OptionalACS3DSTestCasesCtrl',['$scope','PIT2RunACSTest','$window','$state','$rootScope',
     function($scope,PIT2RunACSTest,$window,$state,$rootScope){
	 
	 $scope.isPageloading = false;
		$scope.testCases = [];
		$scope.testCaseData = {};
		$scope.selectedTestCaseObj = {};
		$scope.noTestCases = false;
		$scope.service=PIT2RunACSTest;
		
		/**
		 * @author vkallada
		 * Method to load all the test cases on page load.
		 */
		$scope.getTestCases2 = function() {

			$scope.acsTestcases=$scope.service.acsTestcases;
			$scope.threeDSTestCases=$scope.service.threeDSTestCases
			$scope.isPageLoading = true;
			$scope.isACS=$scope.service.isACS;
			$scope.is3DS=$scope.service.is3DS;
			$scope.url = $scope.service.acsUrl;
		}
		
		/* Calling the Method on page load */
		$scope.getTestCases2();
		
		/**
		 * Method to show the selected test case data in the integration ACS Test page.
		 */
		$scope.testCaseSelected = function(selectedTCObj) {
			console.log("selected Test case : "+selectedTCObj);
			if(selectedTCObj != null && selectedTCObj != undefined) {
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
				});
			}else{
				$scope.AReq ="";
			}
		}
		
		$scope.back = function(){
			$state.go("PIT2.OptionalTestCases");
		}
	 
	 
 }]);