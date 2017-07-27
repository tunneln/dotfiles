/**
 * pvulupal
 */

(function(){

	'use strict';
	var formSubmitter = function ($timeout,$rootScope) {
		return {
            restrict: 'E',
            replace: true,
            template: 
                '<form action="{{ formData.url }}" method="{{ formData.method }}">' +
                '   <div ng-repeat="(key,val) in formData.params">' +
                '       <input type="hidden" name="{{ key }}" value="{{ val }}" />' +
                '   </div>' +
                '</form>',
            link: function($scope, $element, $attrs) {
                $scope.$on('form.submit', function(event, data) {
                    $scope.formData = data;
                    $timeout(function() {
                        $element.submit();
                    })
                })
            }
        };
	};

	formSubmitter.$inject = ['$timeout','$rootScope'];

    angular.module('binApp')
      .directive('formSubmitter', formSubmitter);
}());