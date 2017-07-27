/*
 * @author vpulupal
 */
"use strict";

reviewCResMod.service('CResService',['$http','$rootScope',function($http,$rootScope){

	/* Method to Get the CResponse from the service */
	this.getCRes = function(cResTxnId){
		return $http.get($rootScope.contextPath+"/pit2/getBrowserCRes",{
			params : {
				'transactionId':cResTxnId
			}});
	} // End of getCRes method.

	this.submitToVip = function(paResTxnId) {
		return $http.post($rootScope.contextPath+"/pit2/viptest?txnSummaryId="+paResTxnId,{
			params: {
				'txnSummaryId':paResTxnId
			}
		}).success(function(response,status){
			return response;
		});
	}

}]);