/**
 * 
 */
/*global $:false */

"use strict";

var userEnrollmentMod = angular.module("UserEnrollmentModule", []);

userEnrollmentMod.directive('userEnrollment', [ function() {
	
	return {
        restrict: 'A',
        templateUrl: './app/directives/userEnrollment/userEnrollment.html',
    };
    
}]);
