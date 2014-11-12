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
		'VolusionCheckout.config',
		'VolusionCheckout.controllers',
		'VolusionCheckout.services',
		'VolusionCheckout.directives'
	])
	.config(['$routeProvider', '$locationProvider', '$compileProvider',
		function ($routeProvider, $locationProvider, $compileProvider) {

			'use strict';

			$compileProvider.debugInfoEnabled(true);

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
