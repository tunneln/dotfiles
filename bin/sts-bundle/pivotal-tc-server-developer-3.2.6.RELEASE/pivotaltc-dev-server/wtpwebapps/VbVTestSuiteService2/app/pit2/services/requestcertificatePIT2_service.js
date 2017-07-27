(function(){

	'use strict';
	var requestCertificateServicePIT2 =  function($rootScope,$http){
		var data={};
		this.save = function(data){

			var fd = new FormData();

			fd.append('certType', data.certType);
			fd.append('email', data.email);
			fd.append('requestCertFile', data.requestCertFile);
			fd.append('csr', data.csr);
			return $http.post($rootScope.contextPath+"/pit2/requestCertificate",fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			})

		}

	}
	requestCertificateServicePIT2.$inject = ["$rootScope","$http"];
	angular.module('binApp').service('RequestCertificateServicePIT2',requestCertificateServicePIT2);

}());