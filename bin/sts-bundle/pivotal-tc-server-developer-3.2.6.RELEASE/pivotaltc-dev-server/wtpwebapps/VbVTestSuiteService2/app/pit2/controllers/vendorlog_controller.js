/**
 * 
 */

var vendorLogMod = angular.module('VendorLogMod', []);

vendorLogMod.controller("vendorLogCtrl", ["$scope","$rootScope","$state","$localStorage","VendorLogService","$window","ManageProfileService","UserEnrollmentService","DTOptionsBuilder", function($scope,$rootScope,$state,$localStorage,VendorLogService,$window,ManageProfileService,UserEnrollmentService,DTOptionsBuilder) {

	$scope.complianceDetails = [];
	$scope.isPageLoading = false;
	
	// DataTables configurable options
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false);
	
	/**
	 * Method to fetch the vendor log details.
	 * @author mkaushik
	 */
	$scope.getAllVendorDetails = function() {
		$scope.isPageLoading = true;
		VendorLogService.getVendorLogDetails().then(function successCallback(response) {
			console.log("Get vendor log details success "+response.data.length);
			$scope.complianceDetails = response.data;
			$scope.isPageLoading = false;
		}, function errorCallback(errorRes) {
			console.log("Failed to get the vendor log details.");
			$scope.isPageLoading = false;
		});
		

	}

	// Method to call on page load.
	$scope.getAllVendorDetails();

	$scope.approveVendorCompliance = function(pendingApprovalVendorData) {
		// assuming vendor email id is available at this point.
		// we need to redirect the GCT to the vendor approval page--we
		// will need to pass the vendor email id to the corresponding
		// controller.
		VendorLogService.vendorData = pendingApprovalVendorData;
		$state.go("PIT2.approveDenyCompliance");

	}

	$scope.pit2components = [{"id":"ACS","value":"ACS","selected":false},{"id":"3DS Server","value":"MRCH","selected":false}];
	$scope.vendorDataLoading = false;
	$scope.isPIT2ACS = false;
	$scope.isMerchant = false;
	
	$scope.getCountries = function() {
		UserEnrollmentService.getCountries().then(function successCallback(response){
			$scope.countries = response.data;
		}, function errorCallback(errorRes) {
			console.log("Failed to get the countries list");
		});
	}

	/**
	 * Method to fetch the vendor data when clicked on
	 * tracking id hyper link.
	 * @author vkallada
	 */
	$scope.getVendorData = function(userEmail) {
		$scope.vendorDataLoading = true;
		$scope.getCountries();
		$scope.pit1SelectedComponents = [];
		$scope.pit2SelectedComponents = [];
		$scope.selectedTLSVersions = [];
		$scope.selectedTestsDescs = [];
		$scope.selectedVersions = [];
		console.log("userEmail "+userEmail);
		
		ManageProfileService.getUserData(userEmail).then(function(response){
			console.log("user data response ;: "+response.data.emailAddr);
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
			$scope.vendorDataLoading = false;
		})
	}
	
	$scope.approveVendorReg = function(vendorData) {
		console.log("vendorData.enrollmentUUIDToken :: "+vendorData.enrollmentUUIDToken);
		if(vendorData.enrollmentUUIDToken != null && vendorData.enrollmentUUIDToken != undefined)
			$rootScope.token = vendorData.enrollmentUUIDToken;
		else
			$rootScope.token = "";
		$rootScope.redirectFromVendorLog = true;
		$state.go('approveEnrolledUser');
	}

}]);