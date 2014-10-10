/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:CheckoutCtrl
 * @description
 * # MainCtrl
 * Controller of the vnCheckoutApp
 */

angular.module('VolusionCheckout.controllers')
	.controller('CheckoutCtrl', ['$scope', 'vnCheckout', function ($scope, vnCheckout) {

		'use strict';

		$scope.checkout = vnCheckout.get();

		$scope.isEditable = function (tab) {
			return ($scope.checkout.currentStep === tab) ? 'edit' : 'show';
		};

		$scope.getShipToValid = function () {
			return !$scope.checkout.shipToValid;
		};

		$scope.getCreditCardValid = function () {
			return !$scope.checkout.creditCardValid;
		};

		$scope.nextStep = function () {
			vnCheckout.nextStep();
		};

		$scope.prevStep = function () {
			vnCheckout.prevStep();
		};
	}]);
