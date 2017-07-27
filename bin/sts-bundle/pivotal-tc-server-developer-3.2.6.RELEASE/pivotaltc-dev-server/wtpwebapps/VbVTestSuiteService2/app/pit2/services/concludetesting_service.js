/**
 * @author vkallada
 * Conclude Testing Service
 */
'use strict';

concludeTestingMod.service("ConcludeTestingService", ["$http", "$rootScope", function($http, $rootScope) {
	

	/**
	 * @author vkallada
	 * Method to fetch the vendor conclude testing details
	 * @param data (Holds input data userEmail)
	 */
	this.getComplianceStatus = function(data) {
		console.log("the input data :: "+data);
		return $http.post($rootScope.contextPath
				+ "/pit2/complianceTestingRequest", data);
	}
	
	/**
	 * @author vkallada
	 * Method to make a Restful Service call to submit the vendors compliance
	 * letter request to the GCT Admin
	 * @param reqData
	 */
	this.submitComplLetterReq = function(reqData) {
		return $http.post($rootScope.contextPath
				+ "/pit2/requestComplianceLetter", reqData);
	}
		
}]);
