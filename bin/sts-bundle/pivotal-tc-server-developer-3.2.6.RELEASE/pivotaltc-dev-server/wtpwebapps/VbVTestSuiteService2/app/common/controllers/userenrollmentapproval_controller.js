/**
 * @author vkallada 
 */
var userApprovalMod = angular.module("UserApprovalMod",[]);

userApprovalMod.controller("UserApprovalCtrl",
		["$scope","UserApprovalService","$rootScope","$window","$state",
        function($scope,UserApprovalService,$rootScope,$window,$state){
	
	/*$scope.userToken = $rootScope.token;
	if($scope.userToken != undefined){
		var splitVal = $scope.userToken.split(":");
		$scope.userEmail = splitVal[0];
	}*/
	$scope.showACSDatePicker = function() {
		setTimeout(function(){
			var current_date = $( "#acsdatepicker" ).val();
			//console.log("in ready :: "+current_date);
			$("#acsdatepicker")[tog(current_date)]('x');

			$( "#acsdatepicker" ).datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true,
				minDate: 0
			});

			$( "#acsdatepicker" ).change(function(){
				var get_date = $( "#acsdatepicker" ).val();
				console.log("in change :: "+get_date);
				$("#acsdatepicker")[tog(get_date)]('x');
			});

			function tog(v){
				//console.log("v:: "+v);
				return v?'addClass':'removeClass';} 
			$(document).on('input', '.clearable', function(){
				$(this)[tog(this.value)]('x');
			}).on('mousemove', '.x', function( e ){
				$(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
			}).on('touchstart click', '.onX', function( ev ){
				ev.preventDefault();
				$(this).removeClass('x onX').val('').change();
			});
			
			$("#acsdatepicker").keydown(function(){
				var theEvent = window.event;
				var key = theEvent.keyCode || theEvent.which;
				if (key === 9 || key === 16) { //TAB was pressed
					return;
				}else {
					return false;
				}
			});

		});
	};
	
	$scope.showTDSDatePicker = function() {
		setTimeout(function(){
			var current_date = $( "#threedsdatepicker" ).val();
			//console.log("in ready :: "+current_date);
			$("#threedsdatepicker")[tog(current_date)]('x');

			$( "#threedsdatepicker" ).datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true,
				minDate: 0
			});

			$( "#threedsdatepicker" ).change(function(){
				var get_date = $( "#threedsdatepicker" ).val();
				console.log("in change :: "+get_date);
				$("#threedsdatepicker")[tog(get_date)]('x');
			});

			function tog(v){
				//console.log("v:: "+v);
				return v?'addClass':'removeClass';} 
			$(document).on('input', '.clearable', function(){
				$(this)[tog(this.value)]('x');
			}).on('mousemove', '.x', function( e ){
				$(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
			}).on('touchstart click', '.onX', function( ev ){
				ev.preventDefault();
				$(this).removeClass('x onX').val('').change();
			});
			
			$("#threedsdatepicker").keydown(function(){
				var theEvent = window.event;
				var key = theEvent.keyCode || theEvent.which;
				if (key === 9 || key === 16) { //TAB was pressed
					return;
				}else {
					return false;
				}
			});

		});
	};
	
	$scope.pit2components = [{"id":"ACS","value":"ACS","selected":false},{"id":"3DS Server","value":"MRCH","selected":false}];
	$scope.notes = "";
	$scope.loading = false;
	$scope.isPIT2ACS = false;
	$scope.isMerchant = false;
	$scope.isPageLoading = false;
	$scope.isRejected = false;

	$scope.getCountries = function() {
		UserApprovalService.getCountries().then(function(response){
			$scope.countries = response.data;
			$scope.getUserDetails();
		});
	}

	$scope.getUserDetails = function(){
		console.log("User activation token :: "+$rootScope.token);
		$scope.pit1SelectedComponents = [];
		$scope.selectedVersions = [];
		$scope.pit2SelectedComponents = [];
		$scope.userToken = $rootScope.token;
		$scope.isPageLoading = true;
		UserApprovalService.getEnrolledUserDetails($scope.userToken).then(function successCallback(response){
			$scope.isPageLoading = false;
			var resultData = response.data;
			
			$scope.userEmail = resultData.emailAddr;
			$scope.name = resultData.usrNm;
			$scope.company = resultData.coNm;
			$scope.streetAddress = resultData.str1Addr;
			$scope.city = resultData.cityNm;
			$scope.country = resultData.ctryCd;
			$scope.phone = resultData.phnNum;
			$scope.bin = resultData.bin;
			$scope.merchantRefNum = resultData.mrchRefNum;
			$scope.pit2ACSUrl = resultData.pit2Url;
			$scope.emvCertificate = resultData.emvCertificate;
			$scope.componentID = resultData.componentID;
			$scope.isActive = resultData.actvInd;
			$scope.firstName = resultData.firstName;
			$scope.lastName = resultData.lastName;
			$scope.stateOrTerritory = resultData.stateORTerritory,
			$scope.postalCode = resultData.postalCode;
			$scope.acquirerBin = resultData.acquirerBin;
			$scope.acsReference = resultData.acsReference;
			$scope.merchantId = resultData.mrchId;
			$scope.businessId = resultData.businessId;
			if(!$scope.isActive && resultData.notes != null && resultData.notes != '')
				$scope.isRejected = true;
			$scope.notes = resultData.notes;
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
			});
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
			})
			$scope.showACSDatePicker();
			$scope.showTDSDatePicker();
		}, function errorCallback(errorResponse) {
			$scope.isPageLoading = false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if(errorResonse.data.errorMessage != null && errorResonse.data.errorMessage != "")
				$rootScope.errorMessage = errorResonse.data.errorMessage;
			else
				$rootScope.errorMessage = "Invalid user email";
		});
		
	}
	
	$scope.getCountries();
	$scope.isApprove = false;
	$scope.acsEMVCoValidity = '';
	$scope.threeDSEMVCoValidity = '';
	
	$scope.confirmApproval = function() {
		$scope.isReject = false;
		if(($scope.isPIT2ACS && ($scope.acsEMVCoValidity == undefined || $scope.acsEMVCoValidity == "")) || 
				($scope.isMerchant && ($scope.threeDSEMVCoValidity == undefined || $scope.threeDSEMVCoValidity == ""))){
			$scope.isApprove = true;
			return;
		} else {
			$scope.isApprove = false;
		}
		
		if($window.confirm("Are you sure, you want to approve the enrollment of "+$scope.firstName)) {
			$scope.approveUser();
		}
	}
	
	
	$scope.confirmRejection = function() {
		$scope.isApprove = false;
		if( $scope.notes == undefined || $scope.notes == ""){
			$scope.isReject = true;
			return;
		}else{
			$scope.isReject = false;
		}
		
		if($window.confirm("Are you sure, you want to reject the enrollment of "+$scope.firstName)) {
			$scope.rejectUser();
		}
	}
	
	/**
	 * Method to Approve the user enrollment
	 */
	$scope.approveUser = function(){
		var data = {
				"enrollmentToken" : $rootScope.token,
				"notes":$scope.notes,
				"acsEMVCoValidity" : $scope.acsEMVCoValidity,
				"threeDSEMVCoValidity":$scope.threeDSEMVCoValidity,
				"userFirstName" : $scope.firstName,
				"userEmail" : $scope.userEmail
		}
		$scope.loading = true;
		UserApprovalService.approveUser(data)
				.then(function successCallback(response) {
			$scope.loading = false;
			$rootScope.showSuccessAlert = true;
			$rootScope.showErrorAlert = false;
			$rootScope.successMessage = response.data.successMessage;
			$scope.isActive = true;
			delete $rootScope.token;
			$window.scrollTo(0,0);
		},function errorCallback(errorResponse){
			$scope.loading = false;
			$rootScope.showErrorAlert = true;
			$rootScope.showSuccessAlert = false;
			if(errorResponse.data.errorMessage != null && errorResponse.data.errorMessage != undefined)
				$rootScope.errorMessage = errorResponse.data.errorMessage;
			else
				$rootScope.errorMessage = "Failed to approve user.";
			$window.scrollTo(0,0);
		});
	}
	
	/**
	 * Method to Reject the user enrollment
	 */
	$scope.rejectUser = function(){
		var data = {
				"enrollmentToken" : $rootScope.token,
				"notes":$scope.notes,
				"acsEMVCoValidity" : $scope.acsEMVCoValidity,
				"threeDSEMVCoValidity":$scope.threeDSEMVCoValidity,
				"userFirstName" : $scope.firstName,
				"userEmail" : $scope.userEmail
		}
		$scope.loading = true;
		UserApprovalService.rejectUser(data).then(function successCallback(response){
			$scope.loading = false;
			$rootScope.showErrorAlert = false;
			$rootScope.showSuccessAlert = true;
			$rootScope.successMessage = response.data.successMessage;
			$scope.isRejected = true;
			delete $rootScope.token;
			$window.scrollTo(0,0);
		},function errorCallback(errorResponse){
			$scope.loading = false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if(errorResponse.data.errorMessage != null && errorResponse.data.errorMessage != undefined)
				$rootScope.errorMessage = errorResponse.data.errorMessage;
			else
				$rootScope.errorMessage = "Failed to reject user.";
			$window.scrollTo(0,0);
		});
	}
	
	$scope.cancelApproval = function() {
		if($rootScope.redirectFromVendorLog)
			$state.go('PIT2.vendorLog');
		else
			$state.go('login');
	}
	

	$scope.backtoVendorLogScreen = function() {
	
		$state.go('PIT2.vendorLog');
	}
	
}]);