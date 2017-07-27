'use strict';

var viewUserGuideModPIT2 = angular.module('ViewUserGuideCntrlModPIT2',[]);

viewUserGuideModPIT2.controller('ViewUsersGuideControllerPIT2', ["$window", "$scope", function($window, $scope) {

	//$window.open("./app/images/UsersGuide.pdf");
	$scope.openFile = function(){
		$window.open("./app/documents/UsersGuide.pdf");
	}

	$scope.openFile();

}]);
