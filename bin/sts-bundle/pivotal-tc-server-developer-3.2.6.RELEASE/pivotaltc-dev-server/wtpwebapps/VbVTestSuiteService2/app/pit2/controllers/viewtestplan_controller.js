'use strict';

var viewTestPlanModPIT2 = angular.module('ViewTestPlanCntrlModPIT2',[]);

viewTestPlanModPIT2.controller('ViewTestPlanControllerPIT2', ["$window", "$scope", function($window, $scope) {


	$scope.openFile = function(){
		$window.open("./app/documents/V3DSTS_Test_Plan.pdf");
	}

	$scope.openFile();

}]);