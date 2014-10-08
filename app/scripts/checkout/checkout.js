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

		var SHIP_TO = 1;

		$scope.checkout = vnCheckout.get();

		$scope.isEditable = function (tab) {
			return ($scope.checkout.currentStep === tab) ? 'edit' : 'show';
		};

		$scope.nextStep = function () {
			vnCheckout.nextStep();
		};

		$scope.prevStep = function () {
			vnCheckout.prevStep();
		};
	}]);
