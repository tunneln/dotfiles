'use strict';

var cResCtrlMod = angular.module('CResControllerModule',[]);

cResCtrlMod.controller('CResController',['$scope','$state','CResService',function($scope,$state,CResService){

	$state.go('PIT2.cRes');

}]);
