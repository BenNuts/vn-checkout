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
	.config(['$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {

			'use strict';

			$locationProvider.html5Mode(true);

			$routeProvider
				.when('/', {
					templateUrl: 'views/checkout.html',
					controller : 'CheckoutCtrl'
				})
				.otherwise({
					redirectTo: '/'
				});
		}]);
