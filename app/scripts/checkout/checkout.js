/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:CheckoutCtrl
 * @description
 * # MainCtrl
 * Controller of the vnCheckoutApp
 */

angular.module('VolusionCheckout.controllers')
	.controller('CheckoutCtrl', ['$scope', 'vnCart', 'vnCheckout', function ($scope, vnCart, vnCheckout) {

		'use strict';

		$scope.checkout = vnCheckout.get();

		$scope.isEditable = function (tab) {
			return ($scope.checkout.currentStep === tab) ? 'edit' : 'show';
		};

		$scope.getShipToValid = function () {
			return !$scope.checkout.shipToValid;
		};

		$scope.getShipMethodValid = function () {
			return !$scope.checkout.shipMethodValid;
		};

		$scope.getCreditCardValid = function () {
			return !$scope.checkout.creditCardValid;
		};

		$scope.getBillingAddressValid = function () {
			return !$scope.checkout.billToValid;
		};

		$scope.setStep = function (num) {
			vnCheckout.setStep(num);
		};

		$scope.nextStep = function () {
			vnCheckout.nextStep();
		};

		$scope.prevStep = function () {
			vnCheckout.prevStep();
		};

		$scope.setOrder = function () {

		};
	}]);
