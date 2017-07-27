(function(){

	'use strict';

	var changePwdService = function($http,$rootScope){

		this.submitchangePswd = function(data){
			return $http.post($rootScope.contextPath+"/user/changepwd",data).success(function(response){

			}).error(function(error){

			});
		}
	}

	changePwdService.$inject = ['$http','$rootScope'];
	angular.module('binApp').service('ChangePwdService',changePwdService);

}());