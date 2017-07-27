'use strict';

resetPwdMod.service('ResetPasswordService',['$http','$rootScope',function($http,$rootScope){

	this.submitResetPwdReq = function(data) {
		return $http.post($rootScope.contextPath+"/user/forgotpwd",data);
	}

}]);

