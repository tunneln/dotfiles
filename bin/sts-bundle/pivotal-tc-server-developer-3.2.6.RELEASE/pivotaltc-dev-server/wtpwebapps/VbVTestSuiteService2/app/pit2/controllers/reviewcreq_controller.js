/**
 *	@author pvulupal 
 */
var reviewCReqMod = angular.module("ReviewCReqModule",[]);
reviewCReqMod.controller("ReviewCReqController",["$scope","PIT2RunACSTest","CReqService","$localStorage",function($scope,PIT2RunACSTest,CReqService,$localStorage){
	
	$scope.service = PIT2RunACSTest;
	$scope.compressedCReq = $scope.service.CReqCompressedData.CompressedCReq;
	$scope.notificationUrl = $scope.service.CReqCompressedData.TermUrl;
	$scope.threeDSSessionData = $scope.service.CReqCompressedData.Md;
	$scope.creqAcsUrl = $scope.service.CReqCompressedData.CreqACSURL;
	$scope.submitBtn = true;

	/**
	 * Method commented by vkallada.
	 * This method is not used currently as the CReq is being  posted using
	 * form action attribute directly to the creqAcsUrl.
	 */
	
	/*$scope.formSubmit = function() {
		$scope.submitBtn=false;
		$scope.loading=true;
		var url = $scope.creqAcsUrl;
		var method = 'POST';

		var params = {
				cReq : $scope.compressedCReq,
				notificationURL : $scope.notificationURL,
				merchantData : $scope.threeDSSessionData
		};
		$localStorage.selVersion = 1;
		CReqService.submitReq(url, method, params);
	}*/
	
}]);