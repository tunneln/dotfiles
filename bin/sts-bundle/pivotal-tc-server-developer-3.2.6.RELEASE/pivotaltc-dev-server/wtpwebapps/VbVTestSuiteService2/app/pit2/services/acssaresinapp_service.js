/**
 * 
 */

"use strict";

acssAResMod.service("ACSSAResServiceInApp",["$http","$rootScope",function($http,$rootScope){
	
	this.getTestCases = function(msgType,isInApp){
		return $http.get($rootScope.contextPath+"/pit2/acss/getACSSTestCases", {
			params : {
				"msgType" : msgType,
				"isInApp" : isInApp
			}
		})
	}
	
	this.submit = function(data){
		return $http.post($rootScope.contextPath+"/pit2/acss/processTestCase",data);
	}
}]);