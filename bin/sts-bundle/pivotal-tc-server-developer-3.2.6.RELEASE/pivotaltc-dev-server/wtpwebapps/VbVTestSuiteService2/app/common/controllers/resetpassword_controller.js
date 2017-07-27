'use strict';

resetPwdMod.controller('ResetPasswordCtrl', [
		'$scope',
		'ResetPasswordService',
		'$rootScope',
		function($scope, ResetPasswordService, $rootScope) {

	$scope.showMail = true;
	$scope.showSuccesResp = false;
	$scope.showErrorResp = false;
	$scope.username = '';
	$scope.loading1 = false;
	$scope.submitBtn = true;
	$scope.cancelBtn = true;
	
	$scope.submitResetPassword = function(){
		$rootScope.shwerrmsg=false;
		$scope.submitBtn=false;
		$scope.cancelBtn=false;
		$scope.loading1=true;
		var data = {
				"username":angular.lowercase($scope.username)
		}
		ResetPasswordService.submitResetPwdReq(data).then(function successCallback(response){
			$scope.loading1=false;
				$scope.showMail=false;
				$scope.showSuccesResp=true;
				$scope.showErrorResp=false;
				$rootScope.shwerrmsg=true;
		},function errorCallback(res){
				var errorcode=res.data.errorCode;
				var errormsg=res.data.errorMessage;
				$scope.showMail=true;
				$scope.showSuccesResp=false;
				$scope.showErrorResp=true;
				$scope.loading1=false;
				$scope.submitBtn=true;
				$scope.cancelBtn=true;
				//$scope.errorcode="Error Code: "+errorcode;
				$scope.errormsg=errormsg;
				$rootScope.shwerrmsg=true;
			});
		
	} // End of method
	
	$scope.resetData=function(){
		$scope.showErrorResp=false;
		$scope.username="";
		 $scope.password="";
		$scope.showSuccesResp=false;
		$rootScope.showErrorAlert = false;
		$scope.showMail=true;
		$scope.loading1=false;
		$scope.submitBtn=true;
		$scope.cancelBtn=true;
	}
	
}])