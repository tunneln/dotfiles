
'use strict';

reviewTestActModpit2.service('PIT2ReviewService',['$http','$rootScope',function($http,$rootScope){
	var backActionState = "";
	var email = "";
	var componentType = "";
	var startDate = "";
	var endDate = "";
	var status = "";
	var testType = "";
	var startTime = "";
	var endTime = "";
	var isReturn = false;
	var previousSearchResults = [];
	var currentPage = "";
	var backBtn = false;
	var cthBckBtn = false;
	var noTestCases = false;
	this.reviewLoad = function(data){
		return $http.post($rootScope.contextPath+'/pit2/reviewTestActivity',data);
	}

	this.reviewTestCase = function(id,component){
		if(component == 'ACS' || component == 'ACS_REQUIRED'){
			return $http.get($rootScope.contextPath+'/pit2/reviewACS',{
				params : {
					'transcId' : id
				}});
					
					
		}else if(component == 'MPI' || component == 'MPI_REQUIRED'){
			return $http.get($rootScope.contextPath+'/pit2/reviewMPI',{
				params : {
					'transcId' : id
				}});
		}else{
			return $http.get($rootScope.contextPath+'/pit2/reviewPARESBATCH',{
				params : {
					'transcId' : id
				}});
		}
	}

}]);