/**
 * @author vkallada
 */
'use strict';

userEnrollmentMod.controller("UserEnrollmentSuccessCtrl",["$scope","UserEnrollmentService",function($scope,UserEnrollmentService) {
	
	$scope.trackingNumber = UserEnrollmentService.trackingNumber;	
	$scope.successMessage = "Thank you for your interest in registering for the Visa 3-D Secure 2.0 Test Suite Application.\n"+
	"Visa Global Client Testing teams are currently reviewing the request and will be confirming your registration in next 2 business days(US).\n"+
	"For reference, please note tracking # "+$scope.trackingNumber;
		
}]);
