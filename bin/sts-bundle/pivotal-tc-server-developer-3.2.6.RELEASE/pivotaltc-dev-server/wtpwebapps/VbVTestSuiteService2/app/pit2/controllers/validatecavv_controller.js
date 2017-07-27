'use strict';

var validateCavvMod = angular.module('ValidateCavvModule',[]);

validateCavvMod.controller('ValidateCavvCtrl',["$scope","ValidateCAVVService","$rootScope","$window","$state","$sce",function($scope,ValidateCAVVService,$rootScope,$window,$state,$sce){
	$scope.authMethod=[{name:"3DS 2.0 Challenge flow using Static Passcode",code:"01"},{name:"3DS 2.0 Challenge flow using OTP via SMS method",code:"02"},{name:"3DS 2.0 Challenge flow using OTP via Keyfob or cardreader method",code:"03"},{name:"3DS 2.0 Challenge flow using OTP via App method",code:"04"},
	{name:"3DS 2.0 Challenge flow using OTP via any other  method",code:"05"},{name:"3DS 2.0 Challenge flow using KBA method",code:"06"},{name:"3DS 2.0 Challenge flow using OOB with Biometric method",code:"07"},{name:"3DS 2.0 Challenge flow using OOB with App login method",code:"08"},
	{name:"3DS 2.0 Challenge flow using OOB with any other method",code:"09"},{name:"3DS 2.0 Challenge flow using any other authentication method",code:"10"},{name:"3DS 2.0 Attempts Server responding",code:"98"},
	{name:"3DS 2.0 Frictionless flow",code:"99"}];
	
	
	$scope.loading=false;
	$scope.pan="";
	$scope.eci="";
	$scope.xid="";
	$scope.cavv="";
	$scope.expiry="";
	$scope.authMthd = "";
	$scope.isCAVVError = false;

	$scope.submitToVIP = function(){
		var data = {
				"Pan":$scope.pan,
				"ExpiryDate":$scope.expiry,
				"eci":$scope.eci,
				"xid":$scope.xid,
				"Cavv":$scope.cavv,
				"AuthenticationMethod":$scope.authMthd
		}
		$scope.loading=true;
		/* Angular service call to submit the user enrollment data */
		ValidateCAVVService.submitVIPRequest(data).then(function successCallback(response){
			$scope.loading = false;
			/*$rootScope.showErrorAlert = false;
			$rootScope.showSuccessAlert = true;
			$rootScope.successMessage = "VIP Results: responseSource="+data.responseSource+"actionCode="+data.actionCode+"cavvResultCode="+data.cavvResultCode;*/
			ValidateCAVVService.VIPResponseData = response.data;
			$state.go("PIT2.VIPResults");
		},function errorCallback(response){
			$scope.loading=false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			$scope.isCAVVError = true;
			if(response.data.errorMessage != undefined && response.data.errorMessage != null)
				$scope.cavvErrorMessage = response.data.errorMessage;
			else
				$scope.cavvErrorMessage = "Currently V3DSTS is unable to send this request to VCMS.Please contact GCT, gctv3dsts@visa.com.";
			$window.scrollTo(0,0);
		});

	}


	$scope.resetForm = function(){
		$scope.validateCavvForm.$setPristine();
		$scope.pan="";
		$scope.eci="";
		$scope.xid="";
		$scope.cavv="";
		$scope.expiry="";
		$scope.authMthd = "";
	}

	validateCavvMod.filter('htmlvw', ['$sce',function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	}]);
	
	$scope.closeErr = function(){
		$scope.isCAVVError = false;
	}

}])