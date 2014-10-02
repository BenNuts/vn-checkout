/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:ShipToCtrl
 * @description
 * # ShipToCtrl
 * Controller of the vnCheckoutApp
 */
angular.module('VolusionCheckout.controllers')
	.controller('ShipToCtrl', ['$scope', '$filter', 'vnCheckout', 'vnApi', 'vnUsStates', function ($scope, $filter, vnCheckout, vnApi, vnUsStates) {

		'use strict';

		var SHIP_TO = 1,
			US = 'us';

		$scope.checkout = vnCheckout.get();

		$scope.isLocationUS = ($scope.checkout.location.label === US) ? true : false;

		$scope.address = {
			fname     : '',
			lname     : '',
			line1     : '',
			line2     : '',
			city      : '',
			state     : '',
			region    : '',
			zip       : '',
			postalcode: '',
			country   : 'Unites States',
			phone     : ''
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
		};
	}]);
