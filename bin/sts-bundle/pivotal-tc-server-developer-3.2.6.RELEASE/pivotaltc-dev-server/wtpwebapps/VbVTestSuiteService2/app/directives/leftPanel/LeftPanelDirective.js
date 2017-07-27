/*global $:false */

"use strict";

var leftPanelMod = angular.module("LeftPanelModule", []);

leftPanelMod.directive("leftPanel", [ "$rootScope", function($rootScope) {
	
	return {
        restrict: 'A',
        templateUrl: './app/directives/leftPanel/leftPanel.html',
        controller:'LeftPanelController'
    };
    
}]);
