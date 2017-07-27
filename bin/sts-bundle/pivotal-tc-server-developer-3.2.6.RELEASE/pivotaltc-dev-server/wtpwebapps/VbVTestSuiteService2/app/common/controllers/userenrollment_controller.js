/**
 * @author vkallada 
 * */

'use strict';

userEnrollmentMod.controller('UserEnrollmentCtrl',['$scope','UserEnrollmentService','$rootScope',"$window","$state",function($scope,UserEnrollmentService,$rootScope,$window,$state){
	
	$rootScope.isManageProfile = false;

	/*
	 * Method to get the list of countries from the cache end
	 */
	$scope.getCountries = function(){
		UserEnrollmentService.getCountries().then(function(response){
			if(response.statusText == "OK"){
				$scope.countries = response.data;
				$scope.country = "840";
			}else{
				
			}
		})
	}
	/* -----------------End of getCountries method--------------------- */
	
	/* Method to Add/Remove the selected version into the selectedVersions List */
	$scope.versionSelect = function(version){
		var index = undefined;
		if($scope.selectedVersions.length > 0){
			angular.forEach($scope.selectedVersions,function(value){ // Loop to check if selected value already exists 
				if(value == version)
					index = $scope.selectedVersions.indexOf(version);
			})
			if(index != undefined){
				$scope.selectedVersions.splice(index,1);
				if(version == "PIT2") {// Condition when 'PIT2' version is Deselected, then disabling the pit2Url input
					$scope.resetPIT2Data();
				}else{
					$scope.resetPIT1Data();
				}
			}else{
				$scope.selectedVersions.push(version);
				if(version == "PIT2") // Condition when selected version is 'PIT2' then enabling the pit2Url input
					$scope.PIT2Selected = true;
				else
					$scope.isPIT1 = true;
			}
		}else{ // Else to add the version into the list when length is '0'
			$scope.selectedVersions.push(version);
			if(version == "PIT2")
				$scope.PIT2Selected = true;
			else
				$scope.isPIT1 = true;
		}
	}
	/* -----------------End of versionSelect method--------------------- */
	
	/* method to reset the PIT1 components data */
	$scope.resetPIT1Data = function(){
		$scope.isPIT1 = false;
		$scope.isACS = false;
		$scope.isMPI = false;
//		$scope.merchantId = '';
		$scope.merchantPwd = ''; 
		$scope.merchantConfirmPwd = '';
		$scope.acsVerificationEnrollUrl = "";
		$scope.selectedComponents = [];
		angular.forEach($scope.components,function(pit1Component){
			pit1Component.selected = false;
		})
	}
	/* -----------------End of resetPIT1Data method--------------------- */
	
	/* method to reset the PIT2 components data */
	$scope.resetPIT2Data = function(){
		$scope.PIT2Selected = false;
		$scope.isMerchant = false;
		$scope.isPIT2ACS = false;
		$scope.pit2ACSUrl = '';
		$scope.acsReference = '';
		$scope.merchantId = '';
		$scope.merchantRefNum = '';
		$scope.pit2SelectedComponents = [];
		angular.forEach($scope.pit2Components,function(pit2Component){
			pit2Component.selected = false;
		});
	}
	/* -----------------End of resetPIT2Data method--------------------- */
	
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
		console.log("$scope.selectedTLSVersions.length "+$scope.selectedTLSVersions.length);
		return $scope.selectedTLSVersions.length;
	}
	
	/*$scope.testsDescSelect = function(selectedTestId){
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
	}*/
	
	$scope.isMerchant = false;
	$scope.isPIT2ACS = false;
	$scope.pit2ComponentSelect = function(component){
		
		var index;
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
	
	/* Method to submit the User Enrollment Form */
	$scope.submitUserEnrollment = function(){
		$scope.selectedVersions=[];
		if($scope.termsNCond === undefined)
			$scope.termsNCond = false;
		
		if($scope.termsNCond == false){
			$window.alert("Please accept terms and conditions");
			return;
		}
				
		$scope.userRoles = [];
		var breakForLoop = false;
		$scope.selectedVersions.push("PIT2");
		angular.forEach($scope.selectedVersions,function(version){
			if(!breakForLoop){
				if(version == "PIT1"){
					if($scope.selectedComponents != undefined && $scope.selectedComponents.length > 0){
						$scope.versionComponents = $scope.selectedComponents;
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
		var userData = {
			"firstName":$scope.firstName,
			"lastName":$scope.lastName,
			"emailAddr" : angular.lowercase($scope.email),
			"password" : $scope.password,
			"confirmPassword" : $scope.confirmPassword,
			"coNm" : $scope.company,
			"str1Addr" : $scope.streetAddress,
			"cityNm" : $scope.city,
			"stateORTerritory":$scope.stateOrTerritory,
			"ctryCd" : $scope.country,
			"postalCode":$scope.postalCode,
			"phnNum" : $scope.phone,
			"mrchId" : $scope.merchantId,
			"bin" : $scope.bin,
			"acquirerBin":$scope.acquirerBin,
			"usrTypCd" : $scope.usrTypCd,
			"tvtscUsrTstApplns" : $scope.selectedVersions,
			"pit2Url": $scope.pit2ACSUrl,
			"acsReference":angular.uppercase($scope.acsReference),
			"actvInd":false,
			"mrchRefNum": angular.uppercase($scope.merchantRefNum),
			"userRoles":$scope.userRoles,
//			"emvCertificate":$scope.emvCertificate,
//			"componentID":$scope.componentID,
			"visaComplLetterId":$scope.visaComplLetterId,
			"tlsVersions":$scope.selectedTLSVersions,
			"acptdTermsInd":$scope.termsNCond,
			"businessId" : $scope.businessId
		}
		$scope.loading=true;
		/* Angular service call to submit the user enrollment data */
		UserEnrollmentService.submitUserEnrollment(userData).then(function successCallback(response){
			$scope.loading = false;
			UserEnrollmentService.trackingNumber = response.data.trackingNumber;
			$state.go("userEnrollmentSuccess");
			/*$scope.email = angular.lowercase($scope.email);
			$window.scrollTo(0,0);*/
		},function errorCallback(response){
			$scope.loading=false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if(response.data.errorMessage != undefined && response.data.errorMessage != null)
				$rootScope.errorMessage = response.data.errorMessage;
			else
				$rootScope.errorMessage = "Failed to Enroll the user.";
			$window.scrollTo(0,0);
		});
	}
	/*--------------------End of submitUserEnrollment method----------------------*/
	
	/* Method to Reset the User Enrollment Form */
	$scope.resetForm = function(){
		$scope.pit2components = UserEnrollmentService.getPit2Components(); 
		$scope.versions = UserEnrollmentService.getVersions();
		$scope.tlsVersions = UserEnrollmentService.getTLSVersions();
		$scope.pit2SelectedComponents = [];
		$scope.isPIT1 = false;
		$scope.PIT2Selected = false;
		$scope.isACS = false;
		$scope.isMPI = false;
		$scope.isMerchant = false;
		$scope.isPIT2ACS = false;
		$scope.termsNCond = false;
		$scope.pit2ACSUrl = "";
		$scope.acsReference = "";
		$scope.merchantRefNum = "";
		$scope.merchantId = "";
		$rootScope.showErrorAlert = false;
		$rootScope.showSuccessAlert = false;
		$scope.selectedTLSVersions = [];
		angular.forEach($scope.tlsVersions, function(verObj) {
			verObj.selected = false;
		});
		/*
		 * On controller load calling the getCountries method 
		 * to get the list of the countries.
		 */
		$scope.getCountries();
	}
	/*---------------------End of enrollment form reset---------------------------*/
	
	$scope.resetForm();
	
	$scope.countCheckedComponent = function(){
		var count = 0;
		angular.forEach($scope.pit2components,function(value){
			if(value.selected) count++;
		});
		return count;
	}
	
	$scope.countCheckedVersion = function(){
		var count = 0;
		angular.forEach($scope.versions,function(value){
			if(value.selected) count++;
		});
		return count;
	}
	
}]);
