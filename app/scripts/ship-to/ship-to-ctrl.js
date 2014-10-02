/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:ShipToCtrl
 * @description
 * # ShipToCtrl
 * Controller of the vnCheckoutApp
 */
angular.module('VolusionCheckout.controllers')
	.controller('ShipToCtrl', ['$scope', 'vnCheckout', 'vnApi', 'vnUsStates', function ($scope, vnCheckout, vnApi, vnUsStates) {

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
			country   : 'Unites States of America',
			phone     : ''
		};

		$scope.countries = vnApi.Country().query();

		$scope.usStates = vnUsStates.states;

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
			$scope.address.state = state.abbr;
		};
	}]);
