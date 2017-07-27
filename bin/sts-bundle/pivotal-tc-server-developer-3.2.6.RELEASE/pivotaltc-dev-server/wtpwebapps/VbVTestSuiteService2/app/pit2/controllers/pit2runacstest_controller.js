/**
 * pvulupal;
 */

'use strict';

runACSTestCtrlMod.controller('PIT2RunACSTestController',['$scope','PIT2RunACSTest','$state','$rootScope',
                                                         function($scope,PIT2RunACSTest,$state,$rootScope){
	$scope.pageLoading = false;
	$scope.submitBtn = true;
	$scope.testCases = [];
	$scope.service = PIT2RunACSTest;
	$scope.panNumber = "";
	$scope.cardExpiryDate = "";
	$rootScope.isMPITesting = false;
	$scope.updateSuccMsg = "";

	$scope.getRequestForm = function() {

		PIT2RunACSTest.getTestCases().then(function(resData) {
			$scope.testCases = resData.Testcaseslist;
			$scope.url = resData.AcsUrl;
			if($rootScope.check == true) {
				$scope.selectedTestCase = $rootScope.tcID;
				$scope.change($scope.selectedTestCase);
				$rootScope.check = false;
			}else {
				if(resData.Testcaseslist != null){
					$scope.selectedTestCase = resData.Testcaseslist[0].tcID;
					$scope.AReq = vkbeautify.json(resData.Testcaseslist[0].templateMsg,2);
				}
			}
			$scope.pageloaded = false;
		});
	}

	/* Calling the Method on page load */
//	$scope.getRequestForm();
	$scope.selectedTCData = {}
	
	$scope.urlChange = function() {
		if($scope.url != undefined){
			var urlSplitVal = $scope.url.split("/");
			if(urlSplitVal.length > 0){
				var urlEndVal = "/"+urlSplitVal[urlSplitVal.length-2]+"/"+urlSplitVal[urlSplitVal.length-1];
				if(urlEndVal != undefined && urlEndVal == "/DS2/authenticate"){
					$rootScope.isMPITesting = true;
				} else {
					$rootScope.isMPITesting = false;
				}
			} else {
				$rootScope.isMPITesting = false;
			}
		} else {
			$rootScope.isMPITesting = false;
		}
	}
	
	/**
	 * @author vkallada
	 * Method to set the test case data selected in test cases page. 
	 */
	$scope.setTestCaseData = function() {
		$scope.pageLoading = true;
		$scope.selectedTCData = $scope.service.selectedTCData;
		$scope.url = $scope.selectedTCData.acsUrl;
		$scope.selectedTCName = $scope.selectedTCData.testcaseName;
		$scope.AReq = $scope.selectedTCData.AReq;
		$scope.selectedTCId = $scope.selectedTCData.testcaseId;
		$scope.pageLoading = false;
		$scope.urlChange();
	}
	
	$scope.setTestCaseData();
	
	/* Method When Test Case is changed or Different form(XML-JSON || JSON-XML) of VEReq is requested */
	$scope.change = function(changedValue) {
		if(changedValue != null) {
			PIT2RunACSTest.getAReq(changedValue).then(function(resData){
				$scope.AReq = vkbeautify.json(resData.data.RequestMessage,2);
				//$scope.AReq = resData.data.RequestMessage;
			});
		}else {
			$scope.AReq = "";
		}
	}

	$scope.submitAReq = function() {
		
		var status = true;
		var url = $scope.url;
		var filtered_url = url.replace(/\<|\>|\"|\#|\'|%|\;|\(|\)|\&|\+|\-/g,""); 

		if(url.length != filtered_url.length) {
			$rootScope.showErrorAlert = true;
			$rootScope.errorMessage = "ACS URL should not contain )(#&><\"'%;+- characters";
			status = false;
		}
		if(status) {
			$scope.submitBtn = false;
			$scope.loading = true;
			PIT2RunACSTest.submitAReq($scope.url,$scope.selectedTCId,
					$scope.AReq).success(function(resData) {
						$scope.service.data = resData;
//						$scope.service.reqTestCase = $scope.selectedTestCase.value;
						$scope.service.reqTestCase = $scope.selectedTCId;
						$state.go('PIT2.runACSTestResPIT2');
					}).error(function(response,status){
						$state.go('PIT2.PIT2runACSTest');
						$scope.loading = false;
						$scope.submitBtn = true;
					})		

		}
	}

	$scope.updateTemplateMessage = function(panNumber,cardExpiryDate) {
		console.log("pan number : "+panNumber);
		console.log("Card expiry date : "+cardExpiryDate);
		$scope.panNumber = panNumber;
		$scope.cardExpiryDate = cardExpiryDate;
		if($scope.AReq != undefined && $scope.AReq != ""){
			$scope.AReqJSONObj = angular.fromJson($scope.AReq);
			if($scope.panNumber != undefined && $scope.panNumber != ""){
				$scope.AReqJSONObj.acctNumber = $scope.panNumber;
			}
			if($scope.cardExpiryDate != undefined && $scope.cardExpiryDate != ""){
				$scope.AReqJSONObj.cardExpiryDate = $scope.cardExpiryDate;
			}
			if(($scope.panNumber != undefined && $scope.panNumber != "") &&  ($scope.cardExpiryDate == undefined || $scope.cardExpiryDate == "")){
				$scope.updateSuccMsg = "Account # value updated successfully";
			}else if(($scope.cardExpiryDate != undefined && $scope.cardExpiryDate != "") && ($scope.panNumber == undefined || $scope.panNumber == "")){
				$scope.updateSuccMsg = "Expiry Date value updated successfully";
			}else if(($scope.panNumber != undefined && $scope.panNumber != "") &&  ($scope.cardExpiryDate != undefined && $scope.cardExpiryDate != "")){
				$scope.updateSuccMsg = "Account # and Expiry Date values updated successfully";
			}else{
				$scope.updateSuccMsg = "";
			}
				
			}
			$scope.AReq = vkbeautify.json(JSON.stringify($scope.AReqJSONObj), 2);
		}
	
	$scope.jsonFormat = function() {
		var aReqmsg = $scope.AReq;
		$scope.AReq = vkbeautify.json(aReqmsg,2);
	}

	$scope.jsonUnformat = function() {
		var aReqmsg = $scope.AReq;
		$scope.AReq = vkbeautify.jsonmin(aReqmsg);
	}
	
	$scope.backToTestCaseSelection = function() {
		$scope.onlyACS=$scope.service.onlyACS;
		if($scope.onlyACS==true)
			{
			$state.go("PIT2.OptionalTestCases");
			}
		else
			{
		$state.go("PIT2.OptionalACS3DSTestCases");
			}
	}

}]);
