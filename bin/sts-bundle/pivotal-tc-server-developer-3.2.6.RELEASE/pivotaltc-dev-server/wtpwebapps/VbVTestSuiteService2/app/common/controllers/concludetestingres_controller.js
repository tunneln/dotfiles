'use strict';

var concludeTestingResMod = angular.module('ConcludeTestingResMod', []);

concludeTestingResMod.controller('ConcludeTestingResponseController', [
   "$scope", "ConcludeTestingService", "$state", "$rootScope",
   function($scope, ConcludeTestingService, $state, $rootScope) {

	   $scope.service = ConcludeTestingService;
	   $scope.successMessage = "Testing is complete.";

   }
]);