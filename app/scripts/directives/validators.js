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
	}]);
