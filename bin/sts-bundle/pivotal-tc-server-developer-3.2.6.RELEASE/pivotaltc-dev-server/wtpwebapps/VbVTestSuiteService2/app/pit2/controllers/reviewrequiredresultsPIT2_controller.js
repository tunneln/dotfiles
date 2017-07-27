'use strict';

var reviewReqTestResultsPIT2Mod = angular.module('ReviewReqTestResultsPIT2Mod',[]);


reviewReqTestResultsPIT2Mod.controller('ReviewTestResultsPIT2Controller',['$scope','ReviewReqTestDataPIT2','PIT2ReviewService','$rootScope','$state',
                                                                          function($scope,ReviewReqTestDataPIT2,PIT2ReviewService,$rootScope,$state){

	$scope.selectedComponent = "ACS";
	$scope.isAdmin = $rootScope.isAdmin;
	$scope.isRegnAdmin = $rootScope.isRegnAdmin;
	$scope.title = "ACS Testing Status";
	$scope.disableCmpnt = false;
	$scope.showgrid = false;
	$scope.errormsg = false;
	$scope.components = [];
	$scope.testTypes = [];
	$scope.selectedTestType = "REQUIRED";
	

		if ($scope.isAdmin == false
			&& $scope.isRegnAdmin == false) {
			$scope.tester = $rootScope.loggedInUser;
		}

	if($rootScope.userPit2ComponentType.length==1 && !$scope.isRegnAdmin){
		if($rootScope.userAccess==ROLE_PIT2_ACS){
			$scope.components=[{name:"ACS",code:"ACS"}];
			$scope.selectedComponent="ACS";
			$scope.title="ACS Required Testing Status";
		}
		if($rootScope.userAccess==ROLE_PIT2_MRCH){
			$scope.selectedComponent="MPI";
			$scope.components=[{name:"3DS Server",code:"MPI"}];
			$scope.title="3DS Server Required Testing Status";
		}
	}else{
		$scope.components=[{name:"ACS",code:"ACS"},{name:"3DS Server",code:"MPI"}];
	}
	
	$scope.testTypes=[{name:"Required",code:"REQUIRED"},{name:"Optional",code:"OPTIONAL"},{name:"All",code:"BOTH"}];

	//Initialization for Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 10;
	$scope.data = [];

	$scope.datalgth = 0;
	var userRegion = "";

	$scope.getFormData = function() {
		if ($scope.isAdmin == false
				&& $scope.isRegnAdmin == false) {
			$scope.showgrid = true;
			$scope.loading = true;
			var component = $scope.selectedComponent;
			var testType = $scope.selectedTestType;
			var data = {
				'testerName' : angular.lowercase($scope.tester),
				'componentType': component,
				'testType' : testType
			}
			
			ReviewReqTestDataPIT2.getReviewReqTestResutls(data).then(function(resData){
				$scope.pagedTests = resData.reviewReqTestlist;
				$scope.datalgth = $scope.pagedTests.length;
				$scope.loading = false;
			},function errorCallback(resData) {
				$scope.loading = false;
				$scope.pagedTests = [];
				$scope.datalgth = 0;
			});
		}
	}

	if(PIT2ReviewService.isReturn){
		PIT2ReviewService.isReturn = false;
		$scope.tester = PIT2ReviewService.email;
		$scope.selectedComponent = PIT2ReviewService.componentType;
		$scope.selectedTestType = PIT2ReviewService.testType;
		$scope.pagedTests = PIT2ReviewService.previousSearchResults;
		$scope.datalgth = $scope.pagedTests.length;
		$scope.showgrid = true;
		$scope.currentPage = PIT2ReviewService.currentPage; 
		if($scope.selectedComponent == "ACS"){ 
			$scope.title="ACS Testing Status";
			if($scope.selectedTestType == "REQUIRED"){
				$scope.title="ACS Required Testing Status";
			}
			if($scope.selectedTestType == "OPTIONAL"){
				$scope.title="ACS Optional Testing Status";
			}
		}else if($scope.selectedComponent == "MPI"){
			$scope.title="3DS Server Testing Status";
			if($scope.selectedTestType == "REQUIRED"){
				$scope.title="3DS Server Required Testing Status";
			}
			if($scope.selectedTestType == "OPTIONAL"){
				$scope.title="3DS Server Optional Testing Status";
			}
		}
	}else{
		$scope.getFormData();
	}

	$scope.fetchData = function() {
		$rootScope.showErrorAlert = false;
		$scope.currentPage = 0;
		var component = $scope.selectedComponent;
		var testType = $scope.selectedTestType;
		var data = {
			'testerName' : angular.lowercase($scope.tester),
			'componentType': component,
			'testType' : testType
		}
		
		$scope.loading = true;

		ReviewReqTestDataPIT2.getReviewReqTestResutls(data).then(function(resData){
			if(resData.reviewReqTestlist != null && resData.reviewReqTestlist.length > 0){
				$scope.pagedTests = resData.reviewReqTestlist;
				$scope.datalgth = $scope.pagedTests.length;
				$scope.loading = false;
				$scope.showgrid = true;
			}else{
				$scope.loading = false;
				$scope.pagedTests = '';
				$scope.datalgth = 0;
				$scope.errormsg = true;
			}
		}, function errorCallback(resData) {
			$rootScope.showErrorAlert = true;
			$scope.loading = false;
			$scope.pagedTests = '';
			$scope.datalgth = 0;
		});

		if(component == "ACS"){
			if(testType == "REQUIRED") {
				$scope.title = "ACS Required Testing Status";
			} else if(testType == "OPTIONAL") {
				$scope.title = "ACS Optional Testing Status";
			} else {
				$scope.title = "ACS Testing Status";
			}
		}
		if(component == "MPI"){
			if(testType == "REQUIRED") {
				$scope.title = "3DS Server Required Testing Status";
			} else if(testType == "OPTIONAL") {
				$scope.title = "3DS Server Optional Testing Status";
			} else {
				$scope.title = "3DS Server Testing Status";
			}
		}
	}

	//Pagination logic
	$scope.numberOfPages = function() {
		return Math.ceil($scope.datalgth/$scope.pageSize);                
	}

	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	};

	$scope.nextPage = function () {
		if ($scope.currentPage <  $scope.numberOfPages()) {
			$scope.currentPage++;
		}
	};

	$scope.setPage = function () {
		$scope.currentPage = this.n;
	};

	$scope.tcDetails = function(id) {
		var component = $scope.selectedComponent;
		PIT2ReviewService.reviewTestCase(id,component).success(function(response,status,headers){
			PIT2ReviewService.data = response;

			if(component == 'ACS'){
				$state.go('PIT2.reviewACS');
			}else{
				$state.go('PIT2.reviewMPI');
			}
			PIT2ReviewService.backActionState = "PIT2.PIT2reviewRequiredResults";
			PIT2ReviewService.previousSearchResults = $scope.pagedTests;
			PIT2ReviewService.email = $scope.tester;
			PIT2ReviewService.componentType = $scope.selectedComponent;
			PIT2ReviewService.currentPage = $scope.currentPage;
			PIT2ReviewService.testType = $scope.selectedTestType;
			PIT2ReviewService.backBtn = false;
		}).error(function(response,status){
			$state.go('PIT2.PIT2reviewRequiredResults');
		})		
	} 

	$scope.runacsDetails = function(tcid,component,requiredInd,msgType){
		$rootScope.tcID = tcid;
		$rootScope.check = true;
		if (component == 'ACS' && requiredInd=="Y") {
			if(msgType == 'VIPReq'){
				$state.go('PIT2.ValidateCAVV');
			}else{
				$state.go('PIT2.RequiredTestCases');
			}
		}
		if (component == 'ACS' && requiredInd=="N") {
			$state.go('PIT2.OptionalTestCases');
		}
	}

}]);

reviewReqTestResultsPIT2Mod.filter('startFrom', function() {
	return function(input, start) {
		if (!input || !input.length) { return; }
		start = +start; 
		return input.slice(start);
	}
});

reviewReqTestResultsPIT2Mod.filter('htmlvw',['$sce',function($sce){
	return function(val) {
		return $sce.trustAsHtml(val);
	};
}]);
