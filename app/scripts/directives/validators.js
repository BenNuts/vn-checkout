/**
 * @ngdoc directive
 * @name vnCheckoutApp.directive:validators
 * @description
 * # validators
 */
angular.module('VolusionCheckout.directives')
	.directive('firstNameValidate', ['vnUtils', function (vnUtils) {

		'use strict';

		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {

				ctrl.$parsers.unshift(function (viewValue) {

					scope.firstNameMinValidLength = (viewValue && viewValue.length >= 1 ? 'valid' : undefined);

					scope.firstNameDisallowedChars = vnUtils.checkDisallowedCharacters(viewValue);
					scope.firstNameAllowedChars = (viewValue && scope.firstNameDisallowedChars === null) ? 'valid' : undefined;

					if (scope.firstNameMinValidLength && scope.firstNameAllowedChars) {
						ctrl.$setValidity('firstName', true);
						return viewValue;
					}

					ctrl.$setValidity('firstName', false);
					return undefined;

				});
			}
		};
	}])
	.directive('lastNameValidate', ['vnUtils', function (vnUtils) {

		'use strict';

		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {

				ctrl.$parsers.unshift(function (viewValue) {

					scope.lastNameMinValidLength = (viewValue && viewValue.length >= 1 ? 'valid' : undefined);

					scope.lastNameDisallowedChars = vnUtils.checkDisallowedCharacters(viewValue);
					scope.lastNameAllowedChars = (viewValue && scope.lastNameDisallowedChars === null) ? 'valid' : undefined;

					if (scope.lastNameMinValidLength && scope.lastNameAllowedChars) {
						ctrl.$setValidity('lastName', true);
						return viewValue;
					}

					ctrl.$setValidity('lastName', false);
					return undefined;

				});
			}
		};
	}])
	.directive('streetValidate', ['vnUtils', function (vnUtils) {

		'use strict';

		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {

				ctrl.$parsers.unshift(function (viewValue) {

					scope.streetEmpty = (viewValue && viewValue.length > 0) ? 'valid' : undefined;
					scope.streetDisallowedChars = vnUtils.checkDisallowedCharacters(viewValue);
					scope.streetAllowedChars = (viewValue && scope.streetDisallowedChars === null) ? 'valid' : undefined;

					if (scope.streetAllowedChars && scope.streetEmpty) {
						ctrl.$setValidity('street', true);
						return viewValue;
					}

					ctrl.$setValidity('street', false);
					return undefined;

				});
			}
		};
	}])
	.directive('cityValidate', ['vnUtils', function (vnUtils) {

		'use strict';

		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {

				ctrl.$parsers.unshift(function (viewValue) {

					scope.cityEmpty = (viewValue && viewValue.length > 0) ? 'valid' : undefined;
					scope.cityDisallowedChars = vnUtils.checkDisallowedCharacters(viewValue);
					scope.cityAllowedChars = (viewValue && scope.cityDisallowedChars === null) ? 'valid' : undefined;

					if (scope.cityAllowedChars && scope.cityEmpty) {
						ctrl.$setValidity('city', true);
						return viewValue;
					}

					ctrl.$setValidity('city', false);
					return undefined;

				});
			}
		};
	}])
	.directive('zipValidate', function () {

		'use strict';

		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {

				ctrl.$parsers.unshift(function (viewValue) {

					var plainNumber = viewValue.replace(/[^\d]+/g, '');

					if (plainNumber === viewValue && viewValue.toString().length < 5 ) {
						scope.zipHasValidFormat = 'valid';
					} else {
						scope.zipHasValidFormat = (viewValue && /^\d{5}(-\d{4})?$/.test(viewValue) ? 'valid' : undefined);
					}

					if (scope.zipHasValidFormat) {
						ctrl.$setValidity('zip', true);
						return viewValue;
					}

					ctrl.$setValidity('zip', false);
					return undefined;

				});
			}
		};
	})
	.directive('cvvValidate', function () {

		'use strict';

		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function (viewValue) {

					var plainNumber = viewValue.replace(/[^\d]+/g, '');

					var pattern = /^\d{3}?$/;
					scope.cvvLength = '3';
					elm.attr('maxlength', 3);

					if (scope.payment.ccType === 'American Express') {
						pattern = /^\d{4}?$/;
						scope.cvvLength = '4';
						elm.attr('maxlength', 4);
					}

					scope.cvvValidFormat = (plainNumber && pattern.test(plainNumber) ? 'valid' : undefined);

					if (scope.cvvValidFormat) {
						ctrl.$setValidity('cvv', true);
						return plainNumber;
					}

					ctrl.$setValidity('cvv', false);
					elm.val(plainNumber);
					return plainNumber;

				});
			}
		};
	});
