/*
 *	@author vkallada 
 */

'use strict';

pageHeaderMod.controller('PageHeaderController',['$scope','VersionChangeService','$rootScope',
                                                     function($scope,VersionChangeService,$rootScope){
	/*$scope.service = VersionChangeService;
	$scope.version = VersionChangeService.getVersion();
	
	$scope.updateVersion = function(){
		$scope.version = VersionChangeService.getVersion();
	}
	
	$rootScope.$on('event:fire', $scope.updateVersion);*/
	$scope.marqueeMessage = "This is 3DS 2.0 Iteration 9. This Iteration has User Enrollment, ACS-3DS Server(Browser and InApp)Test Cases, Administer Tests, Testing History and Testing Status.";
	
	/*$scope.getMarqueeMessage = function() {
		console.log($scope.marqueeMessage);
	}
	
	getMarqueeMessage();*/

}]);