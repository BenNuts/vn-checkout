/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:CreditCardCtrl
 * @description
 * # CreditCardCtrl
 * Controller of the vnCheckoutApp
 */
angular.module('VolusionCheckout.controllers')
	.controller('CreditCardCtrl', ['$scope', '$filter', 'vnCheckout', 'vnApi', function ($scope, $filter, vnCheckout, vnApi) { // jshint ignore:line

		'use strict';

		var PAY_WITH = 2;

		function setCreditCardInfo() {
			if ($scope.payment.ccNumber === undefined || $scope.payment.ccNumber === '') {
				$scope.payment.ccCssClass = 'credit-card__image--notvalid';
				return;
			}

			$scope.payment.ccType = '';
			$scope.payment.ccCssClass = 'credit-card__image--unknown';

			if (/^(34)|^(37)/.test($scope.payment.ccNumber)) {
				$scope.payment.ccType = 'American Express';
				$scope.payment.ccCssClass = 'credit-card__image--amex';
			}
			if (/^4/.test($scope.payment.ccNumber)) {
				$scope.payment.ccType = 'Visa';
				$scope.payment.ccCssClass = 'credit-card__image--visa';
			}
			if (/^5[1-5]/.test($scope.payment.ccNumber)) {
				$scope.payment.ccType = 'MasterCard';
				$scope.payment.ccCssClass = 'credit-card__image--mastercard';
			}
			if (/^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/.test($scope.payment.ccNumber)) {
				$scope.payment.ccType = 'Discover Card';
				$scope.payment.ccCssClass = 'credit-card__image--discover';
			}
		}

		$scope.checkout = vnCheckout.get();

		$scope.months = [
			{ num: '01', label: '01 - January' },
			{ num: '02', label: '02 - February' },
			{ num: '03', label: '03 - March' },
			{ num: '04', label: '04 - April' },
			{ num: '05', label: '05 - May' },
			{ num: '06', label: '06 - June' },
			{ num: '07', label: '07 - July' },
			{ num: '08', label: '08 - August' },
			{ num: '09', label: '09 - September' },
			{ num: '10', label: '10 - October' },
			{ num: '11', label: '11 - November' },
			{ num: '12', label: '12 - December' }
		];

		$scope.rangeYears = function () {
			var ret = [],
				i,
				start = new Date().getFullYear();

			for (i = start; i <= start + 5; i++) {
				ret.push(i);
			}
			return ret;
		};

		$scope.payment = {
			ccNumber       : '',
			ccCvv          : '',
			ccExpMonth     : 'MM',
			ccExpYear      : 'YY',
			ccHolderName   : '',

			// for display purposes
			ccDisplayNumber: '',
			ccType         : '',
			ccCssClass     : 'credit-card__image--notvalid'
		};

		$scope.isEditable = function () {
			return ($scope.checkout.currentStep === PAY_WITH) ? 'edit' : 'show';
		};

		$scope.onExpMonthChanged = function (month) {
			$scope.payment.ccExpMonth = month.num;
		};

		$scope.onExpYearChanged = function (year) {
			$scope.payment.ccExpYear = year.toString().substring(2);
		};

		$scope.setCCImage = function (param) {
			if (param === undefined) {
				if ($scope.payment.ccType === 'American Express') {
					$scope.payment.ccCssClass = 'credit-card__image--amex-flipped';
				} else {
					$scope.payment.ccCssClass = 'credit-card__image--flipped';
				}
			} else {
				setCreditCardInfo();
			}
		};

		$scope.$watch('payment.ccNumber', function () {
			setCreditCardInfo();
		});
	}])
;
