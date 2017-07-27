(function(){

	'use strict';

	var errorMessage = function () {
		return {
			restrict: 'A',
			templateUrl: './app/directives/errorMessage/errorMessage.html',
		};
	};

	errorMessage.$inject = [];

	angular.module('binApp')
	.directive('errorMessage', errorMessage);

}());
