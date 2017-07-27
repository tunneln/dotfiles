'use strict';

var forgetpwdCtrlMod = angular.module('ChangePwdCntrlMod',[]);

forgetpwdCtrlMod.controller('changePwdController',['$scope','ChangePwdService','$rootScope',
                                                   function($scope,ChangePwdService,$rootScope){

	$scope.chgpwdshow = true;
	$scope.loading1 = false;
	$scope.submitBtn = true;
	$scope.resetBtn = true;

	var tokenval = $rootScope.token;
	if (tokenval != null && tokenval != undefined) {
		var tval = tokenval.split(':');
		$scope.changePwdToken = tokenval;
	} else {
		$scope.changePwdToken = '';
	}

	$scope.submitChangePwd = function() {
		var data = {
			// "username":$scope.username,
			"password" : $scope.password,
			"confirmPwd" : $scope.confirmPwd,
			"changePwdToken" : $scope.changePwdToken,
		}
		var pwd = $scope.password;

		$scope.successmsg = false;
		$scope.failmsg = false;
		$scope.pwderrMsg = false;

		var pwd = $scope.password;
		var cfmpwd = $scope.confirmPwd;
		if (pwd == cfmpwd) {
			$scope.pwderrMsg = false;
			$scope.loading1 = true;
			$scope.submitBtn = false;
			$scope.resetBtn = false;

			ChangePwdService.submitchangePswd(data).then(
				function successCallback(response) {
					$scope.chgpwdshow = false;
					$scope.successmsg = true;
					$scope.failmsg = false;
				}, function errorCallback(res) {
					var errorcode = res.data.errorCode;
					var errormsg = res.data.errorMessage;
					$scope.successmsg = false;
					$scope.failmsg = true;
					$scope.chgpwdshow = true;

					$scope.errorcode = "Error Code: " + errorcode;
					$scope.errormsg = "Details: " + errormsg;
					$scope.loading1 = false;
					$scope.submitBtn = true;
					$scope.resetBtn = true;
				});
		} else {
			$scope.pwderrMsg = true;
			$scope.loading1 = false;
			$scope.submitBtn = true;
			$scope.resetBtn = true;
		}
	}

	$scope.clearData = function() {
		$scope.changepwdForm.$setPristine();
		$scope.successmsg = false;
		$scope.failmsg = false;
		$scope.pwderrMsg = false;
		$scope.loading1 = false;
		$scope.submitBtn = true;
		$scope.resetBtn = true;
	}

}]);

