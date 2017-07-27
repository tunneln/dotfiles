(function(){

	'use strict';
	var ReviewReqTestDataPIT2 = function($http,$rootScope){
		/*
		this.getTcRegions=function(){


			return $http.get($rootScope.contextPath+"/regionsdata").then(function(response){
				return response.data;
			});

		}*/

		this.getReviewReqTestResutls = function(data) {
			return $http.post($rootScope.contextPath + '/pit2/reviewTCresults',
					data).then(function(response) {
				return response.data;
			});
		}

		this.reviewTestCase = function(id){
			return $http.post($rootScope.contextPath+'/pit2/reviewACS',id);
		}
	}

	ReviewReqTestDataPIT2.$inject = ['$http','$rootScope'];

	angular.module('binApp').service('ReviewReqTestDataPIT2',ReviewReqTestDataPIT2);


}());