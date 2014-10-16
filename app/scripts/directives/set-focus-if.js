/**
 * @ngdoc directive
 * @name vnCheckoutApp.directive:setFocusIf
 * @description
 * # setFocusIf
 */
angular.module('VolusionCheckout.directives')
		.directive('setFocusIf', [ function () {

			'use strict';

			return {
				restrict: 'A',
				scope: {
					setFocusIf: '='
				},
				link: function (scope, element) {
					scope.$watch('setFocusIf', function (currentValue) {
						if (currentValue === undefined) {
							element[0].focus();
						}
					});
				}
			};
		}]);
