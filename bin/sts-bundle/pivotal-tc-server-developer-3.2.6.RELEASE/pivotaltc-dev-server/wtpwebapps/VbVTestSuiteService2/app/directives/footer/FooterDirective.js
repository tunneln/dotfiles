/**
 * 
 */
/*global $:false */

"use strict";

var footerMod = angular.module("FooterModule", []);

footerMod.directive("footer", [ function() {
	
	return {
		restrict: 'A',
		templateUrl: './app/directives/footer/footer.html',
		link: function(scope, element) {
		},
		controller:'FooterCtrl'

	};
	
}]);