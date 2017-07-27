/**
 * @author vkallada.
 */

'use strict';

var loginCtrlMod = angular.module('LoginCtrlMod',[]);
loginCtrlMod.controller('LoginController',['$scope','LoginService','$rootScope','$location','$log','$window','$state','$localStorage',
                                           function($scope,LoginService,$rootScope,$location,$log,$window,$state,$localStorage){
	
	$rootScope.authenticated = false;
	$scope.loading=false;
	/* Method to submit the login form */
	$scope.submitLogin = function(){
		var data = {
				"username":angular.lowercase($scope.username),
				"password":$scope.password
		}
		$scope.loading=true;
		LoginService.submitLogin(data)
		.then(function successCallback(response){
			
				$localStorage.userData = response.data;
				$rootScope.userData = $localStorage.userData
				
				$rootScope.onlyMPI=false;
				
				$rootScope.loggedInUser = $rootScope.userData.username;
				$rootScope.authToken = $rootScope.userData.token;
				$rootScope.userType = $rootScope.userData.usrTypCd;
				$rootScope.userAccess = [];
				$rootScope.userAuthorities = [];
				$rootScope.userPit1ComponentType = [];
				$rootScope.userPit2ComponentType = [];
				$rootScope.isAdmin=$rootScope.userData.admin;
				$rootScope.isRegnAdmin=$rootScope.userData.regnAdmin;
				$rootScope.allowPaResbatch=$rootScope.userData.allowPaResbatch;
				$rootScope.allowVIPsubmit=$rootScope.userData.allowVIPsubmit;
				$rootScope.allowVCMSsubmit=$rootScope.userData.allowVCMSsubmit;
				if($rootScope.isAdmin || $rootScope.isRegnAdmin){
					$rootScope.userAccess.push(ROLE_PIT1_ACS);
					$rootScope.userAccess.push(ROLE_PIT1_MRCH);
					$rootScope.userAccess.push(ROLE_PIT2_ACS);
					$rootScope.userAccess.push(ROLE_PIT2_MRCH);
				}else{
					$rootScope.userAccess = $rootScope.userData.userAuthorities;
				}
				
				if($rootScope.userAccess.length > 0){
					angular.forEach($rootScope.userAccess,function(version){
						if(version == ROLE_PIT1_ACS || version == ROLE_PIT1_MRCH){
							if($rootScope.userAuthorities.length > 0){
								if($rootScope.userAuthorities.indexOf("PIT1") == -1){
									$rootScope.userAuthorities.push("PIT1");
								}
							}else{
								$rootScope.userAuthorities.push("PIT1");
							}
							if(version == ROLE_PIT1_ACS){
								$rootScope.userPit1ComponentType.push("ACS");
							}
							if(version == ROLE_PIT1_MRCH){
								$rootScope.userPit1ComponentType.push("MRCH");
							}
						}else if(version == ROLE_PIT2_ACS || version == ROLE_PIT2_MRCH){
							if($rootScope.userAuthorities.length > 0){
								if($rootScope.userAuthorities.indexOf("PIT2") == -1){
									$rootScope.userAuthorities.push("PIT2");
								}
							}else{
								$rootScope.userAuthorities.push("PIT2");
							}
							if(version == ROLE_PIT2_ACS){
								$rootScope.userPit2ComponentType.push("ACS");
							}
							if(version == ROLE_PIT2_MRCH){
								$rootScope.userPit2ComponentType.push("MRCH");
							}
						}
						
					})
					if($rootScope.userPit2ComponentType.length==1 && $rootScope.userPit2ComponentType[0]=="MRCH"){
						$rootScope.onlyMPI=true;
					}else{
						$rootScope.onlyMPI=false;
					}
					
				}else{
					$location.path("/noAccess");
				}
				if($rootScope.userAuthorities.length > 1){
					$location.path('/pit/2.0');
				}else{
					if($rootScope.userAuthorities.length == 1){
						if($rootScope.userAuthorities.indexOf("PIT1") != -1){
							$location.path('/pit/1.0.2');
						}else{
							$location.path('/pit/2.0')
						}
					}
				}
				$scope.loading=false;
				$rootScope.authenticated = true;
		},function errorCallback(response){
			$scope.username = angular.lowercase($scope.username);
			$scope.loading = false;
			$location.path('/pit/login');
		});
	} 
	/* ---------------------End of submitLogin Method--------------------- */

	$scope.alertMessage= function() {
		if($window.confirm("I will agree that I will utilize V3DSTS Results for its own "+
			"internal purpose and not with a view to disseminating publicity "+
			"its test results." +"\n"+
			"CONFIDENTIALITY:All of the information "+
			"furnished herein and by the V3DSTS are confidential to VISA and "+
			"shall not be shared nor distributed by anyone without VISA "+
			"consent")) {
			$scope.submitLogin();
		} else {
			$state.go('login');
		}
			
	}
	
//	
//	$rootScope.logout= function() {
//		var username = $localStorage.userData.username;
////		console.log("username="+username);
//		LoginService.submitLogout(username)
//		.then(function successCallback(response){
//			$rootScope.clearCacheData();
//			$location.path('/pit/login');
//		},function errorCallback(response){
//			$rootScope.clearCacheData();
//			$location.path('/pit/login');
//		});
//	}
//	
	
	/*
	 * To reset login form
	 */
	$scope.clearData=function(){
		$scope.loginForm.$setPristine(); //$setPristine() Sets the form to its pristine(Initial) state.
        $scope.username="";
        $scope.password="";
		$rootScope.showErrorAlert=false;
        $rootScope.showSuccessAlert=false;
	}
}]);
