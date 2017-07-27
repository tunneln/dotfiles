/*
 *	@author vkallada 
 */

'use strict';

var manageProfileMod = angular.module("ManageProfileModule",[]);
manageProfileMod.controller("ManageProfileCtrl",["$scope","$rootScope","ManageProfileService","$state","UserEnrollmentService","$window",function($scope,$rootScope,ManageProfileService,$state,UserEnrollmentService,$window){
	$rootScope.isManageProfile = true;
	$scope.loading=false;
	/*$scope.countries = UserEnrollmentService.getCountries();
	$scope.components = UserEnrollmentService.getComponents();
	$scope.pit2components = UserEnrollmentService.getPit2Components();*/ 
	$scope.components = [{"id":"ACS","value":"ACS","selected":false},{"id":"Merchant","value":"MRCH","selected":false}];
	$scope.pit2components = [{"id":"ACS","value":"ACS","selected":false},{"id":"3DS Server","value":"MRCH","selected":false}];
	$scope.versions = [/*{"id":"PIT1","value":"PIT 1.0.2","selected":false},*/{"id":"PIT2","value":"3DS 2.0","selected":false}];
	$scope.tlsVersions = [ /*{
		"id" : "TLS10",
		"value" : "TLS 1.0",
		"selected" : false
	}, {
		"id" : "TLS11",
		"value" : "TLS 1.1",
		"selected" : false
	},*/ {
		"id" : "TLS12",
		"value" : "TLS 1.2",
		"selected" : false
	} ];
	/*$scope.tests = [ {"id":"INTEGTST","value":"Integration Tests",selected:false},
	                 {"id":"COMPLTST","value":"Compliance Tests",selected:true},
	                 {"id":"CAVVTST","value":"CAVV Validation Tests",selected:false},
	                 {"id":"VCMSTST","value":"VCMS Tests",selected:false}
	                 ];*/
	$scope.admin = false;
	$scope.emvCertificate = "";
	
	/*
	 * Method to get the list of countries from the back end
	 */
	$scope.getCountries = function(){
		UserEnrollmentService.getCountries().then(function(response){
			if(response.statusText == "OK"){
				$scope.countries = response.data;
			}else{
				
			}
		})
	}
	/* -----------------End of getCountries method--------------------- */
	
	/*
	 * On controller load calling the getCountries method 
	 * to get the list of the countries.
	 */
	$scope.getCountries();
	
	/* Method to get the LoggedIn user details to update */
	$scope.manageProfile = function(){
		$scope.pit1SelectedComponents = [];
		$scope.pit2SelectedComponents = [];
		$scope.selectedTLSVersions = [];
		$scope.selectedTestsDescs = [];
		$scope.selectedVersions = [];
		var userEmail = $rootScope.loggedInUser;
		ManageProfileService.getUserData(userEmail).then(function(response){
			var resultData = response.data;
			$scope.email = resultData.emailAddr;
			$scope.password = resultData.password;
			$scope.confirmPassword = resultData.confirmPassword;
			$scope.name = resultData.usrNm;
			$scope.company = resultData.coNm;
			$scope.streetAddress = resultData.str1Addr;
			$scope.city = resultData.cityNm;
			$scope.country = resultData.ctryCd;
			$scope.phone = resultData.phnNum;
			$scope.bin = resultData.bin;
			$scope.acsVerificationEnrollUrl = resultData.acsUrl;
//			$scope.merchantIdOld = resultData.mrchId;
			$scope.merchantId = resultData.mrchId;
			$scope.merchantPwd = resultData.merchPassword;
			$scope.merchantConfirmPwd = resultData.mrchConfirmPassword;
			$scope.batchSubmission = resultData.allowPAResBatchSbum;
			$scope.allowVIP = resultData.allowSubmVIP;
			$scope.allowVCMS = resultData.allowSubmVCMS;
			$scope.merchantRefNum = resultData.mrchRefNum;
			$scope.pit2ACSUrl = resultData.pit2Url;
//			$scope.emvCertificate = resultData.emvCertificate;
			$scope.mrchPswdEncrptdVal = resultData.mrchPswdEncrptdVal;
			$scope.firstName = resultData.firstName;
			$scope.lastName = resultData.lastName;
			$scope.stateOrTerritory = resultData.stateORTerritory,
			$scope.postalCode = resultData.postalCode;
			$scope.acquirerBin = resultData.acquirerBin;
			$scope.acsReference = resultData.acsReference;
			angular.forEach(resultData.userRoles,function(role){
				if(role != "ADMIN"){
					var roleval=role.split('_');
					if($scope.selectedVersions != null && $scope.selectedVersions.length > 0){
						if($scope.selectedVersions.indexOf(roleval[0]) == -1)
							$scope.selectedVersions.push(roleval[0]);
					}else{$scope.selectedVersions.push(roleval[0]);}
					if(roleval[0]=="PIT1"){
						$scope.pit1SelectedComponents.push(roleval[1]);
					}else if(roleval[0]=="PIT2"){
						$scope.pit2SelectedComponents.push(roleval[1]);
					}
				}else{
					$scope.admin = true;
				}
			})
			angular.forEach($scope.versions,function(value){ // Loop to keep the versions checked
				if($scope.selectedVersions.indexOf(value.id) != -1){
					if(value.id == "PIT1"){
						$scope.isPIT1 = true;
						value.selected = true;
					}else if(value.id == "PIT2"){
						$scope.PIT2Selected = true;
						value.selected = true;
					}else{
						value.selected = false;
					}
				}
			})
			/*angular.forEach($scope.components,function(component){ // Loop to keep the components checked
				if($scope.pit1SelectedComponents.indexOf(component.value) != -1){
					if(component.value == COMPONENTS.ACS){
						$scope.isACS = true;
						component.selected = true;
					}else if(component.value == COMPONENTS.MRCH){
						$scope.isMPI = true;
						component.selected = true;
					}else{
						component.selected = false;
					}
				}
			})*/
			
			angular.forEach($scope.pit2components,function(component){ // Loop to keep the components checked
				if($scope.pit2SelectedComponents.indexOf(component.value) != -1){
					if(component.value == COMPONENTS.ACS){
						$scope.isPIT2ACS = true;
						component.selected = true;
					}else if(component.value == COMPONENTS.MRCH){
						$scope.isMerchant = true;
						component.selected = true;
					}else{
						component.selected = false;
					}
				}
			});
			
			angular.forEach($scope.tlsVersions, function(tlsVer){
				if(resultData.tlsVersions.indexOf(tlsVer.id) != -1){
					tlsVer.selected = true;
				}
			});
			$scope.selectedTLSVersions = resultData.tlsVersions;
			/*angular.forEach($scope.tests, function(testDesc){
				if(resultData.testsDescriptions.indexOf(testDesc.id) != -1){
					testDesc.selected = true;
				}
			});
			$scope.selectedTestsDescs = resultData.testsDescriptions;*/
			$scope.pit2Url = resultData.pit2Url;
//			$scope.componentID = resultData.componentID;
			$scope.visaComplLetterId = resultData.visaComplLetterId;
			$scope.businessId = resultData.businessId;
		})
	}
	/* -----------------End of manageProfile method--------------------- */
	
	/* On controller load calling the method to get the loggedIn user details */
	$scope.manageProfile();
	
	/* method to reset the PIT2 components data */
	$scope.resetPIT2Data = function(){
		$scope.PIT2Selected = false;
		$scope.isMerchant = false;
		$scope.isPIT2ACS = false;
		$scope.pit2ACSUrl = '';
		$scope.acsReference = '';
		$scope.merchantRefNum = '';
		$scope.pit2SelectedComponents = [];
		angular.forEach($scope.pit2components,function(pit2Component){
			pit2Component.selected = false;
		});
	}
	/* -----------------End of resetPIT2Data method--------------------- */
	
	$scope.pit2ComponentSelect = function(component){
		var index = undefined;
		if($scope.pit2SelectedComponents.length > 0){
			angular.forEach($scope.pit2SelectedComponents,function(value){
				if(value == component)
					index = $scope.pit2SelectedComponents.indexOf(component);
			})
			
			if(index != undefined){
				$scope.pit2SelectedComponents.splice(index,1);
				if(component == COMPONENTS.ACS){
					$scope.isPIT2ACS = false;
					$scope.pit2ACSUrl = '';
					$scope.acsReference = '';
				}else if(component == COMPONENTS.MRCH){
					$scope.isMerchant = false;
					$scope.merchantRefNum = '';
					$scope.merchantId = '';
				}
				angular.forEach($scope.pit2components,function(pit2Component){
					if(pit2Component.value == component)
						pit2Component.selected = false;
				})
			}else{
				$scope.pit2SelectedComponents.push(component);
				if(component == COMPONENTS.ACS)
					$scope.isPIT2ACS = true;
				else if(component == COMPONENTS.MRCH)
					$scope.isMerchant = true;
			}
		}else{
			$scope.pit2SelectedComponents.push(component);
			if(component == COMPONENTS.ACS)
				$scope.isPIT2ACS = true;
			else if(component == COMPONENTS.MRCH)
				$scope.isMerchant = true;
		}
	}
	/* -----------------End of componentSelect method--------------------- */
	
	$scope.tlsVerSelect = function(selectedVerId){
		if ($scope.selectedTLSVersions.length > 0) {
			var index = $scope.selectedTLSVersions.indexOf(selectedVerId);
			if (index != -1) $scope.selectedTLSVersions.splice(index, 1);
			else $scope.selectedTLSVersions.push(selectedVerId);
		} else {
			$scope.selectedTLSVersions.push(selectedVerId);
		}
		angular.forEach($scope.tlsVersions, function(verObj) {
			if (verObj.id == selectedVerId) {
				verObj.selected = !verObj.selected;
			}
		});
	}
	
	$scope.testsDescSelect = function(selectedTestId){
		if ($scope.selectedTestsDescs.length > 0) {
			var index = $scope.selectedTestsDescs.indexOf(selectedTestId);
			if (index != -1) $scope.selectedTestsDescs.splice(index, 1);
			else $scope.selectedTestsDescs.push(selectedTestId);
		} else {
			$scope.selectedTestsDescs.push(selectedTestId);
		}
		angular.forEach($scope.tests, function(testObj) {
			if (testObj.id == selectedTestId) {
				testObj.selected = !testObj.selected;
			}
		});
	}
	
	/* Method to update the modified user details */
	$scope.updateUserData = function(){
		console.log("$scope.selectedTestsDescs :: "+$scope.selectedTestsDescs);
		console.log("selectedTLSVersions :: "+$scope.selectedTLSVersions);
		$scope.selectedVersions = [];
		if($scope.password != undefined && $scope.confirmPassword != undefined){ 
			if($scope.password !== $scope.confirmPassword){
				$rootScope.showSuccessAlert = false;
				$rootScope.showErrorAlert = true;
				$rootScope.errorMessage = "Password and confirm password are not matching";
				$window.scrollTo(0,0);
				return;
			}
		}
		
		$scope.userRoles = [];
		var breakForLoop = false;
		$scope.selectedVersions.push("PIT2");
		if($scope.selectedVersions.length > 0){
			angular.forEach($scope.selectedVersions,function(version){
				if(!breakForLoop){
					if(version == "PIT1"){
						if($scope.pit1SelectedComponents != undefined && $scope.pit1SelectedComponents.length > 0){
							$scope.versionComponents = $scope.pit1SelectedComponents;
						}else{
							$rootScope.showSuccessAlert = false;
							$rootScope.showErrorAlert = true;
							$rootScope.errorMessage = "Components (must specify at least one)";
							$window.scrollTo(0,0);
							breakForLoop = true;
						}
					} else if(version == "PIT2"){
						if($scope.pit2SelectedComponents != undefined && $scope.pit2SelectedComponents.length > 0){
							$scope.versionComponents = $scope.pit2SelectedComponents;
						}else{
							$rootScope.showSuccessAlert = false;
							$rootScope.showErrorAlert = true;
							$rootScope.errorMessage = "Components (must specify at least one)";
							$window.scrollTo(0,0);
							breakForLoop = true;
						}
					}
					angular.forEach($scope.versionComponents,function(componentType){
						$scope.userRoles.push(version+"_"+componentType);
					})
				}
			})
			if(breakForLoop) return;
			if($rootScope.isAdmin) $scope.userRoles.push("ADMIN");
			if($rootScope.isRegnAdmin) $scope.userRoles.push("REGN_ADMIN");
		}else{
			$rootScope.showErrorAlert = true;
			$rootScope.errorMessage = "PIT Version(s) (must specify at least one)";
			$window.scrollTo(0,0);
			return;
		}
		var updatedData = {
				"firstName":$scope.firstName,
				"lastName":$scope.lastName,
				"emailAddr" : $scope.email,
				"password" : $scope.password,
				"confirmPassword" : $scope.confirmPassword,
				"coNm" : $scope.company,
				"str1Addr" : $scope.streetAddress,
				"cityNm" : $scope.city,
				"stateORTerritory":$scope.stateOrTerritory,
				"ctryCd" : $scope.country,
				"postalCode":$scope.postalCode,
				"phnNum" : $scope.phone,
				"bin" : $scope.bin,
				"acquirerBin":$scope.acquirerBin,
				"allowPAResBatchSbum" : $scope.batchSubmission,
				"allowSubmVIP" : $scope.allowVIP,
				"allowSubmVCMS" : $scope.allowVCMS,
				"pit2Url": $scope.pit2ACSUrl,
				"acsReference": angular.uppercase($scope.acsReference),
				"mrchRefNum": angular.uppercase($scope.merchantRefNum),
				"userRoles":$scope.userRoles,
//				"emvCertificate":$scope.emvCertificate,
//				"componentID":$scope.componentID,
				"visaComplLetterId":$scope.visaComplLetterId,
				"tlsVersions":$scope.selectedTLSVersions,
				"mrchId":$scope.merchantId,
				"currentPswd":$scope.currentPswd,
				"businessId" : $scope.businessId
//				"testsDescriptions":$scope.selectedTestsDescs
			}
		$scope.loading=true;
		ManageProfileService.updateUser(updatedData).then(function successCallback(response){
			$scope.loading=false;
			
				//$rootScope.logout();
				$rootScope.showErrorAlert = false;
				$rootScope.showSuccessAlert = true;
				$rootScope.successMessage = "Account updated. If you have made any changes, they will be reflected the next time you login. ";
				$window.scrollTo(0,0);
			
		},function errorCallback(response) {
			$scope.loading=false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if(response.data.errorMessage != null)
				$rootScope.errorMessage = response.data.errorMessage;
			else
				$rootScope.errorMessage = "Failed to Update the Data"; 
			$window.scrollTo(0,0);

		})
	}
	/* -----------------End of updateUserData method--------------------- */
	
	/*
	 * To reset the manage profile form
	 */
	$scope.resetForm = function(){
		if($window.confirm("Are you sure you would like to leave the manage profile screen? Any changes will not be saved.")) {
			$state.go("PIT2.welcome");
		}
	}
	
	$scope.countCheckedComponent=function(){
		var count = 0;
		angular.forEach($scope.pit2components,function(value){
			if(value.selected) count++;
		});
		//console.log("count"+count);
		return count;
	}
	$scope.countCheckedVersion=function(){
		var count = 0;
		angular.forEach($scope.versions,function(value){
			if(value.selected) count++;
		});
		return count;
	}
	
}]);
