/**
 *  @author vkallada
 */

complLetterMod.controller("PreviewComplLetterCtrl", ["$scope", "ComplianceLetterService", "$state", function($scope, ComplianceLetterService, $state) {
	
	$scope.service = ComplianceLetterService;
	$scope.complLetterData = $scope.service.complLetterData;
	$scope.selectedUserObj = $scope.service.selectedUserObj;
	
	$scope.currentDate = $scope.complLetterData.currentDate;
	$scope.visaRefNumber = $scope.complLetterData.visaRefNumber;
	$scope.productName = $scope.complLetterData.productName;
	$scope.productVersion = $scope.complLetterData.productVersion;
	$scope.threeDSecureComplVer = $scope.complLetterData.threeDSecureComplVer;
	
	$scope.generateComplLetter = function() {
		console.log("Generate compliance letter");
		var data = {
				currentDate : $scope.currentDate,
				visaRefNumber : $scope.visaRefNumber,
				productName : $scope.productName,
				productVersion : $scope.productVersion,
				threeDSecureComplVer : $scope.threeDSecureComplVer
		}
		console.log("letter generatoin date : "+data.currentDate);
		console.log("data to generate compl letter : "+data);
	}
	
	$scope.backToComplLetter = function() {
		$state.go("PIT2.GenCompLetter");
	}
	
}]);