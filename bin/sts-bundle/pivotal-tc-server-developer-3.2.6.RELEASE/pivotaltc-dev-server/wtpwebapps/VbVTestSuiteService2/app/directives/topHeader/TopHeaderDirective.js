/*global $:false */
/*
 *  @author vkallada
 */

"use strict";

var topHeaderMod = angular.module("TopHeaderModule", []);

topHeaderMod.directive("topHeader", [ "$rootScope", function($rootScope) {
	
	return {
        restrict: 'A',
        templateUrl: './app/directives/topHeader/topHeader.html',
        link: function(scope, element) {
        	scope.logo = './app/images/logo.png';
        	scope.productName = "Visa 3-D Secure 2.0 Test Suite";
        	scope.loggedInUser = $rootScope.loggedInUser;
        	scope.getDatetime = function() {
//    		  return new Date().toUTCString().replace(/GMT.*/g,"")+ " UTC";Wed, 10 May 2017 13:25:37 UTC
        		return new Date().toUTCString();
    		};
        },
    };
	
}]);