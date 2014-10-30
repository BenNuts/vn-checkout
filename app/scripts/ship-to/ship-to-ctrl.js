/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:ShipToCtrl
 * @description
 * # ShipToCtrl
 * Controller of the vnCheckoutApp
 */
angular.module('VolusionCheckout.controllers')
		.controller('ShipToCtrl', ['$rootScope', '$scope', '$filter', 'vnCheckout', 'vnApi', 'vnCart', function ($rootScope, $scope, $filter, vnCheckout, vnApi, vnCart) {

			'use strict';

			var SHIP_TO = 1,
				US = 'us';

			$scope.checkout = vnCheckout.get();

			$scope.isLocationUS = ($scope.checkout.location.label === US) ? true : false;

			$scope.address = {
				firstName  : '',
				lastName   : '',
				address1   : '',
				address2   : '',
				city       : '',
				state      : '',
				region     : '',
				postalCode : '',
				country    : 'Unites States',
				phoneNumber: ''
			};

			$scope.countries = [];
			$scope.usStates = [];

			vnApi.Country().query().$promise
					.then(function (response) {
						$scope.countries = response.data;

						$scope.usStates = $filter('filter')($scope.countries, function (country) {
							if (country.name === 'United States') {
								return country;
							}
						})[0].states;
					});

			// TODO: initialize COUNTRY and CHECKOUT.LOCATION with the response from https://freegeoip.net
			// DEFAULT: start with USofA

			// *******************************************************************************************

			$scope.isEditable = function () {
				return ($scope.checkout.currentStep === SHIP_TO) ? 'edit' : 'show';
			};

			$scope.toggleLocation = function () {
				vnCheckout.toggleLocation();
				$scope.isLocationUS = ($scope.checkout.location.label === US) ? true : false;
			};

			$scope.onCountryChanged = function (country) {
				$scope.address.country = country.name;
			};

			$scope.onUsStateChanged = function (state) {
				$scope.address.state = state.code;

				// VN-PLACEHOLDER need a value and event ... set these for current button
				var elem = angular.element(document.querySelector('#inputShipToUSState'));
				elem.val(state.code);
				elem.triggerHandler('keyup');

			};

			$scope.updateShippingAddress = function (forElem) {

				// Compensatory measure as we do not want to show error bubble while users are still entering  [semi] valid values
				// Zip validatior will accept any number with length less than 5 ... so on blur we have to check if Zip is really valid
				if (forElem !== undefined && forElem === 'zip') {
					var plainNumber = $scope.frmShipTo.inputShipToUSZip.$viewValue.replace(/[^\d]+/g, '');

					if (plainNumber === $scope.frmShipTo.inputShipToUSZip.$viewValue && plainNumber.toString().length < 5) {
						$scope.frmShipTo.inputShipToUSZip.$setValidity('zip', false);
					}
				}

				// State dropdown does not have validation so we have to check here
				if ($scope.address.state === '') {
					$scope.frmShipTo.$setValidity('state', false);
					$scope.stateEmpty = undefined;
				} else {
					$scope.frmShipTo.$setValidity('state', true);
					$scope.stateEmpty = 'valid';
				}

				vnCheckout.setShipToValidity($scope.frmShipTo.$valid);

				if ($scope.frmShipTo.$valid) {

					// TODO : REMOVE THIS ***********************************************
					$rootScope.$emit('vnShippingAddress.updated');
					// TODO : REMOVE THIS ***********************************************

					angular.extend($scope.checkout.cart.shippingAddress, $scope.address);

					vnCart.updateCart();

				} else {
					// TODO : REMOVE THIS ***********************************************
					$rootScope.$emit('vnShippingAddress.failed');
					// TODO : REMOVE THIS ***********************************************

				}
			};
		}]);
