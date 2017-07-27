'use strict';

userEnrollmentMod.factory('UserEnrollmentService',['$http','$rootScope',function($http,$rootScope){
	
	var countriesList = [];
	var trackingNumber = "";
	
	var pit2Components = [{"id":"ACS","value":"ACS","selected":false},{"id":"3DS Server","value":"MRCH","selected":false}];
	var tlsVersions = [ /*{
		"id" : "TLS10",
		"value" : "TLS 1.0",
		"selected" : false
	}, {
		"id" : "TLS11",
		"value" : "TLS 1.1",
		"selected" : false
	}, */{
		"id" : "TLS12",
		"value" : "TLS 1.2",
		"selected" : false
	} ];
	
	var versions = [/*{"id":"PIT1","value":"PIT 1.0.2","selected":false},*/{"id":"PIT2","value":"3DS 2.0","selected":false}];
	
	return {
		getCountries : function(){
			return $http.get($rootScope.contextPath+"/user/getCountries");
		},
		getComponents : function(){
			return components;
		},
		getPit2Components : function(){
			return pit2Components;
		},
		getVersions : function(){
			return versions;
		},
		getTLSVersions : function(){
			return tlsVersions;
		},
		submitUserEnrollment : function(userData){
			return $http.post($rootScope.contextPath+"/user/enrollUser",userData);
		}
	};
}]);
