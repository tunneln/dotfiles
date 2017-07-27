/**
 * @author vkallada 
 */

/*
 * Common Service for all the Administer Test Cases Transactions(MPIVERes, MPIPARes,
 * ACSVEReq, ACSPAReq)
 */

"use strict";

var administerTestsServMod = angular.module("AdministerTestsServModule",[]);
administerTestsServMod.service("AdministerTestsService",["$http","$rootScope",function($http,$rootScope){
	
	/* Service method to get the Test Cases */
	this.getTestCases = function(componentType,msgType,testCaseType){
		return $http.get($rootScope.contextPath + "/adminTestsPit2/getTestCases", {
			params : {
				"compType" : componentType,
				"msgType" : msgType,
				"testCaseType" : testCaseType
			}
		})
	}
	/* -------------------End of getTestCases method----------------------- */
	
	/* Method to send the test case data to the service to save */
	this.createNewTestCase = function(data){
		return $http.post($rootScope.contextPath+"/adminTestsPit2/submitTestCaseReq",data);
	}
	/* -------------------End of createNewTestCase method----------------------- */
	
}]);