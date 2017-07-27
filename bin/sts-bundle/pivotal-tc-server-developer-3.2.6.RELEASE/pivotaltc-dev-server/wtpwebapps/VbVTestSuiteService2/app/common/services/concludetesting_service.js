(function(){

	'use strict';
	var concludeTestingService =  function($rootScope,$http){
		
		this.sendEmail = function(){
			return $http.get($rootScope.contextPath+"/pit1/concludeTesting")
		}
	}
	
	concludeTestingService.$inject = ["$rootScope","$http"];
	angular.module('binApp').service('ConcludeTestingService',concludeTestingService);

}());