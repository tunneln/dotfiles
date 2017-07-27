/**
 *	@author zsathya
 */
"use strict";
var complLetterLinkMod = angular.module("ComplianceLetterLinkModule", []);
complLetterLinkMod.controller("ComplianceLetterCtrl", ["$scope", "ComplianceLetterService","$localStorage", "$state","$rootScope","$sce"/*,"$window"*/, function($scope, ComplianceLetterService,$localStorage, $state,$rootScope,$sce/*,$window*/){
	$scope.showpageLoadMsg = "please request  for Compliance letter";
	$scope.unRegMsg = "Compliance letter unavailable as it has not been requested. Please click on conclude testing link to complete the process.";
	var userData = $localStorage.userData;
	$scope.usrName = $rootScope.userData.username;
	$scope.usrTypCd = $rootScope.userData.usrTypCd;
	$scope.logUsr = $rootScope.loggedInUser;
	$scope.isPageloading = true;
	$scope.unRegUsr = false;
	$scope.ntAsingUsr = false;
	$scope.pendUsr = false;
	$scope.denyUsr = false;
	$scope.appUsr = false;
	$scope.submitComplLetterReq = function() {
		var data = {
				"UserName" : $scope.usrName,
					}
		ComplianceLetterService.getComplianceStatus(data).then(function successCallback(response) {
			$scope.complDetails = response.data;
			$scope.isPageloading = false;
			if($scope.complDetails.length == 0){
				$scope.unRegUsr = true;
			}
			else if($scope.complDetails.length > 1){
				$scope.vendor = 'ACS and 3DSS Vendor';
				
				if($scope.complDetails[0].ProductType == 'ACS'){
					if($scope.complDetails[0].ComplianceStatus == 'NA'){
						$scope.ntAsingUsr = true;
						$scope.cmpStus = 'please request for Compliance letter.';
					}else if($scope.complDetails[0].ComplianceStatus == 'Pending Approval'){
						$scope.pendUsr = true;
						$scope.cmpStus = 'Your Compliance letter approval is pending at GCT Admin.';
					}else if($scope.complDetails[0].ComplianceStatus == 'Denied'){
						$scope.denyUsr = true;
						$scope.cmpStus = 'Compliance letter is Denied. Please contact GCT Admin.';
					}
					else if($scope.complDetails[0].ComplianceStatus == 'Approved'){
						$scope.appUsr = true;
					}
				}else{
					if($scope.complDetails[0].ComplianceStatus == 'NA'){
						$scope.ntAsingUsr = true;
						$scope.cmpStus = 'please request for Compliance letter.';
					}else if($scope.complDetails[0].ComplianceStatus == 'Pending Approval'){
						$scope.pendUsr = true;
						$scope.cmpStus = 'Your Compliance letter approval is pending at GCT Admin.';
					}else if($scope.complDetails[0].ComplianceStatus == 'Denied'){
						$scope.denyUsr = true;
						$scope.cmpStus = 'Compliance letter is Denied. Please contact GCT Admin.';
					}
					else if($scope.complDetails[0].ComplianceStatus == 'Approved'){
						$scope.appUsr = true;
					}
				}
			}else if($scope.complDetails[0].ProductType == 'ACS'){
				$scope.vendor = 'ACS Vendor';
				
				if($scope.complDetails[0].ComplianceStatus == 'NA'){
					$scope.ntAsingUsr = true;
					$scope.cmpStus = 'please request for Compliance letter.';
				}else if($scope.complDetails[0].ComplianceStatus == 'Pending Approval'){
					$scope.pendUsr = true;
					$scope.cmpStus = 'Your Compliance letter approval is pending at GCT Admin.';
				}else if($scope.complDetails[0].ComplianceStatus == 'Denied'){
					$scope.denyUsr = true;
					$scope.cmpStus = 'Compliance letter is Denied. Please contact GCT Admin.';
				}
				else if($scope.complDetails[0].ComplianceStatus == 'Approved'){
					$scope.appUsr = true;
				}
			}else{
				$scope.vendor = '3DSS Vendor';
				
				if($scope.complDetails[0].ComplianceStatus == 'NA'){
					$scope.ntAsingUsr = true;
					$scope.cmpStus = 'please request for Compliance letter.';
				}else if($scope.complDetails[0].ComplianceStatus == 'Pending Approval'){
					$scope.pendUsr = true;
					$scope.cmpStus = 'Your Compliance letter approval is pending at GCT Admin.';
				}else if($scope.complDetails[0].ComplianceStatus == 'Denied'){
					$scope.denyUsr = true;
					$scope.cmpStus = 'Compliance letter is Denied. Please contact GCT Admin.';
				}
				else if($scope.complDetails[0].ComplianceStatus == 'Approved'){
					$scope.appUsr = true;
				}
			
			}
		}, function errorCallback(errorRes) {
			
		});
		
	}
	
	$scope.submitComplLetterReq();
	$scope.openPdf = function(usrId,cmpType){
		ComplianceLetterService.getPdf(usrId,cmpType).then(function successCallback(response){
			 //$scope.content = response.data;
			 $scope.file = new Blob([response.data], {type: 'application/pdf'});
			 	saveAs($scope.file);
		       //$scope.fileURL = URL.createObjectURL($scope.file);
		      // $scope.content = $sce.trustAsResourceUrl(fileURL);
		      // $scope.content = $window.navigator.msSaveOrOpenBlob(file);
		     /*$scope.content = *//*window.open($sce.trustAsResourceUrl($scope.fileURL));*/
		},function errorCallback(errorRes){
			
		})		
		
	}
	
	complLetterLinkMod.filter('htmlvw', ['$sce',function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	}]);
}]);