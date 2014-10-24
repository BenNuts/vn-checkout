/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:BillingAddressCtrl
 * @description
 * # BillingAddressCtrl
 * Controller of the vnCheckoutApp
 */
angular.module('VolusionCheckout.controllers')
		.controller('BillingAddressCtrl', ['$rootScope', '$scope', '$filter', '$timeout', 'vnCheckout', 'vnApi', function ($rootScope, $scope, $filter, $timeout, vnCheckout, vnApi) { // jshint ignore:line
			'use strict';

			var PAY_WITH = 2,
				US = 'us';

			$scope.checkout = vnCheckout.get();

			$scope.isLocationUS = ($scope.checkout.location.label === US) ? true : false;

			$scope.shippingAddress = null;

			$scope.check = {};
			$scope.check.useShippingAddress = false;

			$scope.billingAddress = {
				fname             : '',
				lname             : '',
				line1             : '',
				line2             : '',
				city              : '',
				state             : '',
				region            : '',
				zip               : '',
				postalcode        : '',
				country           : 'United States',
				phone             : ''
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
				return ($scope.checkout.currentStep === PAY_WITH) ? 'edit' : 'show';
			};

			$scope.setBillingAddress = function () {
				if ($scope.check.useShippingAddress) {
					angular.copy($scope.shippingAddress, $scope.billingAddress);

				} else {

					for (var prop in $scope.billingAddress) {
						if ($scope.billingAddress.hasOwnProperty(prop)) {
							$scope.billingAddress[prop] = '';
						}
					}
				}

				$scope.updateBillingAddress();

			};

			$scope.toggleLocation = function () {
				vnCheckout.toggleLocation();
				$scope.isLocationUS = ($scope.checkout.location.label === US) ? true : false;
			};

			$scope.onCountryChanged = function (country) {
				$scope.billingAddress.country = country.name;
			};

			$scope.onUsStateChanged = function (state) {
				$scope.billingAddress.state = state.code;

				// VN-PLACEHOLDER need a value and event ... set these for current button
				var elem = angular.element(document.querySelector('#inputShipToUSState'));
				elem.val(state.code);
				elem.triggerHandler('keyup');

			};

			$scope.updateBillingAddress = function (forElem) {

				if ($scope.check.useShippingAddress) {
					$scope.frmBillTo.$valid = true;
				} else {
					// Compensatory measure as we do not want to show error bubble while users are still entering  [semi] valid values
					// Zip validatior will accept any number with length less than 5 ... so on blur we have to check if Zip is really valid
					if (forElem !== undefined && forElem === 'zip') {
						var plainNumber = $scope.frmBillTo.inputBillingUSZip.$viewValue.replace(/[^\d]+/g, '');

						if (plainNumber === $scope.frmBillTo.inputBillingUSZip.$viewValue && plainNumber.toString().length < 5) {
							$scope.frmBillTo.inputBillingUSZip.$setValidity('zip', false);
						}
					}

					// State dropdown does not have validation so we have to check here
					if ($scope.billingAddress.state === '') {
						$scope.frmBillTo.$setValidity('state', false);
						$scope.stateEmpty = undefined;
					} else {
						$scope.frmBillTo.$setValidity('state', true);
						$scope.stateEmpty = 'valid';
					}
				}

				vnCheckout.setBillToValidity($scope.frmBillTo.$valid);

				if ($scope.frmBillTo.$valid) {

					// TODO : REMOVE THIS ***********************************************
					$rootScope.$emit('vnBiilingAddress.updated');
					// TODO : REMOVE THIS ***********************************************
				} else {
					// TODO : REMOVE THIS ***********************************************
					$rootScope.$emit('vnBillingAddress.failed');
					// TODO : REMOVE THIS ***********************************************

				}
			};

			$rootScope.$on('vnShippingAddress.updated', function (evt, address) {
				$scope.shippingAddress = address;
			});

		}]);
