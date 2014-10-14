angular.module('VolusionCheckout.directives')

/**
 * @ngdoc directive
 * @name vnCheckoutApp.directive:validators
 * @description
 * # validators
 */
		.directive('formatNumber', ['$filter', function ($filter) {

			'use strict';

			return {
				require: '?ngModel',
				link   : function (scope, elem, attrs, ctrl) {
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

/**
 * @ngdoc directive
 * @name vnCheckoutApp.directive:validators
 * @description
 * # validators
 */
		.directive('formatCcNumber', ['$filter', function ($filter) {

			'use strict';

			function formatCC(number) {

				if (number === '') {
					return number;
				}

				var ccArr = [];

				if (/^(34)|^(37)/.test(number)) {

					ccArr = number.slice(0, 15).match(/(.{0,4})(.{0,6})(.{0,5})$/);
					// remove first element as the regex retunes always 4 elements as the first one is the whole string
					ccArr.splice(0, 1);

					for (var idx = 0; idx < ccArr.length; idx++) {
						if (ccArr[idx] === '') {
							ccArr.splice(idx, 1);
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
				link   : function (scope, elem, attrs, ctrl) {
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
		}])

/**
 * @ngdoc directive
 * @name vnCheckoutApp.directive:validators
 * @description
 * # validators
 */
		.directive('formatUsPhoneNumber', ['$filter', function ($filter) {

			'use strict';

			function formatUSPhone(number) {
				if (number === '') {
					return number;
				}

				var phoneArr,
					formatted = '';

				phoneArr = number.slice(0, 14).match(/(.{0,3})(.{0,3})(.{0,4})(.{0,4})$/);
				// remove first element as the regex retunes always 4 elements as the first one is the whole string
				phoneArr.splice(0, 1);

				if (phoneArr[0].length === 3) {
					formatted = '(' + phoneArr[0] + ')';
				} else {
					return number;
				}

				if (phoneArr[1].length > 0) {
					formatted += ' ' + phoneArr[1];
				}

				if (phoneArr[2].length > 0) {
					formatted += '-' + phoneArr[2];
				}

				if (phoneArr[3].length > 0) {
					formatted += ' ext.' + phoneArr[3];
				}

				return formatted;
			}

			return {
				require: '?ngModel',
				link   : function (scope, elem, attrs, ctrl) {
					if (!ctrl) {
						return;
					}

					ctrl.$formatters.unshift(function () {
						return $filter('filter')(ctrl.$modelValue);
					});


					ctrl.$parsers.unshift(function (viewValue) {

						var plainNumber = viewValue.replace(/[^\d]+/g, '');

						elem.val($filter('filter')(function () {
							return formatUSPhone(plainNumber);
						}));

						return plainNumber;
					});
				}
			};
		}]);
