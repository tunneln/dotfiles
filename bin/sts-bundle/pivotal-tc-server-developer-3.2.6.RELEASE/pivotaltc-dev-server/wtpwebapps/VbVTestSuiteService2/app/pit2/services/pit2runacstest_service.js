(function(){

	'use strict';
	var pit2runACSTest = function($http,$rootScope){
		
		var selectedTCData = {};
		
		/* Method to fetch all testcases*/
		this.getTestCases=function(){
			return $http.get($rootScope.contextPath+"/pit2/loadtestcases").then(function(response){
				return response.data;
			});
		}
		
		/* Method to fetch tc template msg based on selected testcase*/
		this.getAReq = function(identifier){
			return  $http.get($rootScope.contextPath+'/pit2/fetchAreq', {
				params : {
					'testcaseId' : identifier
				}
			}).then(function(response) {
				return response;
			});
		};
		
		/* Method to submit AReq*/
		this.submitAReq = function(url,testCase,AReqMessage){
			var data = {
				 	"AcsUrl": url,
				 	"RequestMessage": AReqMessage,
				 	"SelectedTestCase":testCase
				 }
			return $http.post($rootScope.contextPath+'/pit2/runacstest/areq',data).success(function(response,status){
				return response;
			})
		}
		
		this.reviewCReq = function(cReqData){
			return $http.post($rootScope.contextPath+"/pit2/reviewBrowserCReq",cReqData);
		}
		
		this.processInappCReq = function(cReqData){
			return $http.post($rootScope.contextPath+'/pit2/processInAppCReq',cReqData).success(function(response,status){
				return response;
			})
		}
		
		this.decodeACSHtml = function(data) {
			console.log('acsHtmlEncodedData :: '+data.encodedACSHtml);
//			return $http.post($rootScope.contextPath+"/pit2/decodeACSHtml", data);
			return $http.post($rootScope.contextPath+"/pit2/decodeACSHtmlValue", data);
		}

	}
	
	pit2runACSTest.$inject = ['$http','$rootScope'];

	angular.module('binApp').service('PIT2RunACSTest',pit2runACSTest);
	
}());