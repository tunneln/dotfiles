/**
 * author vkallada
 */
reviewCResMod.controller('ErrorCResController',["$state","$rootScope", function($state,$rootScope) {
	$rootScope.showErrorAlert = true;
	$state.go("PIT2.errorCRes");
}]);
