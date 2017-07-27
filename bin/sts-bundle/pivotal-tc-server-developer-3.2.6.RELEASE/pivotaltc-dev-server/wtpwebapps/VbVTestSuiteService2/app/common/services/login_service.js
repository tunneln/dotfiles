"use strict";

loginCtrlMod.service("LoginService", ["$http", "$log", "$rootScope", function($http, $log, $rootScope) {
	this.submitLogin = function(loginData){
		return $http.post($rootScope.contextPath+"/user/authenticate",loginData);
	}
	
	//this is for logout
	this.submitLogout = function(data){
		return $http.post($rootScope.contextPath+"/user/logout", data);
	}
	
	
}]);
