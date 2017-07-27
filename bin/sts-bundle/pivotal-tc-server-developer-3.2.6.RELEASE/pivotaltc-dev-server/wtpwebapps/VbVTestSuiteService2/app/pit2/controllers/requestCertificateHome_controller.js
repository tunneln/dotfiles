'use strict';

var requestCertificateModHome = angular.module('RequestCertificateHomeMod',[]);
requestCertificateModHome.controller('RequestCertificateControllerHome',["$scope","$state","$window","$rootScope","RequestCertificateServiceHomePIT2",function($scope,$state,$window,$rootScope,RequestCertificateServiceHomePIT2){
	
	$scope.admin = $rootScope.isAdmin;
	$scope.regAdmin = $rootScope.isRegnAdmin;
	$scope.showAllReqCerLinks = false;
	$scope.acsLinks = false;
	$scope.threeDSLinks = false;
	$rootScope.pbACSSign = false;
	RequestCertificateServiceHomePIT2.isAcsSign = false;
	if($scope.admin || $scope.regAdmin || $rootScope.userPit2ComponentType.length > 1){
		$scope.showAllReqCerLinks = true;
	}
	if($rootScope.userPit2ComponentType == 'ACS'){
		$scope.acsLinks = true;
	}else if($rootScope.userPit2ComponentType == 'MRCH'){
		$scope.threeDSLinks = true;
	}
	
	$scope.requestCertificate = function(signVal){
		if(signVal != undefined && signVal != null){
			RequestCertificateServiceHomePIT2.isAcsSign = true;
		}
		$state.go('PIT2.requestCertificate');
	}
}]);