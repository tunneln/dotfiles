/**
 * 
 */
/*global $:false */

"use strict";

var resetPwdMod = angular.module("ResetPwdModule", []);

resetPwdMod.directive('resetPassword', [ function() {
	
	return {
        restrict: 'A',
        templateUrl: './app/directives/resetPassword/resetPassword.html',
        controller:'ResetPasswordCtrl'
    };
    
}]);