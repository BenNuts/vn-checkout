/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:ShipMethodCtrl
 * @description
 * # ShipMethodCtrl
 * Controller of the vnCheckoutApp
 */
angular.module('VolusionCheckout.controllers')
	.controller('ShipMethodCtrl', ['$scope', 'vnCheckout', function ($scope, vnCheckout) {

		'use strict';

		var SHIP_TO = 1;

		$scope.checkout = vnCheckout.get();

		$scope.currentShippingMethodIdx = 0;

		$scope.isEditable = function () {
			return ($scope.checkout.currentStep === SHIP_TO) ? 'edit' : 'show';
		};

		$scope.setShippingMethod = function (idx) {
			angular.forEach($scope.checkout.cart.shippingMethods, function (method) {
				if ($scope.checkout.cart.shippingMethods[idx].id === method.id) {
					$scope.currentShippingMethodIdx = idx;

					vnCheckout.setShipMethodValidity( method.selected === 'true' );

					return;
				}

				method.selected = 'false';
			});
		};

	}]);
