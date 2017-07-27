/**
 * @author zsathya 
 */

validateCavvMod.controller("VIPResultsCtrl",["$scope", "ValidateCAVVService", function($scope,ValidateCAVVService){
	
	
	console.log("ValidateCAVVService.VIPResponseData :: "+ValidateCAVVService.VIPResponseData);
	$scope.responseData = ValidateCAVVService.VIPResponseData;
	
	console.log("$scope.responseData :: "+$scope.responseData);
	$scope.responseSource = $scope.responseData.ResponseSource;
	console.log("$scope.responseSource :: "+$scope.responseSource);
	$scope.actionCode = $scope.responseData.ActionCode;
	console.log("$scope.actionCode :: "+$scope.actionCode);
	$scope.cavvResultCode = $scope.responseData.CAVVResultCode;
	console.log("$scope.responseData.CAVVResultCode:: "+$scope.responseData.CAVVResultCode);
}]);