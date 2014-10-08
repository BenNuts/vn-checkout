/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:ShipMethodCtrl
 * @description
 * # ShipMethodCtrl
 * Controller of the vnCheckoutApp
 */
angular.module('VolusionCheckout.controllers')
	.controller('ShipMethodCtrl', ['$rootScope', '$scope', 'vnCheckout', function ($rootScope, $scope, vnCheckout) {

		'use strict';

		var SHIP_TO = 1;

		$scope.checkout = vnCheckout.get();

		$scope.cart = {};
		$scope.cart.shippingMethods = [];

		$scope.currentShippingMethodIdx = 0;

		$scope.isEditable = function () {
			return ($scope.checkout.currentStep === SHIP_TO) ? 'edit' : 'show';
		};

		$scope.setShippingMethod = function (idx) {
			angular.forEach($scope.cart.shippingMethods, function (method) {
				if ($scope.cart.shippingMethods[idx].id === method.id) {
					$scope.currentShippingMethodIdx = idx;
					return;
				}

				method.selected = 'false';
			});
		};

		$rootScope.$on('vnShippingAddress.updated', function () {
			$scope.cart.shippingMethods = [
				{
					id : 104,
					name : 'Online delivery / No Shipping',
					price : 0,
					selected : 'false'
				},
				{
					id : 1,
					name : 'Test delivery with very long description just to see how it looks',
					price : 3.14,
					selected : 'true'
				}
			];

			var idx = 0;
			angular.forEach($scope.cart.shippingMethods, function (method) {
				if (method.selected === 'true') {
					$scope.currentShippingMethodIdx = idx;
				}

				idx++;
			});
		});

		$rootScope.$on('vnShippingAddress.failed', function () {
			$scope.cart.shippingMethods = [];
		});

		$scope.$watch('cart.shippingMethods', function () {

			console.log($scope.cart.shippingMethods);

		}, true);


	}]);
