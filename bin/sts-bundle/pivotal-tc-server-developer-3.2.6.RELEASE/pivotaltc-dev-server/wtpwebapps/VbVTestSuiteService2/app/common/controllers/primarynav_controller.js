/*
 *	@author vkallada 
 */

'use strict';
primaryNavMod.controller('PrimaryNavController',['$scope','VersionChangeService','$rootScope','$localStorage',
                                                     function($scope,VersionChangeService,$rootScope,$localStorage){
	
	$scope.service = VersionChangeService;
	
	$scope.appVersions = [
 	                    {'link':'PIT2','id':'3DS 2.0'}
 	                    ]
	$scope.selected;
	$scope.select = function(index){
		$scope.selected = index;
	}

	$scope.menuChange = function(versionId) {
		VersionChangeService.setVersion(versionId);
		$rootScope.$broadcast('event:fire');
	}
	
	$scope.defaultVersion = function(){
		var versionId = '';
		var selVersion = $localStorage.selVersion;
		delete $localStorage.selVersion;
		if(selVersion !== undefined){
			$scope.selected = selVersion;
		}else{
			$scope.selected = 0;
			
			/*if($rootScope.userAuthorities.length > 1){
				$scope.selected = 0;
			}else if($rootScope.userAuthorities.length == 1){
				if($rootScope.userAuthorities.indexOf("PIT1") !== -1)
					$scope.selected = 0;
				else if($rootScope.userAuthorities.indexOf("PIT2") !== -1)
					$scope.selected = 1;
			}*/
		}
		versionId = $scope.appVersions[$scope.selected].id;
		
		$scope.menuChange(versionId);
	}
	
	$scope.defaultVersion();
	
}]);