/**
 * 
 */
'use strict';

vendorLogMod.service("VendorLogService", ["$http", "$rootScope", function($http, $rootScope) {
	
	this.getVendorLogDetails = function() {
		return $http.get($rootScope.contextPath+"/pit2/getVendorLogDetails");
	}
	
	this.getVendorDataForComplReqApproval = function(data) {
		return $http.post($rootScope.contextPath+"/pit2/getVendorDataForComplReqApproval",data);
	}
	
	/**
	 * Method to approve the vendor compliance letter request
	 * @author vkallada
	 * @param vendorData
	 */
	this.approveVendorComplLetterReq = function(vendorData) {
		return $http.post($rootScope.contextPath+"/pit2/approveComplianceLetter", vendorData)
	}
	
	this.denyVendorComplLetterReq = function(vendorData) {
		return $http.post($rootScope.contextPath+"/pit2/denyComplianceLetter", vendorData)
	}
	
}]);
