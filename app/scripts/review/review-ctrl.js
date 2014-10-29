/**
* @ngdoc function
* @name vnCheckoutApp.controller:ReviewCtrl
* @description
* # ReviewCtrl
* Controller of the vnCheckoutApp
*/
angular.module('VolusionCheckout.controllers')
		.controller('ReviewCtrl', ['$rootScope', '$scope', '$filter', '$timeout', 'vnCheckout', 'vnCart', function ($rootScope, $scope, $filter, $timeout, vnCheckout, vnCart) { // jshint ignore:line
			'use strict';

			//var REVIEW = 3;

			$scope.checkout = vnCheckout.get();


		}]);
