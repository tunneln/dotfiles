/**
 * @author pvulupal 
 */

"use strict";

//var reviewCResMod = angular.module("ReviewCResModule",[]);

cthModule.controller("CTHRevewCResCtrl",["$scope","CTHCResService","$rootScope","$state","PIT2ReviewService",function($scope,CTHCResService,$rootScope,$state,PIT2ReviewService){

	$scope.service = CTHCResService;
	$scope.submitBtn = true;
	$scope.tcBtn = true;
	$scope.runAcsBtn = true;
	$scope.isPageLoading = false;

	/* Method to get the CRes */
	$scope.getCRes = function(cResTxnId){
		$scope.isPageLoading = true;
		CTHCResService.getCRes(cResTxnId).then(function(response,status){

			$scope.testCase = response.data.testCase;
			$scope.testCaseResults = response.data.testCaseResults;
			$scope.cResMessage = vkbeautify.json(response.data.cResMessage, 2);
			$scope.cmpType = response.data.compType;
			if($scope.cmpType == 'ACS' || $scope.cmpType == 'ACS_REQUIRED'){
				$scope.isACS = true;
			}
			$scope.payerAuthUrl = response.data.payerAuthUrl; 
			var respEl = angular.element( document.querySelector( '#respinfoId' ) );
			respEl.html(response.data.validationRespMsg);
			$scope.allowVIPsubmit=response.data.allowVIPsubmit;
			$scope.transactionID=response.data.transactionId;
			if(response.data.expectedResponse!=null)
				$scope.expectedResponse = vkbeautify.xml(response.data.expectedResponse, 2);
			$scope.errResponseMsg=response.data.errResponseMsg;
			$scope.isPageLoading = false;
		})
	} 

	/*
	 * On controller load calling the getPARes method
	 * @param pa response transaction id 
	 */ 
	$scope.getCRes($rootScope.txnId);


	$scope.jsonFormat= function(){
		var cresmsg=$scope.cResMessage;
		$scope.cResMessage = vkbeautify.json(cresmsg,1);
	}

	$scope.jsonUnformat= function(){
		var cresmsg=$scope.cResMessage;
		$scope.cResMessage = vkbeautify.jsonmin(cresmsg);
	}

	$scope.expjsonFormat= function(){
		var expRespmsg=$scope.expectedResponse;
		$scope.expectedResponse = vkbeautify.json(expRespmsg,1);
	}

	$scope.expjsonUnformat= function(){
		var expRespmsg=$scope.expectedResponse;
		$scope.expectedResponse = vkbeautify.jsonmin(expRespmsg);
	}

	$scope.showAcsScrn=function(){
		$scope.runAcsBtn=false;
		$scope.loading=true;
//		$state.go('PIT2.CTHrunACSTest');
		$state.go('PIT2.RequiredTestCases');
	}

	$scope.tcDetails = function(){
		$scope.submitBtn = false;
		$scope.runAcsBtn = false;
		$scope.tcBtn = false;
		$scope.loading = true;
		var id = $scope.transactionID;
		var component=$scope.cmpType;
		PIT2ReviewService.reviewTestCase(id,component).success(function(response,status,headers){
			PIT2ReviewService.data = response;
			PIT2ReviewService.cthBckBtn = true;
			$scope.loading = true;
			if(component=='ACS' || component=='ACS_REQUIRED'){
				$state.go('PIT2.reviewACS');
			}else{
				PIT2ReviewService.acsBtnForMPI = true;
				$state.go('PIT2.reviewMPI');
			}
		}).error(function(response,status){
			console.log("error blk");
			$scope.loading = true;
			//$state.go('PIT2.CTHrunACSTest');
			$state.go('PIT2.RequiredTestCases');
		})		
	} 

}]);
