/**
 * 
 * Service for Validate CAVV Screen
 */

"use strict";

validateCavvMod.service("ValidateCAVVService",["$http","$rootScope",function($http,$rootScope){
	var VIPResponseData={};
	/* Service Method to get the CAVV results from VIP */
	this.submitVIPRequest = function(data){
		return $http.post($rootScope.contextPath+"/pit2/submitVIPReq",data);
	}
	
}]);