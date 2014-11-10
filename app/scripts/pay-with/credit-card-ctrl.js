/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:CreditCardCtrl
 * @description
 * # CreditCardCtrl
 * Controller of the vnCheckoutApp
 */
angular.module('VolusionCheckout.controllers')
	.controller('CreditCardCtrl', ['$scope', '$filter', 'vnCheckout', 'vnPayment', function ($scope, $filter, vnCheckout, vnPayment) { // jshint ignore:line

		'use strict';

		var PAY_WITH = 2;

		$scope.expDateInvalid = 'valid';

		function setCreditCardInfo() {

			if ($scope.payment.cardNumber.indexOf('*') !== -1) {
				return;
			}

			if ($scope.payment.cardNumber === undefined || $scope.payment.cardNumber === '') {
				$scope.payment.ccCssClass = 'credit-card__image--notvalid';
				return;
			}

			$scope.payment.CardType = '';
			$scope.payment.ccCssClass = 'credit-card__image--unknown';

			if (/^(34)|^(37)/.test($scope.payment.cardNumber)) {
				$scope.payment.CardType = 'AMEX';
				$scope.payment.ccCssClass = 'credit-card__image--amex';
			}
			if (/^4/.test($scope.payment.cardNumber)) {
				$scope.payment.CardType = 'VISA';
				$scope.payment.ccCssClass = 'credit-card__image--visa';
			}
			if (/^5[1-5]/.test($scope.payment.cardNumber)) {
				$scope.payment.CardType = 'MC';
				$scope.payment.ccCssClass = 'credit-card__image--mastercard';
			}
			if (/^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/.test($scope.payment.cardNumber)) {
				$scope.payment.CardType = 'DISC';
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

			$scope.payment = vnPayment.getCard();

		/*$scope.payment = {
			ccNumber       : '4111111111111111',
			ccCvv          : '123',
			ExpireMonth     : '08',
			ExpireYear      : '17',
			ccHolderName   : '',

			// for display purposes
			ccDisplayNumber: '',
			CardType         : '',
			ccCssClass     : 'credit-card__image--notvalid'
		};*/

		$scope.isEditable = function () {
			return ($scope.checkout.currentStep === PAY_WITH) ? 'edit' : 'show';
		};

		$scope.onExpMonthChanged = function (month) {
			$scope.payment.ExpireMonth = month.num;

			// VN-PLACEHOLDER need a value and event ... set these for current button
			var elem = angular.element(document.querySelector('#inputCreditCardExpMonth'));
			elem.val(month.num);
			elem.triggerHandler('keyup');

		};

		$scope.onExpYearChanged = function (year) {
			$scope.payment.ExpireYear = year.toString().substring(2);

			// VN-PLACEHOLDER need a value and event ... set these for current button
			var elem = angular.element(document.querySelector('#inputCreditCardExpYear'));
			elem.val(year.toString().substring(2));
			elem.triggerHandler('keyup');

		};

		$scope.setCCImage = function (param) {
			if (param === undefined) {
				if ($scope.payment.CardType === 'AMEX') {
					$scope.payment.ccCssClass = 'credit-card__image--amex-flipped';
				} else {
					$scope.payment.ccCssClass = 'credit-card__image--flipped';
				}
			} else {
				setCreditCardInfo();
			}
		};

		$scope.displayExpDate = function () {
			var exp = '';

			exp = ($scope.payment.ExpireMonth === '') ? '' : $scope.payment.ExpireMonth;
			exp += ($scope.payment.ExpireYear === '') ? '' : '/' + $scope.payment.ExpireYear;

			return exp;
		};

		$scope.updateCreditCard = function (forElem) {

			var plainNumber;
			// Compensatory measure(s) as we do not want to show error bubble while users are still entering  [semi] valid values

			// CC validatior will accept any number with length less than 15/16 ... so on blur we have to check if CCNumber is really valid
			if (forElem !== undefined && forElem === 'cc') {
				plainNumber = $scope.frmCreditCard.inputCreditCardNumber.$viewValue.replace(/[^\d]+/g, '');
				var ccNumberLength = 16;

				if ($scope.payment.CardType === 'AMEX') {
					ccNumberLength = 15;
				}

				if (plainNumber.toString().length < ccNumberLength) {
					$scope.frmCreditCard.inputCreditCardNumber.$setValidity('creditcard', false);
				}
			}

			if (forElem !== undefined && forElem === 'cvv') {

				plainNumber = $scope.frmCreditCard.inputCreditCardCVV.$viewValue.replace(/[^\d]+/g, '');
				var cvvNumberLength = 3;

				if ($scope.payment.CardType === 'AMEX') {
					cvvNumberLength = 4;
				}

				$scope.frmCreditCard.inputCreditCardCVV.$setValidity('cvv', (plainNumber.toString().length === cvvNumberLength));

			}

			// Month dropdown does not have validation so we have to check here
			if ($scope.payment.ExpireMonth === '') {
				$scope.frmCreditCard.$setValidity('expmonth', false);
			} else {
				$scope.frmCreditCard.$setValidity('expmonth', true);
			}

			// Month dropdown does not have validation so we have to check here
			if ($scope.payment.ExpireYear === '') {
				$scope.frmCreditCard.$setValidity('expyear', false);
			} else {
				$scope.frmCreditCard.$setValidity('expyear', true);
			}

			// Check expiration date
			if ($scope.payment.ExpireMonth !== '' && $scope.payment.ExpireYear !== '') {

				var date = new Date();
				$scope.expDateInvalid = 'valid';

				if (parseInt('20' + $scope.payment.ExpireYear) === date.getFullYear()) {
					if (parseInt($scope.payment.ExpireMonth) < date.getMonth() + 1) {
						$scope.expDateInvalid = undefined;
						$scope.frmCreditCard.$setValidity('expmonth', false);
					}
				}
			}

			vnCheckout.setCreditCardValidity($scope.frmCreditCard.$valid);

			if ($scope.frmCreditCard.$valid) {

				// Call Volusion's payment service
				//vnPayment.setPersistCard(true);
				//vnPayment.setCardHolderName($scope.payment.ccHolderName);
				//vnPayment.setCardNumber($scope.payment.cardNumber);
				//vnPayment.setCvv($scope.payment.ccCvv);
				//vnPayment.setExpireMonth($scope.payment.ExpireMonth);
				//vnPayment.setExpireYear($scope.payment.ExpireYear);
				//vnPayment.setCardType($scope.payment.CardType);

				vnPayment.process();
			}
		};

		$scope.$watch('payment.cardNumber', function () {
			setCreditCardInfo();
		});

	}]);
