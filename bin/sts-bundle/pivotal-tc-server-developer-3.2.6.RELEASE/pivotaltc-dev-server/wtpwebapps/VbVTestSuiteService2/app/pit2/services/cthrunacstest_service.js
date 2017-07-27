(function(){

	'use strict';
	var cthRunACSTest = function($http,$rootScope){

		/* Method to fetch all testcases*/
		this.getTestCases=function(){
			return $http.get($rootScope.contextPath+"/pit2/cthloadtestcases").then(function(response){
				return response.data;
			});
		}

		/* Method to fetch tc template msg based on selected testcase*/
		this.getAReq = function(identifier){
			return  $http.get($rootScope.contextPath+'/pit2/fetchCTHAreq', {
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
			return $http.post($rootScope.contextPath+'/pit2/runacstest/cthareq',data).success(function(response,status){
				return response;
			})
		}

		this.reviewCReq = function(cReqData){
			return $http.post($rootScope.contextPath+"/pit2/reviewCTHBrowserCReq",cReqData);
		}

		this.processInappCReq = function(cReqData){
			return $http.post($rootScope.contextPath+'/pit2/processCTHInAppCReq',cReqData).success(function(response,status){
				return response;
			})
		}
		
		this.decodeACSHtml = function(data) {
			console.log('acsHtmlEncodedData :: '+data.encodedACSHtml);
//			return $http.post($rootScope.contextPath+"/pit2/decodeACSHtml", data);
			return $http.post($rootScope.contextPath+"/pit2/decodeACSHtmlValue", data);
		}

	}

	cthRunACSTest.$inject = ['$http','$rootScope'];

	angular.module('binApp').service('CTHRunACSTest',cthRunACSTest);

}());