/*global $:false */

"use strict";

var rightPanelMod = angular.module("RightPanelModule", []);

rightPanelMod.directive('rightPanel', [ function() {
	
	return {
        restrict: 'A',
        templateUrl: './app/directives/rightPanel/rightPanel.html',
    };
    
}]);