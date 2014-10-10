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

				ccArr = number.slice(0, 15).match(/(.{0,4})(.{0,6})(.{0,5})$/);
				// remove first element as the regex retunes always 4 elements as the first one is the whole string
				ccArr.splice(0,1);

				for(var idx = 0; idx < ccArr.length; idx++ ) {
					if (ccArr[idx] === '') {
						ccArr.splice (idx, 1);
						idx = 0;
					}
				}

			} else {
				ccArr = number.slice(0, 16).match(/.{1,4}/g);
			}

			return (ccArr !== null) ? ccArr.join(' ') : number;
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
