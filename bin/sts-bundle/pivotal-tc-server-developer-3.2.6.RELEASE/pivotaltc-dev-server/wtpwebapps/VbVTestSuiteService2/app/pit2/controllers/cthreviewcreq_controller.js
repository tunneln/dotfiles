/**
 *	@author pvulupal 
 */

"use strict";

cthModule.controller("CTHReviewCReqController",["$scope","CTHRunACSTest","CTHcReqService","$cookieStore",function($scope,CTHRunACSTest,CTHcReqService,$cookieStore){
	$scope.service = CTHRunACSTest;
	$scope.compressedCReq = $scope.service.CReqCompressedData.CompressedCReq;
	$scope.notificationUrl = $scope.service.CReqCompressedData.TermUrl;
	$scope.threeDSSessionData = $scope.service.CReqCompressedData.Md;
	$scope.creqAcsUrl = $scope.service.CReqCompressedData.CreqACSURL;
	$scope.submitBtn = true;

/*	$scope.formSubmit = function() {
		$scope.submitBtn=false;
		$scope.loading=true;
         var url = $scope.creqAcsUrl;
         var method = 'POST';
        
         var params = {
        	 cReq: $scope.compressedCReq,
        	 notificationURL: $scope.termUrl,
        	 merchantData: $scope.md
         };

         $cookieStore.put("selVersion","0");

         CTHcReqService.submitReq(url, method, params);
         
	 }*/
}]);