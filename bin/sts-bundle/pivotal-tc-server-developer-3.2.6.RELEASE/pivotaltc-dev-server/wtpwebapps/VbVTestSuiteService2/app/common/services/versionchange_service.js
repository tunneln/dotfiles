(function(){

	'use strict';

	var versionChangeService = function(){
		var version = '';

		this.getVersion = function(){return version;}
		this.setVersion = function(versionId) {
			version = versionId;
		}
	}

	versionChangeService.$inject = [];

	angular.module('binApp').service('VersionChangeService',versionChangeService);

}());