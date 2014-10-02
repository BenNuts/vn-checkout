/**
 * @ngdoc function
 * @name vnCheckoutApp.controller:ShipToCtrl
 * @description
 * # ShipToCtrl
 * Controller of the vnCheckoutApp
 */
angular.module('vnCheckoutApp')
	.controller('ShipToCtrl', ['$scope', 'vnCheckout', function ($scope, vnCheckout) {

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
			country   : '',
			phone     : ''
		};

		$scope.countries = [
			{code:'us', label:'Unites States of America'},
			{code:'bg', label:'Bulgaria'},
			{code:'mx', label:'Mexico'}
		];

		$scope.isEditable = function () {
			return ($scope.checkout.currentStep === SHIP_TO) ? 'edit' : 'show';
		};

		$scope.toggleLocation = function () {
			vnCheckout.toggleLocation();
			$scope.isLocationUS = ($scope.checkout.location.label === US) ? true : false;
		};
	}]);
