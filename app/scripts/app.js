/**
 * @ngdoc overview
 * @name vnCheckoutApp
 * @description
 * # vnCheckoutApp
 *
 * Main module of the application.
 */

angular.module('VolusionCheckout.templates', []);
angular.module('VolusionCheckout.services', []);
angular.module('VolusionCheckout.controllers', []);
angular.module('VolusionCheckout.directives', []);

angular
	.module('vnCheckoutApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',

		// Third party modules
		'ui.bootstrap',
		'pascalprecht.translate',

		// Volusion modules
		'Volusion.toolboxCommon',
		'VolusionCheckout.controllers',
		'VolusionCheckout.services',
		'VolusionCheckout.directives'
	])
	.config(['$routeProvider', '$locationProvider', '$httpProvider',
		function ($routeProvider, $locationProvider, $httpProvider) {

			'use strict';

			$locationProvider.html5Mode(true);

			$httpProvider.defaults.useXDomain = true;
			$httpProvider.defaults.headers.common = 'Content-Type: application/json';
			delete $httpProvider.defaults.headers.common['X-Requested-With'];

			$routeProvider
				.when('/', {
					templateUrl: 'views/checkout.html',
					controller : 'CheckoutCtrl'
				})
				.otherwise({
					redirectTo: '/'
				});
		}]);
