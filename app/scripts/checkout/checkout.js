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

		$scope.nextStep = function () {
			vnCheckout.nextStep();
		};

		$scope.prevStep = function () {
			vnCheckout.prevStep();
		};
	}]);
