
'use strict';

var requestCertificateCtrlModulePIT2 = angular.module("RequestCertificateCtrlModulePIT2",[]);

requestCertificateCtrlModulePIT2.controller('RequestCertificateResponseControllerPIT2',["$scope","$rootScope","RequestCertificateServicePIT2", function($scope,$rootScope,RequestCertificateServicePIT2){

	$scope.service = RequestCertificateServicePIT2;

	$scope.succes=$rootScope.success;
	$scope.failur=$rootScope.failure;
	//$scope.emailStatus = $scope.service.data.emailStatusMsg;
	$scope.pemCertificate = $scope.service.data.PemCertificate;
	$scope.pemPKCS = $scope.service.data.PemPKCS;

	//$scope.value= $scope.service.data.errors;


}]);