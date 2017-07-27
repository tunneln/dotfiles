'use strict';

var faqModPIT2 = angular.module('FaqCntrlModPIT2',[]);

faqModPIT2.controller('FaqControllerPIT2', ["$window", "$scope", function($window, $scope) {


	$scope.openFile = function(){
		$window.open("./app/documents/V3DS_Product_Integration_FAQ.pdf");
	}

	$scope.openFile();

}]);