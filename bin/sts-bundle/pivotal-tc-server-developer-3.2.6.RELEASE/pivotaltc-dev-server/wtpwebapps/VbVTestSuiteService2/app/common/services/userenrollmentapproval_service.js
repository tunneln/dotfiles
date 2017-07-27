/**
 * @author vkallada 
 */

"use strict";

userApprovalMod.service("UserApprovalService",["$rootScope","$http",function($rootScope,$http){
	
	this.getCountries = function() {
		return $http.get($rootScope.contextPath+"/user/getCountries");
	}
	
	this.getEnrolledUserDetails = function(token){
		console.log('in user approval service get user details :: '+token.length);
		var data = {
				"enrollmentToken" : token  
		}
		return $http.post($rootScope.contextPath+"/user/getUserDetailsForApproval",data);
	}
	
	this.approveUser = function(data){
		return $http.post($rootScope.contextPath+"/user/approveEnrolledUser",data);
	}
	
	this.rejectUser = function(data){
		return $http.post($rootScope.contextPath+"/user/rejectEnrolledUser",data);
	}
	
}]);