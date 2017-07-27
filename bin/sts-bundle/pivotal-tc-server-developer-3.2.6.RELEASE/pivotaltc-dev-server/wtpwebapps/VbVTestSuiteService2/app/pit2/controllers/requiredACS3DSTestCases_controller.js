 
 'use strict';
 
 cthModule.controller('RequiredACS3DSTestCasesCtrl',['$scope','CTHRunACSTest','$window','$state','$rootScope',
     function($scope,CTHRunACSTest,$window,$state,$rootScope){
	 
	 $scope.isPageloading = false;
		$scope.testCases = [];
		$scope.testCaseData = {};
		$scope.selectedTestCaseObj = {};
		$scope.noTestCases = false;
		$scope.service=CTHRunACSTest;
		
		/**
		 * @author vkallada
		 * Method to load all the test cases on page load.
		 */
		$scope.getTestCases = function() {

			$scope.acsTestcases=$scope.service.acsTestcases;
			$scope.threeDStestCases=$scope.service.threeDStestCases
			$scope.isPageLoading = true;
			$scope.isACS=$scope.service.isACS;
			$scope.is3DS=$scope.service.is3DS;
			$scope.url = $scope.service.acsUrl;
		}
		
		/* Calling the Method on page load */
		$scope.getTestCases();
		
		/**
		 * Method to show the selected test case data in the integration ACS Test page.
		 */
		$scope.testCaseSelected = function(selectedTCObj) {
			console.log("selected Test case : "+selectedTCObj);
			if(selectedTCObj != null && selectedTCObj != undefined) {
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
				});
			}else{
				$scope.AReq ="";
			}
		}
		
		$scope.back = function(){
			$state.go("PIT2.RequiredTestCases");
		}
	 
	 
 }]);