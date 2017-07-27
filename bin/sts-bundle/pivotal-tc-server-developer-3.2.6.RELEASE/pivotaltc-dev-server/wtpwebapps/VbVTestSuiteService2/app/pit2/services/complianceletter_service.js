/**
 * @author vkallada 
 */

complLetterMod.service("ComplianceLetterService", ["$http", "$rootScope",function($http, $rootScope) {
	
	var selectedUserObj = {};
	var complLetterData = {};
	this.getComplianceStatus = function(data) {
		return $http.post($rootScope.contextPath
				+ "/pit2/getUserComplianceLetterDetails", data);
	}
	this.getPdf = function(usrId,cmpType){
		var config = {
				params : {
					'usrId' : usrId,
					'cmpType' : cmpType
				},
				responseType: 'arraybuffer' 
		};
		return $http.get($rootScope.contextPath+'/pit2/getPdf',config);
}}]);