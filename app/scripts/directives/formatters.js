/**
 * @ngdoc directive
 * @name vnCheckoutApp.directive:validators
 * @description
 * # validators
 */
angular.module('VolusionCheckout.directives')
	.directive('formatNumber', ['$filter', function ($filter) {

		'use strict';

		return {
			require: '?ngModel',
			link: function (scope, elem, attrs, ctrl) {
				if (!ctrl) {
					return;
				}

				ctrl.$formatters.unshift(function () {
					return $filter('number')(ctrl.$modelValue);
				});


				ctrl.$parsers.unshift(function (viewValue) {
					var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
					elem.val($filter('number')(plainNumber));
					return plainNumber;
				});
			}
		};
	}])
	.directive('formatCcNumber', ['$filter', function ($filter) {

		'use strict';

		function formatCC (number) {

			if (number === '') {
				return number;
			}

			var ccArr = [];

			if (/^(34)|^(37)/.test(number)) {
				ccArr.push(number.slice(0, 4));
				if (number.slice(4, 10).length > 0) {
					ccArr.push(number.slice(4, 10));
				}

				if (number.slice(10, 15).length > 0) {
					ccArr.push(number.slice(10, 15));
				}
			} else {
				ccArr = number.slice(0, 16).match(/.{1,4}/g);
			}

			return ccArr.join(' ');
		}


		return {
			require: '?ngModel',
			link: function (scope, elem, attrs, ctrl) {
				if (!ctrl) {
					return;
				}

				ctrl.$formatters.unshift(function () {
					return $filter('filter')(ctrl.$modelValue);
				});


				ctrl.$parsers.unshift(function (viewValue) {

					var plainNumber = viewValue.replace(/[^\d]+/g, '');

					elem.val($filter('filter')(function () {
						return formatCC(plainNumber);
					}));

					return plainNumber;
				});
			}
		};
	}]);
