/*
 * @author pvulupal
 */

(function(){

	'use strict';
	var CTHcReqService = function($http,$rootScope, $sce){

		this.submitReq=function(url, method, params){

			url = $sce.trustAsResourceUrl(url);

			$rootScope.$broadcast('form.submit', {
				url: url,
				method: method,
				params: params
			});
		}
	}

	CTHcReqService.$inject = ['$http','$rootScope','$sce'];
	angular.module('binApp').service('CTHcReqService',CTHcReqService);

}());
