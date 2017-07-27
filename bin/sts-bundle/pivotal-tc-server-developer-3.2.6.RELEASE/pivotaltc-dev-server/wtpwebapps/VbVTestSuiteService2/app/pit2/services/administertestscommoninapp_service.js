/*
 * Common Service for all the Administer Test Cases Transactions(MPIVERes, MPIPARes,
 * ACSVEReq, ACSPAReq)
 */

"use strict";

var administerTestsServMod = angular.module("AdministerTestsServInappModule",[]);
administerTestsServMod.service("AdministerTestsServiceInappPIT2",["$http","$rootScope",function($http,$rootScope){

	/* Service method to get the Test Cases */
	this.getTestCases = function(msgType,testCaseType){
		return $http.get($rootScope.contextPath + "/adminTestsPit2InApp/getTestCases", {
			params : {
				"msgType" : msgType,
				"testCaseType" : testCaseType
			}
		})
	}
	/* -------------------End of getTestCases method----------------------- */
	
	this.createNewTestCase = function(data){
		return $http.post($rootScope.contextPath+"/adminTestsPit2InApp/submitTestCaseReq",data);
	}
	/* -------------------End of createNewTestCase method----------------------- */
	this.getUseTemplate = function(){
		return $http.get($rootScope.contextPath + "/adminTestsPit2InApp/getUseTemplate");
	}
}]);