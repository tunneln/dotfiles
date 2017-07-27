
'use strict';

var requestCertificateModPIT2 = angular.module('RequestCertificateModPIT2',[]);

requestCertificateModPIT2.controller('RequestCertificateControllerPIT2', ["$scope","$rootScope","$state","RequestCertificateServicePIT2", "$window","RequestCertificateServiceHomePIT2", function($scope,$rootScope,$state,RequestCertificateServicePIT2,$window,RequestCertificateServiceHomePIT2){

	$scope.service = RequestCertificateServicePIT2;
	$scope.loading = false;
	$scope.email=$rootScope.loggedInUser;
	$scope.showTitle = RequestCertificateServiceHomePIT2.isAcsSign;
	if(RequestCertificateServiceHomePIT2.isAcsSign){
		$scope.certificate = "ECSigning";
	}else{
		$scope.certificate = "RSACertificate";
	}
	$scope.certificates = [
	                       {
	                    	   "name" : "RSA Certificate",
	                    	   "value" : "RSACertificate"
	                       }/*,
	                       {
	                    	   "name" : "EC Certificate",
	                    	   "value" : "ECCertificate"
	                       }*/];
	$scope.signCertificates = [
	                     /*  {
	                    	   "name" : "RSA Signing",
	                    	   "value" : "RSASigning"
	                       },*/
	                       {
	                    	   "name" : "EC Signing",
	                    	   "value" : "ECSigning"
	                       }];

	$scope.save = function(){
		console.log("$scope.certificate"+$scope.certificate);
		$rootScope.errorMessage = '';
		var pointer=true;
		var data= {
				"certType" : $scope.certificate,
				"email" : $scope.email,
				"requestCertFile" : $scope.fileData,
				"csr" : $scope.certRequest
		}

		if ($scope.email == undefined
				|| $scope.certificate == undefined
				|| $scope.fileData == undefined
				&& ($scope.certRequest == undefined || $scope.certRequest=="")) {
			pointer=false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			$rootScope.errorMessage= "Please fill the mandatory fields properly";
			$window.scrollTo(0,0);
		} else if ($scope.fileData != undefined
				&& ($scope.certRequest != undefined) && $scope.certRequest!='') {
			pointer = false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			$rootScope.errorMessage = "Please choose a file or paste certificate request in text area box";
			$window.scrollTo(0,0);
		}
		if(pointer){
			$scope.loading = true;
			RequestCertificateServicePIT2.save(data).then(function successCallback(response){
				$scope.service.data = response.data;
				if (response.data.EmailSent == true) {
					$rootScope.success = "Your certificate successfully sent to your registered email.For more details please contact the V3DSTS administrator. ";
				} else {
					$rootScope.failure= "An error occurred attempting to send your certificate to email.Please contact the V3DSTS administrator. ";
				}
				$state.go('PIT2.requestCertificateRes');

			}, function errorCallback(response,status){
				$scope.loading = false;

				$state.go('PIT2.requestCertificate');
				$rootScope.showSuccessAlert = false;
				$rootScope.showErrorAlert = true;
				$window.scrollTo(0,0);
			})
		};
	}

	$scope.resetForm = function(showTitle){
		$rootScope.showSuccessAlert = false;
		$rootScope.showErrorAlert = false;
		if(showTitle){
			$scope.certificate = "ECSigning";
		}else{
			$scope.certificate = "RSACertificate";
		}
		$scope.email = $rootScope.loggedInUser;
		$scope.fileData = undefined;
		angular.element("input[type='file']").val(null);
		$scope.certRequest = undefined;
		//$scope.requestCertificateForm.$setPristine();
	}
	$scope.back = function(){
		RequestCertificateServiceHomePIT2.isAcsSign = false;
		$state.go('PIT2.requestCertificateHome');
	}
}]);
