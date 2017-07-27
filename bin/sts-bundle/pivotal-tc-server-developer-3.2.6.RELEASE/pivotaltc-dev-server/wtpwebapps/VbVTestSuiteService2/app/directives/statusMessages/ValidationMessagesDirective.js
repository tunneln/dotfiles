/*global $:false */
"use strict";

var validationMessageMod = angular.module("ValidationMessageModule", []);

validationMessageMod.directive('validationMessage', [ function() {
	
	return {
        restrict: 'A',
        templateUrl: './app/directives/statusMessages/messages.html',
    };
    
}]);