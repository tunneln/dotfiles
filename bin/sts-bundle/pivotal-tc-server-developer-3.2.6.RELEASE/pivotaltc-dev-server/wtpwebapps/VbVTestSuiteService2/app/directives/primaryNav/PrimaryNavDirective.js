/*global $:false */

"use strict";

var primaryNavMod = angular.module("PrimaryNavModule",[]);

primaryNavMod.directive('primaryNav', [ function() {
	
	return {
		restrict: 'A',
		templateUrl: './app/directives/primaryNav/primaryNav.html',
		link: function(scope, element, VersionChangeService) {
			/*scope.service = VersionChangeService;
			scope.menuChange = function(versionId) {
				scope.service.setVersion(versionId);
				console.log("The selected versionId is ;: "+versionId);
				scope.service.version = versionId;
				console.log("THE UPDATED VERSION IS == "+scope.service.version);
				VersionChangeService.versionChange(versionId);.then(function(){
					console.log("THE UPDATED VERSION IS == "+scope.service.version);
				})
				//scope.service.version = versionId;
				
			}*/
		},
		controller: 'PrimaryNavController'
	};
	
}]); 
